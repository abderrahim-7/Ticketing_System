package com.example.demo.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Agent;
import com.example.demo.Entity.User;
import com.example.demo.dto.ForgetPasswordRequest;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.dto.RegisterResponse;
import com.example.demo.dto.ResetPasswordRequest;
import com.example.demo.dto.TicketResponse;
import com.example.demo.dto.User.UserProfileResponse;
import com.example.demo.dto.User.UserStatisticsResponse;
import com.example.demo.security.JWTUtil;
import com.example.demo.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class UserController {

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody Agent user) {
        return userService.register(user);

    }

    @GetMapping("/verify")
    public ResponseEntity<String> verify(@RequestParam String token) {

        return userService.EnableUser(token);

    }

    @PostMapping("/forget-password")
    public ResponseEntity<?> forgetPassword(@RequestBody ForgetPasswordRequest request) {
        return userService.forgetPassword(request);

    }

    @GetMapping("/validate-reset-token")
    public ResponseEntity<String> validateResetToken(@RequestParam String token) {
        return userService.validateResetToken(token);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPssword(@RequestBody ResetPasswordRequest request) {
        return userService.resetPassword(request);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }

    @GetMapping("/user/tickets")
    public ResponseEntity<List<TicketResponse>> getUserTickets(HttpServletRequest request, @RequestParam int page,
            @RequestParam int limit) {
        Long userId = jwtUtil.extractUserIdFromRequest(request);
        return userService.getTickets(userId, page, limit);
    }

    @PostMapping("/user/tickets")
    public ResponseEntity<TicketResponse> createTicket(HttpServletRequest request, @RequestParam String title,
            @RequestParam Long categoryId, @RequestParam String description) {
        Long userId = jwtUtil.extractUserIdFromRequest(request);
        return userService.createTicket(userId, title, categoryId, description);
    }

    @GetMapping("/user/profile")
    public ResponseEntity<UserProfileResponse> getUserProfile(HttpServletRequest request) {
        Long userId = jwtUtil.extractUserIdFromRequest(request);
        return userService.getUserProfile(userId);
    }

    @PostMapping("/user/profile")
    public ResponseEntity<String> updateUserProfile(HttpServletRequest request,
            @RequestBody UserProfileResponse userProfile) {
        Long userId = jwtUtil.extractUserIdFromRequest(request);
        return userService.updateUserProfile(userProfile, userId);
    }

    @GetMapping("/user/statistics")
    public ResponseEntity<UserStatisticsResponse> getUserStatistics(HttpServletRequest request) {
        Long userId = jwtUtil.extractUserIdFromRequest(request);
        return userService.getUserStatistics(userId);
    }

    @PutMapping("/user/change-password")
    public ResponseEntity<String> changePassword(HttpServletRequest request, @RequestBody String newPassword,
            @RequestBody String oldPassword) {
        Long userId = jwtUtil.extractUserIdFromRequest(request);
        return userService.changePassword(userId, oldPassword, newPassword);
    }

}