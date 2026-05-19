package com.example.demo.service.impl;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Agent;
import com.example.demo.Entity.Status;
import com.example.demo.Entity.Ticket;
import com.example.demo.dto.TicketResponse;
import com.example.demo.dto.Agent.AgentProfileResponse;
import com.example.demo.dto.Agent.AgentStatisticsResponse;
import com.example.demo.repository.AgentRepository;
import com.example.demo.repository.TicketRepository;
import com.example.demo.service.AgentService;

@Service
public class AgentServiceImpl implements AgentService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private AgentRepository agentRepository;

    @Override
    public AgentProfileResponse getAgentById(Long id) {
        Agent agent = agentRepository.findById(id).orElse(null);
        AgentProfileResponse response = new AgentProfileResponse();
        response.setEmail(agent.getEmail());
        response.setUsername(agent.getUsername());
        response.setPhoneNumber(agent.getPhoneNumber());
        response.setDepartement(agent.getDepartement());
        response.setJobTitle(agent.getJobTitle());
        response.setLastLogin(agent.getLastLogin());
        response.setCategories(agent.getCategories().stream().map(category -> category.getName()).toList());
        response.setSkills(agent.getSkills().stream().map(skill -> skill.getName()).toList());
        return response;
    }

    public AgentStatisticsResponse getAgentStatistics(Long id) {
        AgentStatisticsResponse response = new AgentStatisticsResponse();
        Agent agent = agentRepository.findById(id).orElse(null);
        if (agent == null) {
            return null;
        }
        response.setRating(agent.getRating());

        List<Ticket> tickets = ticketRepository.findByAgentId(id, PageRequest.of(0, Integer.MAX_VALUE)).getContent();

        long solvedTickets = tickets.stream().filter(ticket -> ticket.getStatus() == Status.DONE).count();
        response.setTotalSolvedTickets(solvedTickets);

        long totalResolutionTime = tickets.stream()
                .filter(ticket -> ticket.getStatus() == Status.DONE)
                .mapToLong(ticket -> Duration.between(
                        ticket.getCreatedAt(),
                        ticket.getResolvedDate()).toMinutes())
                .sum();

        long averageResolutionTimeInMinutes = solvedTickets > 0 ? totalResolutionTime / solvedTickets : 0;

        long hours = averageResolutionTimeInMinutes / 60;
        long minutes = averageResolutionTimeInMinutes % 60;

        String formattedTime = hours + "h" + minutes;

        response.setAverageResolutionTime(formattedTime);

        return response;

    }

    @Override
    public List<TicketResponse> getAssignedTickets(Long id, int page, int limit) {
        Page<Ticket> pageResult = ticketRepository.findByAgentId(id, PageRequest.of(page, limit));

        List<Ticket> tickets = pageResult.getContent();
        return tickets.stream().map(ticket -> {
            TicketResponse response = new TicketResponse();
            response.setTitle(ticket.getTitle());
            response.setDescription(ticket.getDescription());
            response.setCategory(ticket.getCategory().getName());
            response.setUser(ticket.getUser().getUsername());
            response.setAgent(ticket.getAgent().getUsername());
            response.setStatus(ticket.getStatus().toString());
            response.setId(ticket.getId());
            return response;
        }).toList();
    }

    @Override
    public boolean solveTicket(Long id, Long ticketId) {
        Ticket ticket = ticketRepository.findById(ticketId).orElse(null);
        if (ticket != null && ticket.getAgent() != null && ticket.getAgent().getId().equals(id)) {
            ticket.setStatus(Status.DONE);
            ticket.setResolvedDate(LocalDateTime.now());
            ticketRepository.save(ticket);
            return true;
        }
        return false;
    }

}
