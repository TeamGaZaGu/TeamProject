package com.korit.nomoreback.domain.forum;

import com.korit.nomoreback.util.ImageUrlUtil;
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

    public ForumImg buildImageUrl(ImageUrlUtil imageUrlUtil) {
        this.path = imageUrlUtil.buildImageUrl(this.path, "forum");
        return this;
    }
}
