package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Category;
import com.example.demo.dto.CategoryResponse;
import com.example.demo.service.impl.CategoryServiceImpl;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/admin/categories")
public class CategoryController {

    @Autowired
    private CategoryServiceImpl categoryService;

    @GetMapping("")
    public List<CategoryResponse> getAllCategories(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit) {
        return categoryService.getAllCategories(page, limit);
    }

    @GetMapping("/{id}")
    public CategoryResponse getCategoryById(@PathVariable("id") Long id) {
        return categoryService.getCategory(id);
    }

    @PostMapping("")
    public CategoryResponse createCategory(@RequestBody Category category) {
        CategoryResponse createdCategory = categoryService.createCategory(category);
        return createdCategory;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteCategory(@PathVariable("id") Long id) {
        boolean deleted = categoryService.deleteCategory(id);
        if (deleted) {
            return ResponseEntity.ok(Map.of("message", "Category with ID " + id + " has been deleted."));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
