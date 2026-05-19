package com.example.demo.service;

import java.util.List;

import com.example.demo.Entity.Ticket;
import com.example.demo.dto.TicketResponse;
import com.example.demo.dto.Agent.AgentProfileResponse;
import com.example.demo.dto.Agent.AgentStatisticsResponse;

public interface AgentService {
    public AgentProfileResponse getAgentById(Long id);

    public AgentStatisticsResponse getAgentStatistics(Long id);

    public List<TicketResponse> getAssignedTickets(Long id, int limit, int page);

    public boolean solveTicket(Long id, Long ticketId);

}