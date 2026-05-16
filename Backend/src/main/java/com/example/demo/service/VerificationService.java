package com.example.demo.service;

public interface VerificationService {
    void saveToken(String token, String email);
    String getEmail(String token);
    void deleteToken(String token);
    void saveResetToken(String token, String email);
    String getResetEmail(String token);
    void deleteResetToken(String token);
}
