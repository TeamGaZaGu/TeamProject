package com.korit.nomoreback.domain.user;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    User findByProviderId(String providerId);
    User findByNicName(String nickName);

    User findById(Integer userId);

    int insert(User entity);
}
