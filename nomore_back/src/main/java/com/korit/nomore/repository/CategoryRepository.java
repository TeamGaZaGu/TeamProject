package com.korit.nomore.repository;

import com.korit.nomore.domain.entity.Category;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Repository
public class CategoryRepository {

    private final List<Category> categories = Arrays.asList(
            new Category("all", "전체", "🌟"),
            new Category("sports", "운동/스포츠", "🏃‍♂️"),
            new Category("food", "맛집/요리", "🍕"),
            new Category("culture", "문화/예술", "🎭"),
            new Category("hobby", "취미/여가", "🎮"),
            new Category("study", "스터디/독서", "📚"),
            new Category("music", "음악/공연", "🎸"),
            new Category("outdoor", "야외활동", "🏔️"),
            new Category("cafe", "카페/티타임", "☕")
    );

    public List<Category> findAll() {
        return categories;
    }

    public Optional<Category> findById(String id) {
        return categories.stream()
                .filter(category -> category.getId().equals(id))
                .findFirst();
    }
}
