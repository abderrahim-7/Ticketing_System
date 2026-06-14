package com.example.demo.dto.Admin;

import lombok.Data;

@Data
public class AgentTicketStatsResponse {
    private Long id;
    private String username;
    private int solved;
    private String avgResolutionTime;
    private int inProgress;
}
