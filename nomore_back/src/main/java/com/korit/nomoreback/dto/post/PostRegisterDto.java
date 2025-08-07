package com.korit.nomoreback.dto.post;

import com.korit.nomoreback.domain.post.Post;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Data
public class PostRegisterDto {
    private Integer postId;
    private String postTitle;
    private String postContent;
    private LocalDateTime createdAt;
    private MultipartFile postImgPath;
    private Integer moimId;
    private Integer moimCategoryId;
    private Integer userId;

    public Post toEntity(){
        return Post.builder()
                .postTitle(postTitle)
                .postTitle(postTitle)
                .createdAt(createdAt)
                .moimId(moimId)
                .moimCategoryId(moimCategoryId)
                .userId(userId)
                .build();
    }
}
