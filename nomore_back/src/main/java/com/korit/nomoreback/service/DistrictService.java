package com.korit.nomoreback.service;

import com.korit.nomoreback.domain.category.CategoryMapper;
import com.korit.nomoreback.domain.district.District;
import com.korit.nomoreback.domain.district.DistrictMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class DistrictService {

    private final DistrictMapper districtMapper;

    public List<District> searchDistrict(){
        return districtMapper.searchDistrict();
    }

}
