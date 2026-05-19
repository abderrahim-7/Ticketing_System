package com.example.demo.dto.User;

import lombok.Data;

@Data
public class UserStatisticsResponse {
    private long totalTicketsSubmitted;
    private long totalAcceptedTickets;
    private double acceptanceRate;
}
