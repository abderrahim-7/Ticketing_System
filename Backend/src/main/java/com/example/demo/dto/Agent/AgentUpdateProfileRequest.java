package com.example.demo.dto.Agent;

import lombok.Data;

@Data
public class AgentUpdateProfileRequest {
    private String username;
    private String phoneNumber;
    private String departement;
    private String jobTitle;
}
