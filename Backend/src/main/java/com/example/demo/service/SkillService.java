package com.example.demo.service;

import java.util.List;

import com.example.demo.Entity.Skill;
import com.example.demo.dto.SkillResponse;

public interface SkillService {

    public List<SkillResponse> getAllSkills(int page, int limit);

    public SkillResponse getSkillById(Long id);

    public SkillResponse createSkill(Skill skill);

    public boolean deleteSkill(Long id);

}
