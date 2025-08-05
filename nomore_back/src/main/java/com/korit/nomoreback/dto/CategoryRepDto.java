package com.korit.nomoreback.dto;

import com.korit.nomoreback.domain.category.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CategoryRepDto {
    private String CategoryName;
    private String CategoryEmoji;

    public static CategoryRepDto categoryRepDto(Category category) {
        return new CategoryRepDto(category.getCategoryName(),category.getCategoryEmoji());
    }
}
