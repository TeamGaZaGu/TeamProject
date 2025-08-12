package com.korit.nomoreback.domain.forum;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Forum {
    private Integer forumId;
    private String forumTitle;
    private String forumContent;
    private String forumImgPath;
    private LocalDateTime createdAt;
    private Integer forumCategoryId;

    private Integer moimId;
    private Integer moimCategoryId;
    private Integer userId;

}
