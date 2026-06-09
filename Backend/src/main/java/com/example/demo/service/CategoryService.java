package com.example.demo.service;

import java.util.List;
import com.example.demo.Entity.Category;
import com.example.demo.dto.CategoryResponse;

public interface CategoryService {

    public List<CategoryResponse> getAllCategories(int page, int limit);

    public CategoryResponse getCategory(Long id);

    public CategoryResponse createCategory(Category category);

    public CategoryResponse updateCategoryDescription(Long id, String description);

    public boolean deleteCategory(Long id);

}
