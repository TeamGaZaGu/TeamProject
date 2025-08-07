package com.korit.nomoreback.domain.post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Post {
    private Integer postId;
    private String postTitle;
    private String postContent;
    private String postImgPath;
    private LocalDateTime createdAt;

    private Integer moimId;
    private Integer moimCategoryId;
    private Integer userId;

}
