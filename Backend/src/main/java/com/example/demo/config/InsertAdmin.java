package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.example.demo.Entity.Role;
import com.example.demo.Entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.HashPassword;


@Component
public class InsertAdmin implements ApplicationRunner {

    @Autowired
    private HashPassword hashPassword;

    @Autowired
    private UserRepository userRepository;

    @Value("${admin.email}")
    private String adminEmail;

    @Value("${admin.password}")
    private String adminPassword;

    @Override
    public void run(org.springframework.boot.ApplicationArguments args) throws Exception {


        if(!userRepository.existsByEmail(adminEmail)){

            User admin = new User();

            admin.setEmail(adminEmail);
            admin.setPassword(hashPassword.passwordEncoder().encode(adminPassword));
            admin.setRole(Role.ADMIN);
            admin.setEnabled(true);
            admin.setUsername("Admin");

            userRepository.save(admin);

            System.out.println("Admin user created with email: " + adminEmail);

        }else{
            System.out.println("Admin user already exists with email: " + adminEmail);
        }
        
        

        
        



    }

}
