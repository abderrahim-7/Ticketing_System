package com.example.demo.service;

public interface AgentService {
    public String getAssignedTickets(Long id);

    public String solveTicket(Long id, Long ticketId);

}