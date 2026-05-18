package com.example.demo.Entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    @Enumerated(EnumType.STRING)
    private Status status;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime resolvedDate;

    @ManyToOne
    @JoinColumn(name = "id_category")
    private Category category;

    @OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL)
    private List<Message> messages = new ArrayList<>();





    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user; 


    @ManyToOne
    @JoinColumn(name = "id_agent")
    private Agent agent;





    

    


}
