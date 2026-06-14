package com.example.demo.dto.Admin;

import lombok.Data;

@Data
public class TicketsByCategoryResponse {
    private String category;
    private int count;
}
