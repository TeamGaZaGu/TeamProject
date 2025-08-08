package com.korit.nomoreback.domain.forum;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ForumCommentMapper {

    int insert(ForumComment forumComment);
    List<ForumComment> findAllByForumId(Integer forumId);

}
