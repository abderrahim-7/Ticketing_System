package com.example.demo.dto.Admin;

import lombok.Data;

@Data
public class UserTicketStatsResponse {
    private Long id;
    private String username;
    private int submitted;
    private int rejected;
    private int done;
    private int inProgress;

}
