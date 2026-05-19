package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.TicketResponse;
import com.example.demo.dto.Agent.AgentProfileResponse;
import com.example.demo.dto.Agent.AgentStatisticsResponse;
import com.example.demo.security.JWTUtil;
import com.example.demo.service.impl.AgentServiceImpl;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/agent")
public class AgentController {

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private AgentServiceImpl agentService;

    @GetMapping("/profile")
    public ResponseEntity<AgentProfileResponse> getProfile(HttpServletRequest request) {
        Long userId = jwtUtil.extractUserIdFromRequest(request);
        AgentProfileResponse response = agentService.getAgentById(userId);
        if (response == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/statistics")
    public ResponseEntity<AgentStatisticsResponse> getStatistics(HttpServletRequest request) {
        Long userId = jwtUtil.extractUserIdFromRequest(request);
        AgentStatisticsResponse response = agentService.getAgentStatistics(userId);
        if (response == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/tickets")
    public ResponseEntity<List<TicketResponse>> getAssignedTickets(HttpServletRequest request,
            @RequestParam("page") int page, @RequestParam("limit") int limit) {
        Long userId = jwtUtil.extractUserIdFromRequest(request);
        List<TicketResponse> response = agentService.getAssignedTickets(userId, page, limit);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/tickets/{ticketId}")
    public ResponseEntity<Void> solveTicket(HttpServletRequest request, @PathVariable("ticketId") Long ticketId) {
        Long userId = jwtUtil.extractUserIdFromRequest(request);
        agentService.solveTicket(userId, ticketId);
        return ResponseEntity.ok().build();
    }

}
