package com.korit.nomoreback.dto.moim;

import com.korit.nomoreback.domain.moim.MoimsSearchOption;
import lombok.Data;

@Data
public class MoimCategoryReqDto {

    private Integer page;
    private Integer size;
    private Integer categoryId;
    private Integer districtId;
    private String searchText;

    public MoimsSearchOption toOption() {
        return MoimsSearchOption.builder()
                .startIndex((page - 1) * size)
                .size(size)
                .categoryId(categoryId)
                .districtId(districtId)
                .searchText(searchText)
                .build();
    }
}
