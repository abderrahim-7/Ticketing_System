package com.example.demo.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.Entity.Agent;
import com.example.demo.Entity.Category;
import com.example.demo.Entity.Role;
import com.example.demo.Entity.Status;
import com.example.demo.Entity.Ticket;
import com.example.demo.Entity.User;
import com.example.demo.dto.ForgetPasswordRequest;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.dto.RegisterResponse;
import com.example.demo.dto.ResetPasswordRequest;
import com.example.demo.dto.TicketResponse;
import com.example.demo.dto.User.UserProfileResponse;
import com.example.demo.dto.User.UserStatisticsResponse;
import com.example.demo.dto.User.UserUpdateProfileRequest;
import com.example.demo.exception.EmailAlreadyExistsException;
import com.example.demo.exception.EmailNotFound;
import com.example.demo.exception.InvalidCredentialsException;
import com.example.demo.repository.AgentRepository;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.TicketRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.HashPassword;
import com.example.demo.security.JWTUtil;
import com.example.demo.service.EmailService;
import com.example.demo.service.UserService;
import com.example.demo.service.VerificationService;

@Service
public class UserServiceImpl implements UserService {

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

    @Autowired
    private AgentRepository agentRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Transactional
    public ResponseEntity<RegisterResponse> register(Agent user) {

        RegisterResponse response = new RegisterResponse();

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new EmailAlreadyExistsException("Email already exists");
        }

        Role role = user.getRole();

        User newUser;

        if (role == Role.AGENT) {

            Agent agent = new Agent();

            agent.setActive(false);
            agent.setRating(3.0);
            agent.setCategories(user.getCategories());
            agent.setSkills(user.getSkills());

            newUser = agent;

        } else {

            newUser = new User();
        }

        newUser.setUsername(user.getUsername());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(hashPassword.passwordEncoder().encode(user.getPassword()));
        newUser.setEnabled(false);
        newUser.setRole(role);

        User savedUser;

        if (role == Role.AGENT) {
            savedUser = agentRepository.save((Agent) newUser);
            response.setMessage("Agent registered successfully");
        } else {
            savedUser = userRepository.save(newUser);
            response.setMessage("User registered successfully");
        }

        String token = UUID.randomUUID().toString();

        verificationService.saveToken(token, savedUser.getEmail());

        emailService.sendVerificationEmail(savedUser.getEmail(), token);

        response.setEmail(savedUser.getEmail());
        response.setId(savedUser.getId());
        response.setSuccess(true);

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<String> EnableUser(String token) {

        String email = verificationService.getEmail(token);

        if (email == null) {
            return ResponseEntity.badRequest().body("Invalid or expired token");
        }

        User user = userRepository.findByEmail(email);

        if (user == null) {
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

        if (user == null || !user.isEnabled()) {
            return ResponseEntity.ok().body("if this email exists you will recieve a reset link");
        }

        String token = UUID.randomUUID().toString();

        verificationService.saveResetToken(token, request.getEmail());

        emailService.sendResetPasswordEmail(request.getEmail(), token);

        return ResponseEntity.ok("if this email exists you will recieve a reset link");

    }

    public ResponseEntity<String> resetPassword(ResetPasswordRequest request) {

        String email = verificationService.getResetEmail(request.getToken());

        if (email == null) {
            return ResponseEntity.badRequest().body("Invalid or expired token");

        }

        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new EmailNotFound("User not found");
        }

        user.setPassword(hashPassword.passwordEncoder().encode(request.getNewPassword()));

        userRepository.save(user);

        verificationService.deleteResetToken(request.getToken());

        return ResponseEntity.ok("Password reset successfully");

    }

