package com.korit.nomoreback.domain.moimRole;

import com.korit.nomoreback.dto.moim.MoimRoleDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MoimRoleMapper {
    int insertMoimRole(MoimRoleDto moimRoleDto);
    boolean isMoimIdAndUserId(@Param("moimId")Integer moimId, @Param("userId") Integer userId);
    MoimRoleDto findMoimRole(@Param("userId") Integer userId, @Param("moimId") Integer moimId);
    int deleteByMoimIdAndUserId(Integer moimId, Integer userId);

    int exitMoim(@Param("moimId") Integer moimId, @Param("userId") Integer userId);

    int updateMoimRole(@Param("userId") Integer userId, @Param("moimId") Integer moimId, @Param("moimRole") String moimRole);
    List<MoimRoleDto> findMembersByMoimIdExceptUser(@Param("moimId") Integer moimId, @Param("userId") Integer userId);
    List<MoimRoleDto> findAllMembersByMoimId(@Param("moimId") Integer moimId);

    boolean hasOwnerMoims(@Param("userId") Integer userId);
    int deleteAllByUserId(@Param("userId") Integer userId);
}
