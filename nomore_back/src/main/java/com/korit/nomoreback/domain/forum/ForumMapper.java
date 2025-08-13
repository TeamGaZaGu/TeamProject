package com.korit.nomoreback.domain.forum;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ForumMapper {
    int registerForum(Forum forum);
    Forum findByForumId(@Param("forumId")Integer forumId, @Param("userId")Integer userId );

}
