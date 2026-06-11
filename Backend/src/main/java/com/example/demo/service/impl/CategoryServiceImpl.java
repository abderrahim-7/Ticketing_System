package com.example.demo.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Category;
import com.example.demo.dto.CategoryResponse;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.service.CategoryService;



@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<CategoryResponse> getAllCategories(int page, int limit) {
        return categoryRepository.findAll(PageRequest.of(page, limit)).getContent().stream()
                .map(category -> new CategoryResponse(category.getId(), category.getName(), category.getDescription()))
                .collect(Collectors.toList());
    }

    @Override
    public CategoryResponse getCategory(Long id) {
        Category category = categoryRepository.findById(id).orElse(null);
        return new CategoryResponse(category.getId(), category.getName(), category.getDescription());
    }

    @Override
    public CategoryResponse createCategory(Category category) {
        Category newCategory = categoryRepository.save(category);
        return new CategoryResponse(newCategory.getId(), newCategory.getName(), newCategory.getDescription());
    }

    @Override
    public CategoryResponse updateCategoryDescription(Long id, String description) {
        Category category = categoryRepository.findById(id).orElse(null);
        if (category != null) {
            category.setDescription(description);
            Category newCategory = categoryRepository.save(category);
            return new CategoryResponse(newCategory.getId(), newCategory.getName(), newCategory.getDescription());
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
