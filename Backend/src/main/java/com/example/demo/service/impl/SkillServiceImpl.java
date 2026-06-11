package com.example.demo.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Skill;
import com.example.demo.dto.SkillResponse;
import com.example.demo.repository.SkillRepository;
import com.example.demo.service.SkillService;


@Service
public class SkillServiceImpl implements SkillService {

    @Autowired
    SkillRepository skillRepository;

    @Override
    public List<SkillResponse> getAllSkills(int page, int limit) {
        return skillRepository.findAll(PageRequest.of(page, limit)).getContent().stream()
                .map(skill -> new SkillResponse(skill.getId(), skill.getName()))
                .toList();
    }

    @Override
    public SkillResponse getSkillById(Long id) {
        Skill skill = skillRepository.findById(id).orElse(null);
        if (skill == null) {
            return null;
        }
        return new SkillResponse(skill.getId(), skill.getName());
    }

    @Override
    public SkillResponse createSkill(Skill skill) {
        Skill savedSkill = skillRepository.save(skill);
        return new SkillResponse(savedSkill.getId(), savedSkill.getName());
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
