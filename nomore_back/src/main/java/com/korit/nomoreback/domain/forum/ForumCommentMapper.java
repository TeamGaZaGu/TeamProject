package com.korit.nomoreback.domain.forum;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ForumCommentMapper {

    int insert(ForumComment forumComment);
    List<ForumComment> findAllByForumId(Integer forumId);
    int getCountByForumId(Integer forumId);
    int modifyComment(ForumComment forumComment);
    int deleteComment(@Param("forumCommentId") Integer forumCommentId);
    ForumComment findByCommentId(@Param("forumCommentId") Integer forumCommentId);

    Integer getCountOfOptions(ForumsCommentSearchOption option);
    List<ForumComment> findAllOfOptions(ForumsCommentSearchOption option);

    void deleteByUserId(@Param("userId") Integer userId);
}
