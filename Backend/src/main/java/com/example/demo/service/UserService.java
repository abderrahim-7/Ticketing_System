package com.example.demo.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.example.demo.Entity.Agent;
import com.example.demo.dto.ForgetPasswordRequest;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.dto.RegisterResponse;
import com.example.demo.dto.ResetPasswordRequest;
import com.example.demo.dto.TicketResponse;
import com.example.demo.dto.User.UserProfileResponse;
import com.example.demo.dto.User.UserStatisticsResponse;
import com.example.demo.dto.User.UserUpdateProfileRequest;

public interface UserService {
    ResponseEntity<RegisterResponse> register(Agent user);

    ResponseEntity<String> EnableUser(String token);

    ResponseEntity<String> validateResetToken(String token);

    ResponseEntity<String> forgetPassword(ForgetPasswordRequest request);

    ResponseEntity<String> resetPassword(ResetPasswordRequest request);

    ResponseEntity<LoginResponse> login(LoginRequest request);

    ResponseEntity<String> changePassword(Long userId, String oldPassword, String newPassword);

    ResponseEntity<List<TicketResponse>> getTickets(Long userId, int page, int limit);

    ResponseEntity<TicketResponse> createTicket(Long userId, String title, Long categoryId, String description);

    ResponseEntity<UserProfileResponse> getUserProfile(Long userId);

    ResponseEntity<String> updateUserProfile(UserUpdateProfileRequest request, Long userId);

    ResponseEntity<UserStatisticsResponse> getUserStatistics(Long userId);

}
