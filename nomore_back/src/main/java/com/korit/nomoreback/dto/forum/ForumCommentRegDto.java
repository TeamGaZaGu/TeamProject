package com.korit.nomoreback.dto.forum;

import com.korit.nomoreback.domain.forum.ForumComment;
import lombok.Data;

@Data
public class ForumCommentRegDto {
    private Integer moimId;
    private Integer forumId;
    private Integer parentCommentId;
    private Integer parentUserId;
    private String content;

    public ForumComment toEntity(Integer userId) {
        return ForumComment.builder()
                .moimId(moimId)
                .forumId(forumId)
                .parentCommentId(parentCommentId)
                .parentUserId(parentUserId)
                .userId(userId)
                .forumComment(content)
                .build();
    }
}
