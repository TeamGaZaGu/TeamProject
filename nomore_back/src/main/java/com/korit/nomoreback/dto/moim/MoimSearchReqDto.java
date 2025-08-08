package com.korit.nomoreback.dto.moim;

import lombok.Data;

@Data
public class MoimSearchReqDto {
    private Integer districtId;
    private Integer categoryId;
    private String keyword;
    
}