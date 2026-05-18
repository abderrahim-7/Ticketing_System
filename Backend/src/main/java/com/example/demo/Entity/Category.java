package com.example.demo.Entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
@Entity
public class Category {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String name; 

    private String description;


    @ManyToMany(mappedBy = "categories")
    private Set<Agent> agents = new HashSet<>();



    @OneToMany(mappedBy = "category")
    private List<Ticket> tickets = new ArrayList<>();
}
