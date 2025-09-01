package com.korit.nomoreback.domain.forum;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ForumImgMapper {

    int insertImg(ForumImg forumImg);
    int insertMany(@Param("forumImg") List<ForumImg> forumImgs);
    int modifyImg(ForumImg forumImgs);
    List<ForumImg> findImgById(@Param("forumId") Integer forumId);
    int deleteImg(@Param("imgIds")List<Integer> imgIds);
    void deleteByUserId(Integer userId);
    List<String> findAllPathsByUserId(Integer userId);
}
