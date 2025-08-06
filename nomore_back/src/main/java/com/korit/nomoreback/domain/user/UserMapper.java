package com.korit.nomoreback.domain.user;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    User findByUserEmail(String email);

    User findById(Integer userId);

    int insert(User entity);
}
