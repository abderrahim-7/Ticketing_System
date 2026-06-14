package com.example.demo.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.example.demo.Entity.Agent;
import com.example.demo.Entity.Category;
import com.example.demo.Entity.Ticket;
import com.example.demo.Entity.User;
import com.example.demo.dto.Admin.AgentTicketStatsResponse;
import com.example.demo.dto.Admin.TicketsByCategoryResponse;
import com.example.demo.dto.Admin.UserTicketStatsResponse;

public interface AdminService {

    ResponseEntity<Map<String, Long>> activateAgent(Long agentId);

    ResponseEntity<Map<String, Long>> refuseAgent(Long agentId);

    ResponseEntity<Map<String, String>> disableAccount(Long Id);

    ResponseEntity<Map<String, String>> activateAccount(Long Id);

    ResponseEntity<Map<String, String>> AssignTicket(Long agentId, Long ticketId);

    ResponseEntity<Map<String, String>> RefuseTicket(Long TicketId);

    ResponseEntity<List<com.example.demo.dto.TicketResponse>> getAllTickets();

    ResponseEntity<List<com.example.demo.dto.Agent.AgentProfileResponse>> getAllAgents();

    ResponseEntity<List<com.example.demo.dto.User.UserProfileResponse>> getAlUsers();

    ResponseEntity<List<UserTicketStatsResponse>> getUsersStats();

    ResponseEntity<List<AgentTicketStatsResponse>> getAgentsStats();

    ResponseEntity<List<TicketsByCategoryResponse>> getTicketsStats();

}
