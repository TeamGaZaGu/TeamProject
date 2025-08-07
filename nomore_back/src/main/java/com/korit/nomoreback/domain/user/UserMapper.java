package com.korit.nomoreback.domain.user;

import com.korit.nomoreback.dto.user.UserProfileUpdateReqDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    User findByProviderId(String providerId);
    User findByNicName(String nickName);

    User findById(Integer userId);

    int insert(User entity);

    void updateProfile(UserProfileUpdateReqDto reqDto);
    String findProfileImgPathByUserId(int userId);
}
