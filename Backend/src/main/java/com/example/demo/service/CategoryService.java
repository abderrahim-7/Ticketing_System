package com.example.demo.service;

import java.util.List;
import com.example.demo.Entity.Category;

public interface CategoryService {

    public List<Category> getAllCategories(int page, int limit);

    public Category getCategory(Long id);

    public Category createCategory(Category category);

    public Category updateCategoryDescription(Long id, String description);

    public boolean deleteCategory(Long id);

}
