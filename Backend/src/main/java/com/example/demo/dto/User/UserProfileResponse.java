package com.example.demo.dto.User;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class UserProfileResponse {
    private String username;
    private String email;
    private String phoneNumber;
    private String departement;
    private String jobTitle;
    private LocalDateTime lastLogin;

}
