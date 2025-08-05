package com.korit.nomoreback.controller;

import com.korit.nomoreback.domain.category.Category;
import com.korit.nomoreback.dto.category.CategoryRepDto;
import com.korit.nomoreback.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/search")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/category")
    public List<Category> searchCategory() {
        return categoryService.searchCategory();
    }

}
