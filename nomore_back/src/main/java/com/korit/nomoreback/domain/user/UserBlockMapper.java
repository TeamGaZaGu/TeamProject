package com.korit.nomoreback.domain.user;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserBlockMapper {

    UserBlock findByBlockerIdAndBlockedId(
            @Param("blockerId") Integer blockerId,
            @Param("blockedId") Integer blockedId
    );

    void insert(UserBlock userBlock);

    int delete(
            @Param("blockerId") Integer blockerId,
            @Param("blockedId") Integer blockedId
    );

    List<Integer> findBlockedUserIdsByBlockerId(Integer userId);

    List<Integer> findBlockerIdsByBlockedId(
            @Param("blockedId") Integer blockedId
    );

    List<UserBlock> findBlockedUsersByBlockerId(
            @Param("blockerId") Integer blockerId
    );
}
