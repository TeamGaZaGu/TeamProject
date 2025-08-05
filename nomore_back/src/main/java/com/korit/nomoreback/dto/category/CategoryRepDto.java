package com.korit.nomoreback.dto.category;

import com.korit.nomoreback.domain.category.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
public class CategoryRepDto {
    private String CategoryName;
    private String CategoryEmoji;
}
