package com.korit.nomoreback.domain.forum;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ForumMapper {
    int registerForum(Forum forum);
    Forum findByForumId(@Param("forumId")Integer forumId, @Param("userId")Integer userId );


    List<ForumCategory> getFourumCategories();
}
