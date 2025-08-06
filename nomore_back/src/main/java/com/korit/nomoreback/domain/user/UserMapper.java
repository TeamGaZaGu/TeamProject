package com.korit.nomoreback.domain.user;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    User findByProviderId(String providerId);

    User findById(Integer userId);

    int insert(User entity);
}
