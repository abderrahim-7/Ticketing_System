package com.example.demo.service;

import java.util.List;

import com.example.demo.Entity.Ticket;

public interface AgentService {
    public List<Ticket> getAssignedTickets(Long id, int limit, int page);

    public boolean getSolvedTickets(Long id);

    public boolean solveTicket(Long id, Long ticketId);

}