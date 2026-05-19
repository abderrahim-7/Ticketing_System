package com.example.demo.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;

import com.example.demo.Entity.Category;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.service.CategoryService;

public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> getAllCategories(int page, int limit) {
        return categoryRepository.findAll(PageRequest.of(page, limit)).getContent();
    }

    @Override
    public Category getCategory(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    @Override
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategoryDescription(Long id, String description) {
        Category category = categoryRepository.findById(id).orElse(null);
        if (category != null) {
            category.setDescription(description);
            return categoryRepository.save(category);
        }
        return null;
    }

    @Override
    public boolean deleteCategory(Long id) {
        Category category = categoryRepository.findById(id).orElse(null);
        if (category != null) {
            categoryRepository.delete(category);
            return true;
        }
        return false;
    }

}
