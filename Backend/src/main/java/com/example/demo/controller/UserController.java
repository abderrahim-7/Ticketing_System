package com.example.demo.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.User;
import com.example.demo.dto.ForgetPasswordRequest;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.dto.RegisterResponse;
import com.example.demo.dto.ResetPasswordRequest;
import com.example.demo.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
public class UserController {

    @Autowired
    private UserService userService;

   

   
    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody User user) {
        return userService.register(user);
        
    }
    
    @GetMapping("/verify")
    public ResponseEntity<String> verify(@RequestParam String token){

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
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request){
        return userService.login(request);
    }


    @GetMapping("/profil")
    public ResponseEntity<User> profil(@RequestParam Long id) {
        
        return userService.getProfil(id);
    }
    


 
    

}