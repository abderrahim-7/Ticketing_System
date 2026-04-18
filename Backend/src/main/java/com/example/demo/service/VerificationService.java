package com.example.demo.service;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class VerificationService {


    @Autowired
    private StringRedisTemplate redisTemplate;


    private static final long EXPIRATION = 15; 

    private static final String VERIFICATION_PREFIX = "VERIFICATION_";
    private static final String RESET_PREFIX = "RESET_";




    // those methods are for verification tokens


    public void saveToken(String token, String email) {
        redisTemplate.opsForValue()
                .set(VERIFICATION_PREFIX + token, email, EXPIRATION, TimeUnit.MINUTES);
    }

    public String getEmail(String token) {
        return redisTemplate.opsForValue().get(VERIFICATION_PREFIX + token);
    }

    public void deleteToken(String token) {
        redisTemplate.delete(VERIFICATION_PREFIX + token);

    }


    // those methods are for reset password tokens


    public void saveResetToken(String token, String email) {
        redisTemplate.opsForValue()
        .set(RESET_PREFIX + token, email, EXPIRATION, TimeUnit.MINUTES);
    }

    public String getResetEmail(String token) {
        return redisTemplate.opsForValue().get(RESET_PREFIX + token);
    }

    public void deleteResetToken(String token) {
        redisTemplate.delete(RESET_PREFIX + token);
    }


}



