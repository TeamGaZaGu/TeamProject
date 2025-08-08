package com.korit.nomoreback.dto.forum;

import lombok.Data;

@Data
public class ForumRoleDto {

    private Integer forumRoleId;
    private String forumRoleName;
    private Integer userId;
    private Integer postId;

}
