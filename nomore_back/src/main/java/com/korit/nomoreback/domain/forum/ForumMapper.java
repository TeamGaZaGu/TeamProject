package com.korit.nomoreback.domain.forum;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ForumMapper {
    int registerForum(Forum forum);
    Forum findByForumIdAndUserId(@Param("forumId")Integer forumId, @Param("userId")Integer userId );
    Forum findByForumId(@Param("forumId") Integer forumId);
    int modifyForum(Forum forum);
    int deleteForum(@Param("forumId") Integer forumId);

}
