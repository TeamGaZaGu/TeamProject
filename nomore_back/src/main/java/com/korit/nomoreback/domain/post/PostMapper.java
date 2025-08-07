package com.korit.nomoreback.domain.post;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PostMapper {
    int registerForum(Post post);
}
