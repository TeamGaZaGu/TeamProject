package com.korit.nomoreback.dto.forum;

import com.korit.nomoreback.domain.forum.Forum;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Data
public class ForumRegisterDto {

    private String forumTitle;
    private String forumContent;
    private LocalDateTime createdAt;
    private MultipartFile forumImgPath;
    private Integer moimId;
    private Integer userId;
    private Integer forumCategoryId;

    public Forum toEntity(){
        return Forum.builder()
                .forumTitle(forumTitle)
                .forumContent(forumContent)
                .createdAt(LocalDateTime.now())
                .moimId(moimId)
                .userId(userId)
                .forumImgPath(String.valueOf(forumImgPath))
                .forumCategoryId(forumCategoryId)
                .build();
    }
}
