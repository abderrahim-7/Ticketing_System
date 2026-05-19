package com.example.demo.dto.Agent;

import lombok.Data;

@Data
public class AgentStatisticsResponse {
    private long totalSolvedTickets;
    private String averageResolutionTime;
    private double rating;
}