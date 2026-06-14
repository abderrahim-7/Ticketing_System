package com.example.demo.service;

import java.util.List;
import java.util.Set;

import com.example.demo.Entity.Category;
import com.example.demo.Entity.Skill;
import com.example.demo.dto.TicketResponse;
import com.example.demo.dto.Agent.AgentProfileResponse;
import com.example.demo.dto.Agent.AgentStatisticsResponse;
import com.example.demo.dto.Agent.AgentUpdateProfileRequest;

public interface AgentService {
    public boolean updateAgentProfile(Long id, AgentUpdateProfileRequest profile);

    public boolean updateAgentSkills(Long id, Set<Skill> skills);

    public boolean updateAgentCategories(Long id, Set<Category> categories);

    public AgentProfileResponse getAgentById(Long id);

    public AgentStatisticsResponse getAgentStatistics(Long id);

    public List<TicketResponse> getAssignedTickets(Long id, int limit, int page);

    public boolean solveTicket(Long id, Long ticketId);

}