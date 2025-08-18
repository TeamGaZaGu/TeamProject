package com.korit.nomoreback.domain.forum;

import com.korit.nomoreback.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ForumComment {

    private Integer forumCommentId;
    private Integer forumId;
    private Integer parentCommentId;
    private Integer parentUserId;
    private Integer userId;
    private Integer level;
    private String path;
    private Integer parentId;
    private String parentUsername;
    private String forumComment;
    private LocalDateTime createdAt;

    private Integer moimId;
    private User user;


}
