package com.korit.nomoreback.domain.moim;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MoimsSearchOption {
    private Integer startIndex;
    private Integer size;
    private Integer categoryId;
    private Integer districtId;
    private String searchText;
}
