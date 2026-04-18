package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {


    @Autowired
    private JavaMailSender MailSender;

    @Value("${frontend.url}")
    private String frontendUrl;

    
    public void sendVerificationEmail(String to , String token){


        String link = "http://localhost:8080/verify?token="+token;

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(to);
        mailMessage.setSubject("verify your account");
        mailMessage.setText("Click the link to verify your account: "+link);    
        
        MailSender.send(mailMessage);
    }

    public void sendResetPasswordEmail(String to, String token) {

        String link = frontendUrl + "/reset-password?token=" + token;
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(to);
        mailMessage.setSubject("Reset your password");
        mailMessage.setText("Click the link to reset your password: "+ link);
        
        MailSender.send(mailMessage);




    }




}
