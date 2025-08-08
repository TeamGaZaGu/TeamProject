package com.korit.nomoreback.dto.forum;

import com.korit.nomoreback.domain.forum.Forum;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Data
public class ForumRegisterDto {
    private Integer forumId;
    private String forumTitle;
    private String forumContent;
    private LocalDateTime createdAt;
    private MultipartFile forumImgPath;
    private Integer moimId;
    private Integer moimCategoryId;
    private Integer userId;

    public Forum toEntity(){
        return Forum.builder()
                .forumTitle(forumTitle)
                .createdAt(LocalDateTime.now())
                .moimId(moimId)
                .moimCategoryId(moimCategoryId)
                .userId(userId)
                .build();
    }
}
