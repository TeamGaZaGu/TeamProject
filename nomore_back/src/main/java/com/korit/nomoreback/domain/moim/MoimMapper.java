package com.korit.nomoreback.domain.moim;

import com.korit.nomoreback.dto.moim.MoimModifyDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MoimMapper {

    Integer createMoim(Moim moim);
    List<Moim> findAll();
    Moim findByMoimId(Integer moimId);
    void increaseMoimCount(@Param("moimId") Integer moimId);
    int updateMoim(Moim moim);
    int deleteMoimById(@Param("moimId") Integer moimId);

}
