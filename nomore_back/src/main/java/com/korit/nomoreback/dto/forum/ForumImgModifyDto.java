package com.korit.nomoreback.dto.forum;

import com.korit.nomoreback.domain.forum.ForumImg;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class ForumImgModifyDto {
    private Integer forumImgId;
    private Integer seq;
    private MultipartFile path;
    private List<ForumImg> imgList;
}
