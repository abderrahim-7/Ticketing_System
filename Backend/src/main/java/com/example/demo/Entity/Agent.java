package com.example.demo.Entity;

import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class Agent extends User{


    private boolean isActive;

    private double rating;

    @ManyToMany
    @JoinTable(
        name = "agent_category" ,
        joinColumns = @JoinColumn(name = "agent_id"),
        inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<Category> categories;


    @ManyToMany
     @JoinTable(
        name = "agent_skill" ,
        joinColumns = @JoinColumn(name = "agent_id"),
        inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    private Set<Skill> skills;


    @OneToMany(mappedBy = "agent")
    private Set<Ticket> assignedTickets;



    

}
