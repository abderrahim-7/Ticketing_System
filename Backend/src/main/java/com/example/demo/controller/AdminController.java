package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.TicketResponse;
import com.example.demo.dto.Admin.AgentTicketStatsResponse;
import com.example.demo.dto.Admin.TicketsByCategoryResponse;
import com.example.demo.dto.Admin.UserTicketStatsResponse;
import com.example.demo.dto.Agent.AgentProfileResponse;
import com.example.demo.dto.User.UserProfileResponse;
import com.example.demo.service.impl.AdminServiceImpl;
import com.example.demo.service.impl.AgentServiceImpl;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private AdminServiceImpl adminService;

	@Autowired
	private AgentServiceImpl agentService;

	@PutMapping("/agent/{id}/activate")
	public ResponseEntity<Map<String, Long>> activateAgent(@PathVariable("id") Long id) {
		return adminService.activateAgent(id);
	}

	@DeleteMapping("/agent/{id}/refuse")
	public ResponseEntity<Map<String, Long>> refuseAgent(@PathVariable("id") Long id) {
		return adminService.refuseAgent(id);
	}

	@PutMapping("/account/{id}/disable")
	public ResponseEntity<Map<String, String>> disableAccount(@PathVariable("id") Long id) {
		return adminService.disableAccount(id);
	}

	@PutMapping("/account/{id}/activate")
	public ResponseEntity<Map<String, String>> activateAccount(@PathVariable("id") Long id) {
		return adminService.activateAccount(id);
	}

	@PutMapping("/tickets/{ticketId}/assign/{agentId}")
	public ResponseEntity<Map<String, String>> assignTicket(@PathVariable Long ticketId, @PathVariable Long agentId) {
		return adminService.AssignTicket(agentId, ticketId);
	}

	@PutMapping("/tickets/{ticketId}/refuse")
	public ResponseEntity<Map<String, String>> refuseTicket(@PathVariable Long ticketId) {
		return adminService.RefuseTicket(ticketId);
	}

	@GetMapping("/tickets")
	public ResponseEntity<List<TicketResponse>> getAllTickets() {
		return adminService.getAllTickets();
	}

	@GetMapping("/agents")
	public ResponseEntity<List<AgentProfileResponse>> getAllAgents() {
		return adminService.getAllAgents();
	}

	@GetMapping("/users")
	public ResponseEntity<List<UserProfileResponse>> getAllUsers() {
		return adminService.getAlUsers();
	}

	@GetMapping("/agents/{id}/tickets")
	public ResponseEntity<List<TicketResponse>> getTicketsByAgent(HttpServletRequest request,
			@PathVariable("id") Long agentId,
			@RequestParam(name = "page", defaultValue = "0") int page,
			@RequestParam(name = "limit", defaultValue = "10") int limit) {
		List<TicketResponse> response = agentService.getAssignedTickets(agentId, page, limit);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/stats/users")
	public ResponseEntity<List<UserTicketStatsResponse>> getUsersStats() {
		return adminService.getUsersStats();
	}

	@GetMapping("/stats/agents")
	public ResponseEntity<List<AgentTicketStatsResponse>> getAgentsStats() {
		return adminService.getAgentsStats();
	}

	@GetMapping("/stats/tickets-by-category")
	public ResponseEntity<List<TicketsByCategoryResponse>> getTicketsStats() {
		return adminService.getTicketsStats();
	}

}
