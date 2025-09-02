package com.korit.nomoreback.domain.forum;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ForumLikeMapper {
    int insertLike(@Param("forumId") Integer forumId, @Param("userId")Integer userId);
    int deleteLike(@Param("forumId") Integer forumId,@Param("userId")Integer userId);
    int getLikeCount(@Param("forumId") Integer forumId);
    void deleteByUserId(@Param("userId") Integer userId);
    void deleteByUserIdAndMoimId(@Param("userId") Integer userId,  @Param("moimId") Integer moimId);
}