    public ResponseEntity<LoginResponse> login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail());

        if (user == null || !user.isEnabled()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new LoginResponse(null, null, null, "Invalid credentials"));
        }

        if (user.getRole() == Role.AGENT && !((Agent) user).isActive()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new LoginResponse(null, null, null,
                            "Your account is not active, please wait for admin approval"));
        }

        if (!hashPassword.passwordEncoder().matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new LoginResponse(null, null, null, "Invalid credentials"));
        }

        LoginResponse response = new LoginResponse();
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        response.setMessage("Login successful");
        String token = jwtUtil.generateToken(user.getEmail(), user.getId(), user.getRole());
        response.setToken(token);
        return ResponseEntity.ok().body(response);

    }

    public ResponseEntity<List<TicketResponse>> getTickets(Long userId, int page, int limit) {
        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        List<TicketResponse> tickets = ticketRepository.findByUserId(user.getId(), PageRequest.of(page, limit))
                .getContent()
                .stream().map(ticket -> {
                    TicketResponse response = new TicketResponse();
                    response.setTitle(ticket.getTitle());
                    response.setDescription(ticket.getDescription());
                    response.setCategory(ticket.getCategory().getName());
                    response.setUser(ticket.getUser().getUsername());
                    response.setAgent(ticket.getAgent() != null ? ticket.getAgent().getUsername() : null);
                    response.setStatus(ticket.getStatus().toString());
                    response.setId(ticket.getId());
                    return response;
                }).toList();

        return ResponseEntity.ok(tickets);
    };

    public ResponseEntity<TicketResponse> createTicket(Long userId, String title, Long categoryId, String description) {
        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        Category category = categoryRepository.findById(categoryId).orElse(null);

        if (category == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        Ticket ticket = new Ticket();
        ticket.setUser(user);
        ticket.setTitle(title);
        ticket.setDescription(description);
        ticket.setCategory(category);
        ticket.setStatus(Status.PENDING);
        ticketRepository.save(ticket);

        return ResponseEntity.ok().body(new TicketResponse() {
            {
                setTitle(ticket.getTitle());
                setDescription(ticket.getDescription());
                setCategory(ticket.getCategory().getName());
                setUser(ticket.getUser().getUsername());
                setStatus(ticket.getStatus().toString());
                setId(ticket.getId());
            }
        });
    };

    public ResponseEntity<UserProfileResponse> getUserProfile(Long userId) {
        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        UserProfileResponse response = new UserProfileResponse();
        response.setEmail(user.getEmail());
        response.setUsername(user.getUsername());
        response.setPhoneNumber(user.getPhoneNumber());
        response.setDepartement(user.getDepartement());
        response.setJobTitle(user.getJobTitle());
        response.setLastLogin(user.getLastLogin());
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<String> updateUserProfile(UserUpdateProfileRequest request, Long userId) {
        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        if (request.getUsername() != null)
            user.setUsername(request.getUsername());
        if (request.getPhoneNumber() != null)
            user.setPhoneNumber(request.getPhoneNumber());
        if (request.getDepartement() != null)
            user.setDepartement(request.getDepartement());
        if (request.getJobTitle() != null)
            user.setJobTitle(request.getJobTitle());

        userRepository.save(user);

        return ResponseEntity.ok("Profile updated successfully");
    }

    public ResponseEntity<UserStatisticsResponse> getUserStatistics(Long userId) {
        UserStatisticsResponse response = new UserStatisticsResponse();
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        List<Ticket> tickets = ticketRepository.findByUserId(userId, PageRequest.of(0, Integer.MAX_VALUE)).getContent();

        long totalTicketsSubmitted = tickets.size();
        long totalAcceptedTickets = tickets.stream()
                .filter(ticket -> ticket.getStatus() != Status.REJECTED && ticket.getStatus() != Status.PENDING)
                .count();
        double acceptanceRate = totalAcceptedTickets * 100 / totalTicketsSubmitted;

        response.setTotalTicketsSubmitted(totalTicketsSubmitted);
        response.setTotalAcceptedTickets(totalAcceptedTickets);
        response.setAcceptanceRate(acceptanceRate);

        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<String> changePassword(
            Long userId,
            String oldPassword,
            String newPassword) {

        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("User not found");
        }

        if (!hashPassword.passwordEncoder().matches(
                oldPassword,
                user.getPassword())) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Invalid old password");
        }

        user.setPassword(
                hashPassword.passwordEncoder().encode(newPassword));

        userRepository.save(user);

        return ResponseEntity.ok("Password changed successfully");
    }

}
