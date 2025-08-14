package com.korit.nomoreback.domain.forum;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ForumImg {
    private Integer forumImgId;
    private Integer forumId;
    private Integer seq;
    private String path;
}
