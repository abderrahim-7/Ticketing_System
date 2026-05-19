package com.example.demo.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;

import com.example.demo.Entity.Skill;
import com.example.demo.repository.SkillRepository;
import com.example.demo.service.SkillService;

public class SkillServiceImpl implements SkillService {

    @Autowired
    SkillRepository skillRepository;

    @Override
    public List<Skill> getAllSkills(int page, int limit) {
        return skillRepository.findAll(PageRequest.of(page, limit)).getContent();
    }

    @Override
    public Skill getSkillById(Long id) {
        return skillRepository.findById(id).orElse(null);
    }

    @Override
    public Skill createSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    @Override
    public boolean deleteSkill(Long id) {
        Skill skill = skillRepository.findById(id).orElse(null);
        if (skill == null) {
            return false;
        }
        skillRepository.delete(skill);
        return true;
    }
}
