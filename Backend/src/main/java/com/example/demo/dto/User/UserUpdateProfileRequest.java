package com.example.demo.dto.User;

import lombok.Data;

@Data
public class UserUpdateProfileRequest {
    private String username;
    private String phoneNumber;
    private String departement;
    private String jobTitle;

}
