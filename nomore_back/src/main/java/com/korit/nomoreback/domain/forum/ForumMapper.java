package com.korit.nomoreback.domain.forum;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ForumMapper {
    int registerForum(Forum forum);
    Forum findByForumIdAndUserId(@Param("forumId")Integer forumId, @Param("userId")Integer userId );
    Forum findByForumId(@Param("forumId") Integer forumId);
    int modifyForum(Forum forum);
    int deleteForum(@Param("forumId") Integer forumId);
    List<Forum> findByMoimId(
            @Param("moimId") Integer moimId,
            @Param("userId") Integer userId
    );
    List<Forum> findByCategoryId(
            @Param("moimId") Integer moimId,
            @Param("categoryId") Integer categoryId,
            @Param("userId") Integer userId
    );
    List<ForumImg> findImgsByForumId(@Param("forumId") Integer forumId);

    List<ForumCategory> getFourumCategories();
}
