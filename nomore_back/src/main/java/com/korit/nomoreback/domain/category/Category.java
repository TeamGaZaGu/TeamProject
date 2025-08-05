package com.korit.nomoreback.domain.category;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "category_tb")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Integer categoryId;

    @Column(name = "category_name")
    private String categoryName;
    @Column(name = "category_emoji")
    private String categoryEmoji;

}
