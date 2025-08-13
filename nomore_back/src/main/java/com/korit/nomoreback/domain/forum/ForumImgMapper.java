package com.korit.nomoreback.domain.forum;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ForumImgMapper {

    int insertImg(ForumImg forumImg);
    int insertMany(List<ForumImg> forumImgs);

}
