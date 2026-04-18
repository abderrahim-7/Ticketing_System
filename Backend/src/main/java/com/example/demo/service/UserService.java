package com.example.demo.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.Entity.Role;
import com.example.demo.Entity.User;
import com.example.demo.dto.ForgetPasswordRequest;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.dto.RegisterResponse;
import com.example.demo.dto.ResetPasswordRequest;
import com.example.demo.exception.EmailAlreadyExistsException;
import com.example.demo.exception.EmailNotFound;
import com.example.demo.exception.InvalidCredentialsException;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.HashPassword;
import com.example.demo.security.JWTUtil;



@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HashPassword hashPassword;

    @Autowired
    private EmailService emailService;

    @Autowired
    private VerificationService verificationService;

    @Autowired
    private JWTUtil jwtUtil;


    @Transactional
    public ResponseEntity<RegisterResponse> register(User user) {

        if(userRepository.existsByEmail(user.getEmail())){
            throw new EmailAlreadyExistsException("Email already exists");
        }

        User newUser= new User();

        newUser.setUsername(user.getUsername());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(hashPassword.passwordEncoder().encode(user.getPassword()));
        newUser.setEnabled(false);
        newUser.setRole(Role.USER);

        User savedUser = userRepository.save(newUser);



        

        String token = UUID.randomUUID().toString();

       
        verificationService.saveToken(token, savedUser.getEmail());

        
        emailService.sendVerificationEmail(savedUser.getEmail(), token);






        RegisterResponse response = new RegisterResponse();
        response.setMessage("User registered successfully");
        response.setEmail(savedUser.getEmail());
        response.setId(savedUser.getId());
        response.setSuccess(true);

        return ResponseEntity.ok(response);






        
    
    }


    public ResponseEntity<String> EnableUser(String token) {

        String email = verificationService.getEmail(token);

        if(email == null){
            return ResponseEntity.badRequest().body("Invalid or expired token");
        }

        User user = userRepository.findByEmail(email);

        if(user == null){
            return ResponseEntity.badRequest().body("User not found");
        }

        user.setEnabled(true);
        userRepository.save(user);

        verificationService.deleteToken(token);

        return ResponseEntity.ok("User verified successfully");

    }



    public ResponseEntity<String> validateResetToken(String token) {

        String email = verificationService.getResetEmail(token);

        if (email == null) {

            return ResponseEntity.badRequest().body("Invalid or expired token.");
        }

        return ResponseEntity.ok("Token is valid.");

    }   


    public ResponseEntity<String> forgetPassword(ForgetPasswordRequest request) {


        User user = userRepository.findByEmail(request.getEmail());
        
        if(user == null ||!user.isEnabled() ){
            return ResponseEntity.ok().body("if this email exists you will recieve a reset link");
        }

        String token = UUID.randomUUID().toString();

        verificationService.saveResetToken(token, request.getEmail());

        emailService.sendResetPasswordEmail(request.getEmail(), token);


        return ResponseEntity.ok("if this email exists you will recieve a reset link");



    }

    public ResponseEntity<String> resetPassword(ResetPasswordRequest request){

        String email = verificationService.getResetEmail(request.getToken());

        if(email == null){
            return ResponseEntity.badRequest().body("Invalid or expired token");

        }

        User user = userRepository.findByEmail(email);

        if(user == null){
            throw new EmailNotFound("User not found");
        }

        user.setPassword(hashPassword.passwordEncoder().encode(request.getNewPassword()));

        userRepository.save(user);

        verificationService.deleteResetToken(request.getToken());

        return ResponseEntity.ok("Password reset successfully");

    }




    public ResponseEntity<LoginResponse> login(LoginRequest request){

        User user = userRepository.findByEmail(request.getEmail());

        if(user==null || !user.isEnabled()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        if(!hashPassword.passwordEncoder().matches(request.getPassword(), user.getPassword())){
            throw new InvalidCredentialsException("Invalid credentials");
        }

        LoginResponse response = new LoginResponse();
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        
        String token = jwtUtil.generateToken(user.getEmail());
        response.setToken(token);
        return ResponseEntity.ok().body(response);

        

    }


    public ResponseEntity<User> getProfil(Long id) {
        User user = userRepository.findById(id).orElse(null);

        return ResponseEntity.ok(user);
    }



}
