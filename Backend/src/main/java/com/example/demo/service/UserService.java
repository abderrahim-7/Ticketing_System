package com.example.demo.service;

import org.springframework.http.ResponseEntity;

import com.example.demo.Entity.Agent;
import com.example.demo.Entity.User;
import com.example.demo.dto.ForgetPasswordRequest;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.dto.RegisterResponse;
import com.example.demo.dto.ResetPasswordRequest;

public interface UserService {
    ResponseEntity<RegisterResponse> register(Agent user);
    ResponseEntity<String> EnableUser(String token);
    ResponseEntity<String> validateResetToken(String token);
    ResponseEntity<String> forgetPassword(ForgetPasswordRequest request);
    ResponseEntity<String> resetPassword(ResetPasswordRequest request);
    ResponseEntity<LoginResponse> login(LoginRequest request);

    
}
