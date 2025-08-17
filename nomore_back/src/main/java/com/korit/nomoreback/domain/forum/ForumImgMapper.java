package com.korit.nomoreback.domain.forum;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ForumImgMapper {

    int insertImg(ForumImg forumImg);
    int insertMany(List<ForumImg> forumImgs);
    int modifyImg(@Param("imgList") List<ForumImg> imgList);
    List<ForumImg> findImgById(@Param("forumId") Integer forumId);
    int deleteImg(@Param("imgIds")List<Integer> imgIds);

}
