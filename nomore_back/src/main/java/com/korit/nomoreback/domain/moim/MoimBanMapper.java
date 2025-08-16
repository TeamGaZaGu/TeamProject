package com.korit.nomoreback.domain.moim;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MoimBanMapper {

    int insert(MoimBan moimBan);

    int delete(@Param("moimId") Integer moimId, @Param("userId") Integer userId);

    MoimBan findByMoimIdAndUserId(@Param("moimId") Integer moimId, @Param("userId") Integer userId);

    List<Integer> findBannedUserIdsByMoimId(@Param("moimId") Integer moimId);

    List<MoimBan> findBannedUsersByMoimId(@Param("moimId") Integer moimId);

    List<Integer> findBannedMoimIdsByUserId(@Param("userId") Integer userId);
}