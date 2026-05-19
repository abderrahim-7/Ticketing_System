package com.example.demo.dto;

import lombok.Data;

@Data
public class TicketResponse {

    private Long id;
    private String title;
    private String description;
    private String category;
    private String user;
    private String agent;
    private String status;

}
