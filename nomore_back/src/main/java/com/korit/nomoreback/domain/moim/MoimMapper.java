package com.korit.nomoreback.domain.moim;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MoimMapper {

    Integer createMoim(Moim moim);
    List<Moim> findAll();
    Moim findByMoimId(Integer moimId);
    void increaseMoimCount(@Param("moimId") Integer moimId);

}
