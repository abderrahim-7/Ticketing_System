package com.example.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.security.JWTUtil;

import jakarta.servlet.http.HttpServletRequest;

@RestController
public class AgentController {
    @Autowired
    private JWTUtil jwtUtil;

    @GetMapping("/test")
    public ResponseEntity<Map<String, Long>> getAssignedTickets(HttpServletRequest request) {
        Long userId = jwtUtil.extractUserIdFromRequest(request);
        return ResponseEntity.ok(Map.of("userId", userId));
    }
}
