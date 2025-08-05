package com.korit.nomoreback.service;

import com.korit.nomoreback.dto.CategoryRepDto;
import com.korit.nomoreback.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryRepDto> getAllCategories () {
        return categoryRepository.findAll().stream()
                .map(CategoryRepDto::categoryRepDto)
                .collect(Collectors.toList());
    }

}
