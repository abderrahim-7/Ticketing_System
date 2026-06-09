package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.TicketResponse;
import com.example.demo.dto.Agent.AgentProfileResponse;
import com.example.demo.dto.User.UserProfileResponse;
import com.example.demo.Entity.Category;
import com.example.demo.service.impl.AdminServiceImpl;

@RestController
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private AdminServiceImpl adminService;

	@PutMapping("/agent/{id}/activate")
	public ResponseEntity<Map<String, Long>> activateAgent(@PathVariable("id") Long id) {
		return adminService.activateAgent(id);
	}

	@PutMapping("/account/{id}/disable")
	public ResponseEntity<Map<String, String>> disableAccount(@PathVariable("id") Long id) {
		return adminService.disableAccount(id);
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

	

}
