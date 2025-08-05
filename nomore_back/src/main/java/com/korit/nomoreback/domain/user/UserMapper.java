package com.korit.nomoreback.domain.user;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserMapper {
    int insert(User user);
    User findByUsername(@Param("username") String username);
    User findById(@Param("userId") Integer userId);
    List<User> findAllBySearchOption(UserSearchOption option);
    int getCountOfOptions(UserSearchOption option);
    int updateProfileImgPathById(@Param("userId") Integer userId, @Param("path") String path);
    int update(User user);
    int deleteByIds(@Param("userIds") List<Integer> userIds);

    User findByProviderAndProviderId(@Param("provider") String provider, @Param("providerId") String providerId);

    User findByNickName(String nickName);
}
