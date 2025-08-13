package com.korit.nomoreback.dto.forum;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class ForumModifyDto {

    private String forumId;
    private String forumTitle;
    private String forumContent;
    private List<MultipartFile> forumImages;
    private Integer forumCategoryId;

}
