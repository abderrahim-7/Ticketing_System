package com.example.demo.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.example.demo.Entity.Agent;
import com.example.demo.Entity.Ticket;
import com.example.demo.dto.ForgetPasswordRequest;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.dto.RegisterResponse;
import com.example.demo.dto.ResetPasswordRequest;
import com.example.demo.dto.TicketResponse;
import com.example.demo.dto.User.UserProfileResponse;
import com.example.demo.dto.User.UserStatisticsResponse;

import io.micrometer.core.ipc.http.HttpSender.Response;

public interface UserService {
    ResponseEntity<RegisterResponse> register(Agent user);

    ResponseEntity<String> EnableUser(String token);

    ResponseEntity<String> validateResetToken(String token);

    ResponseEntity<String> forgetPassword(ForgetPasswordRequest request);

    ResponseEntity<String> resetPassword(ResetPasswordRequest request);

    ResponseEntity<LoginResponse> login(LoginRequest request);

    ResponseEntity<String> changePassword(String oldPassword, String newPassword);

    ResponseEntity<List<TicketResponse>> getTickets(String token);

    ResponseEntity<TicketResponse> createTicket(String title, Long categoryId, String description);

    ResponseEntity<UserProfileResponse> getUserProfile();

    ResponseEntity<String> updateUserProfile(UserProfileResponse request);

    ResponseEntity<UserStatisticsResponse> getUserStatistics();

}
