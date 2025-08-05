package com.korit.nomoreback.repository;


import com.korit.nomoreback.domain.category.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
