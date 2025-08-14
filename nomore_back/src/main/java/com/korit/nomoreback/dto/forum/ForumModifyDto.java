package com.korit.nomoreback.dto.forum;

import com.korit.nomoreback.domain.forum.Forum;
import com.korit.nomoreback.domain.forum.ForumCategory;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class ForumModifyDto {

    private Integer forumId;
    private String forumTitle;
    private String forumContent;
    private List<MultipartFile> forumImages;
    private ForumCategory forumCategory;

    public Forum modify(Forum forum) {
        if (forumTitle != null ) forum.setForumTitle(forumTitle);
        if (forumContent != null ) forum.setForumContent(forumContent);
        if (forumCategory != null ) forum.setForumCategory(forumCategory);
        return forum;
    }

}
