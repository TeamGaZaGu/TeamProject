package com.korit.nomore.controller;

import com.korit.nomore.domain.entity.Category;
import com.korit.nomore.dto.response.ApiResponse;
import com.korit.nomore.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Category>>> getCategories() {
        List<Category> categories = categoryService.getAllCategories();
        ApiResponse<List<Category>> response = ApiResponse.success(
                categories,
                "카테고리 목록을 성공적으로 조회했습니다."
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Category>> getCategory(@PathVariable String id) {
        return categoryService.getCategoryById(id)
                .map(category -> ResponseEntity.ok(
                        ApiResponse.success(category, "카테고리 정보를 성공적으로 조회했습니다.")
                ))
                .orElse(ResponseEntity.notFound().build());
    }
}
