package com.korit.nomoreback.domain.user;

import com.korit.nomoreback.dto.user.UserProfileUpdateReqDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {

    List<User> allUser();

    void blockUser(Integer userId, Integer userSiteBlock);

    void unBlockUser(Integer userId, Integer userSiteBlock);

    User findByProviderId(String providerId);
    User findByNicName(String nickName);

    User findById(Integer userId);

    int insert(User entity);

    void updateProfile(UserProfileUpdateReqDto reqDto);
    String findProfileImgPathByUserId(int userId);
}
