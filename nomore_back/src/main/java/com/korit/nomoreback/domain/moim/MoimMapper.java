package com.korit.nomoreback.domain.moim;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MoimMapper {
    Integer createMoim(Moim moim);
}
