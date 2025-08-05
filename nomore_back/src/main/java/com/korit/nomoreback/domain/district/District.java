package com.korit.nomoreback.domain.district;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class District {

    private Integer districtId;

    private String districtName;

}
