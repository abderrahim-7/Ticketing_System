package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Skill;
import com.example.demo.dto.SkillResponse;
import com.example.demo.service.impl.SkillServiceImpl;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/admin/skills")
public class SkillController {

    @Autowired
    private SkillServiceImpl skillService;

    @GetMapping("/")
    public List<SkillResponse> getAllSkills(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit) {
        return skillService.getAllSkills(page, limit);
    }

    @GetMapping("/{id}")
    public SkillResponse getSkillById(@PathVariable("id") Long id) {
        return skillService.getSkillById(id);
    }

    @PostMapping("/")
    public SkillResponse createSkill(@RequestBody Skill skill) {
        return skillService.createSkill(skill);
    }

    @PostMapping("/delete/{id}")
    public String deleteSkill(@PathVariable("id") Long id) {
        boolean deleted = skillService.deleteSkill(id);
        if (deleted) {
            return "Skill with ID " + id + " has been deleted.";
        } else {
            return "Skill with ID " + id + " not found.";
        }
    }
}
