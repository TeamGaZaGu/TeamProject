package com.korit.nomoreback.service;

import com.korit.nomoreback.domain.category.Category;
import com.korit.nomoreback.domain.category.CategoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryMapper categoryMapper;

    public List<Category> searchCategory() {
        return categoryMapper.searchCategory();
    }

}
