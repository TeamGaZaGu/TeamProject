package com.korit.nomoreback.dto.forum;

import com.korit.nomoreback.domain.forum.ForumComment;
import lombok.Data;

@Data
public class ForumCommentModifyDto {
    private Integer forumCommentId;
    private String forumComment;

    public ForumComment toEntity(ForumComment forum) {
        if (forumComment != null) forum.setForumComment(forumComment);
        return forum;
    }
}
