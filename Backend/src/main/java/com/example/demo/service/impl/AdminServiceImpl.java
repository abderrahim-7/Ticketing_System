package com.example.demo.service.impl;

import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.OptionalDouble;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Agent;
import com.example.demo.Entity.Ticket;
import com.example.demo.dto.TicketResponse;
import com.example.demo.dto.Admin.AgentTicketStatsResponse;
import com.example.demo.dto.Admin.TicketsByCategoryResponse;
import com.example.demo.dto.Admin.UserTicketStatsResponse;
import com.example.demo.dto.Agent.AgentProfileResponse;
import com.example.demo.dto.User.UserProfileResponse;
import com.example.demo.Entity.Category;
import com.example.demo.Entity.User;
import com.example.demo.Entity.Role;
import com.example.demo.Entity.Status;
import com.example.demo.repository.AgentRepository;
import com.example.demo.repository.TicketRepository;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.AdminService;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AgentRepository agentRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AgentServiceImpl agentService;

    @Override
    public ResponseEntity<Map<String, Long>> activateAgent(Long agentId) {

        Agent agent = agentRepository.findById(agentId).orElseThrow(() -> new RuntimeException("Agent not found"));

        agent.setActive(true);
        agentRepository.save(agent);

        return ResponseEntity.ok(Map.of("agentId", agent.getId()));

    }

    @Override
    public ResponseEntity<Map<String, Long>> refuseAgent(Long agentId) {

        Agent agent = agentRepository.findById(agentId).orElseThrow(() -> new RuntimeException("Agent not found"));

        agentRepository.delete(agent);

        return ResponseEntity.ok(Map.of("agentId", agent.getId()));

    }

    @Override
    public ResponseEntity<Map<String, String>> disableAccount(Long Id) {

        if (agentRepository.existsById(Id)) {
            Agent agent = agentRepository.findById(Id).orElseThrow(() -> new RuntimeException("Agent not found"));
            agent.setEnabled(false);
            agentRepository.save(agent);
            return ResponseEntity.ok(Map.of("message", "agent disabled", "id", String.valueOf(agent.getId())));
        }

        return userRepository.findById(Id)
                .map(u -> {
                    u.setEnabled(false);
                    userRepository.save(u);
                    return ResponseEntity.ok(Map.of("message", "user  disabled", "id", String.valueOf(u.getId())));
                })
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public ResponseEntity<Map<String, String>> activateAccount(Long Id) {

        if (agentRepository.existsById(Id)) {
            Agent agent = agentRepository.findById(Id).orElseThrow(() -> new RuntimeException("Agent not found"));
            agent.setEnabled(true);
            agentRepository.save(agent);
            return ResponseEntity.ok(Map.of("message", "account activated", "id", String.valueOf(agent.getId())));
        }

        return userRepository.findById(Id)
                .map(u -> {
                    u.setEnabled(true);
                    userRepository.save(u);
                    return ResponseEntity.ok(Map.of("message", "account activated", "id", String.valueOf(u.getId())));
                })
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public ResponseEntity<Map<String, String>> AssignTicket(Long agentId, Long ticketId) {
        Agent agent = agentRepository.findById(agentId).orElseThrow(() -> new RuntimeException("Agent not found"));
        Ticket ticket = ticketRepository.findById(ticketId).orElseThrow(() -> new RuntimeException("Ticket not found"));

        ticket.setAgent(agent);
        ticket.setStatus(com.example.demo.Entity.Status.IN_PROGRESS);
        ticketRepository.save(ticket);

        return ResponseEntity.ok(Map.of("message", "ticket assigned", "agentId", String.valueOf(agent.getId()),
                "ticketId", String.valueOf(ticket.getId())));
    }

    @Override
    public ResponseEntity<Map<String, String>> RefuseTicket(Long TicketId) {
        Ticket ticket = ticketRepository.findById(TicketId).orElseThrow(() -> new RuntimeException("Ticket not found"));
        ticket.setStatus(com.example.demo.Entity.Status.REJECTED);
        ticketRepository.save(ticket);
        return ResponseEntity.ok(Map.of("message", "ticket refused", "ticketId", String.valueOf(ticket.getId())));
    }

    @Override
    public ResponseEntity<List<TicketResponse>> getAllTickets() {
        List<Ticket> tickets = ticketRepository.findAll();

        List<TicketResponse> resp = tickets.stream().map(t -> {
            TicketResponse r = new TicketResponse();
            r.setId(t.getId());
            r.setTitle(t.getTitle());
            r.setDescription(t.getDescription());
            r.setCategory(t.getCategory() != null ? t.getCategory().getName() : null);
            r.setUser(t.getUser() != null ? t.getUser().getUsername() : null);
            r.setAgent(t.getAgent() != null ? t.getAgent().getUsername() : null);
            r.setStatus(t.getStatus() != null ? t.getStatus().name() : null);
            return r;
        }).toList();

        return ResponseEntity.ok(resp);
    }

    @Override
    public ResponseEntity<List<AgentProfileResponse>> getAllAgents() {
        List<Agent> agents = agentRepository.findAll();
        List<AgentProfileResponse> resp = agents.stream().map(a -> {
            AgentProfileResponse r = new AgentProfileResponse();
            r.setId(a.getId());
            r.setUsername(a.getUsername());
            r.setEmail(a.getEmail());
            r.setPhoneNumber(a.getPhoneNumber());
            r.setDepartement(a.getDepartement());
            r.setJobTitle(a.getJobTitle());
            r.setLastLogin(a.getLastLogin());
            r.setCategories(
                    a.getCategories() != null ? a.getCategories().stream().map(Category::getName).toList() : List.of());
            r.setSkills(
                    a.getSkills() != null ? a.getSkills().stream().map(skill -> skill.getName()).toList() : List.of());
            r.setActive(a.isActive());
            r.setEnabled(a.isEnabled());
            return r;
        }).toList();
        return ResponseEntity.ok(resp);
    }

    @Override
    public ResponseEntity<List<UserProfileResponse>> getAlUsers() {
        List<User> users = userRepository.findAll().stream()
                .filter(u -> u.getRole() == Role.USER)
                .toList();
        List<UserProfileResponse> resp = users.stream().map(u -> {
            UserProfileResponse r = new UserProfileResponse();
            r.setId(u.getId());
            r.setUsername(u.getUsername());
            r.setEmail(u.getEmail());
            r.setPhoneNumber(u.getPhoneNumber());
            r.setDepartement(u.getDepartement());
            r.setJobTitle(u.getJobTitle());
            r.setLastLogin(u.getLastLogin());
            r.setEnabled(u.isEnabled());
            return r;
        }).toList();
        return ResponseEntity.ok(resp);
    }

    @Override
    public ResponseEntity<List<UserTicketStatsResponse>> getUsersStats() {
        List<User> users = userRepository.findAll().stream()
                .filter(u -> u.getRole() == Role.USER)
                .toList();

        List<UserTicketStatsResponse> resp = users.stream().map(u -> {
            List<Ticket> tickets = ticketRepository.findByUserId(u.getId());

            UserTicketStatsResponse r = new UserTicketStatsResponse();
            r.setId(u.getId());
            r.setUsername(u.getUsername());
            r.setSubmitted(tickets.size());
            r.setRejected((int) tickets.stream().filter(t -> t.getStatus() == Status.REJECTED).count());
            r.setDone((int) tickets.stream().filter(t -> t.getStatus() == Status.DONE).count());
            r.setInProgress((int) tickets.stream().filter(t -> t.getStatus() == Status.IN_PROGRESS).count());
            return r;
        }).toList();

        return ResponseEntity.ok(resp);
    }

    @Override
    public ResponseEntity<List<AgentTicketStatsResponse>> getAgentsStats() {
        List<Agent> agents = agentRepository.findAll();

        List<AgentTicketStatsResponse> resp = agents.stream().map(a -> {
            List<Ticket> tickets = ticketRepository.findByAgentId(a.getId());

            int solved = (int) tickets.stream().filter(t -> t.getStatus() == Status.DONE).count();
            int inProgress = (int) tickets.stream().filter(t -> t.getStatus() == Status.IN_PROGRESS).count();

            String avgResolutionTime = agentService.getAgentStatistics(a.getId()).getAverageResolutionTime();

            AgentTicketStatsResponse r = new AgentTicketStatsResponse();
            r.setId(a.getId());
            r.setUsername(a.getUsername());
            r.setSolved(solved);
            r.setInProgress(inProgress);
            r.setAvgResolutionTime(avgResolutionTime);
            return r;
        }).toList();

        return ResponseEntity.ok(resp);
    }

    @Override
    public ResponseEntity<List<TicketsByCategoryResponse>> getTicketsStats() {
        List<Category> categories = categoryRepository.findAll();

        List<TicketsByCategoryResponse> resp = categories.stream().map(c -> {
            int count = ticketRepository.countByCategory(c);

            TicketsByCategoryResponse r = new TicketsByCategoryResponse();
            r.setCategory(c.getName());
            r.setCount(count);
            return r;
        }).toList();

        return ResponseEntity.ok(resp);
    }

}
