package com.korit.nomoreback.domain.moim;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MoimBanMapper {

    int insertBan(MoimBan moimBan);

    boolean existsByMoimIdAndUserId(@Param("moimId") Integer moimId, @Param("userId") Integer userId);
}
