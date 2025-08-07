package com.korit.nomoreback.domain.postRole;

import lombok.Data;

@Data
public class PostRole {
    private Integer postRoleId;
    private String postRoleName;
    private Integer userId;
    private Integer postId;
}
