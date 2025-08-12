package com.korit.nomoreback.domain.forum;

import com.korit.nomoreback.dto.forum.ForumRoleDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ForumRoleMapper {
    int insertForumRole(ForumRoleDto forumRoleDto);
}
