package com.example.demo.Entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.Data;


@Data
@Entity
public class Skill {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String name; 



    @ManyToMany(mappedBy = "skills")
    private Set<Agent> agents = new HashSet<>();

}
