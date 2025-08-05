package com.korit.nomoreback.dto;

import com.korit.nomoreback.domain.district.District;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DistrictReqDto {
    private String districtName;

    public static DistrictReqDto getDistrict(District district) {
        return new DistrictReqDto(district.getDistrictName());
    }
}
