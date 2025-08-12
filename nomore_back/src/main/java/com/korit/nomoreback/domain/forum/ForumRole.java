package com.korit.nomoreback.domain.forum;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.annotations.Mapper;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ForumRole {
    private Integer forumRoleId;
    private Integer userId;
    private Integer forumId;
    private String forumRoleName;
}


