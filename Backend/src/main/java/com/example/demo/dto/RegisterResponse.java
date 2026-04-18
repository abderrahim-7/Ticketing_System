package com.example.demo.dto;

import lombok.Data;

@Data
public class RegisterResponse {

    private String message ;
    private String email;
    private Long id;
    private boolean success;

}
