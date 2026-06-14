package com.example.demo.dto.Agent;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

@Data
public class AgentProfileResponse {
    private Long id;
    private String username;
    private String email;
    private String phoneNumber;
    private String departement;
    private String jobTitle;
    private LocalDateTime lastLogin;
    private List<String> categories;
    private List<String> skills;
    private boolean isActive;
    private boolean isEnabled;

}
