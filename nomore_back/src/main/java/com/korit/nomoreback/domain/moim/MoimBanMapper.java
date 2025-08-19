package com.korit.nomoreback.domain.moim;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MoimBanMapper {

    int insertBan(MoimBan moimBan);

    List<MoimBan> selectBanUser(Integer moimId);
}
