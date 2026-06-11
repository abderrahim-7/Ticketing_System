package com.example.demo.dto;

import lombok.Data;

@Data
public class CreateTicketRequest {
    private String title;
    private Long categoryId;
    private String description;

}