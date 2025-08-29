package com.korit.nomoreback.domain.user;

import com.korit.nomoreback.dto.user.UserProfileUpdateReqDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserMapper {

    List<User> allUser();

    void blockUser(Integer userId);

    void unBlockUser(Integer userId);

    User findByProviderId(String providerId);
    User findByNicName(String nickName);

    User findById(Integer userId);

    int insert(User entity);

    int updateProfile(User user);
    String findProfileImgPathByUserId(int userId);

    void deleteUser(Integer userId);
}
