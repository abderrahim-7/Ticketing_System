package com.example.demo.dto.User;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class UserProfileResponse {
    private Long id;
    private String username;
    private String email;
    private String phoneNumber;
    private String departement;
    private String jobTitle;
    private LocalDateTime lastLogin;
    private boolean isEnabled;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
