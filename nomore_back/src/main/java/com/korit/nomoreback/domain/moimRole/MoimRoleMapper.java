package com.korit.nomoreback.domain.moimRole;

import com.korit.nomoreback.dto.moim.MoimRoleDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MoimRoleMapper {
    int insertMoimRole(MoimRoleDto moimRoleDto);
    boolean isMoimIdAndUserId(@Param("moimId")Integer moimId, @Param("userId") Integer userId);
    MoimRoleDto findRoleByUserAndMoimId(@Param("userId") Integer userId, @Param("moimId") Integer moimId);
    int deleteByMoimIdAndUserId(Integer moimId, Integer userId);

    int exitMoim(@Param("moimId") Integer moimId, @Param("userId") Integer userId);
}
