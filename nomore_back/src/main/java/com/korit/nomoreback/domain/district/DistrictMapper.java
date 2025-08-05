package com.korit.nomoreback.domain.district;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DistrictMapper {

    List<District> searchDistrict();

}
