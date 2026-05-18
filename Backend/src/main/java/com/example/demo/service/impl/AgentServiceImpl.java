package com.example.demo.service.impl;

import java.util.List;

import org.springframework.data.domain.Page;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Agent;
import com.example.demo.Entity.Ticket;
import com.example.demo.repository.AgentRepository;
import com.example.demo.repository.TicketRepository;
import com.example.demo.service.AgentService;

@Service
public class AgentServiceImpl implements AgentService {

    @Autowired
    private TicketRepository ticketRepository;

    @Override
    public List<Ticket> getAssignedTickets(Long id, int page, int limit) {
        Page<Ticket> pageResult = ticketRepository.findByAgentId(id, PageRequest.of(page, limit));

        List<Ticket> tickets = pageResult.getContent();
        return tickets;
    }

    @Override
    public boolean solveTicket(Long id, Long ticketId) {
        Ticket ticket = ticketRepository.findById(ticketId).orElse(null);
        if (ticket != null && ticket.getAgent() != null && ticket.getAgent().getId().equals(id)) {
            ticket.setStatus("solved");
            ticketRepository.save(ticket);
            return true;
        }
        return false;
    }

    @Override
    public boolean getSolvedTickets(Long id) {
        throw new UnsupportedOperationException("Unimplemented method 'getSolvedTickets'");
    }
}
