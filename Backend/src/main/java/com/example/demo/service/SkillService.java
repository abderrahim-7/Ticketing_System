package com.example.demo.service;

import java.util.List;

import com.example.demo.Entity.Skill;

public interface SkillService {

    public List<Skill> getAllSkills(int page, int limit);

    public Skill getSkillById(Long id);

    public Skill createSkill(Skill skill);

    public boolean deleteSkill(Long id);

}
