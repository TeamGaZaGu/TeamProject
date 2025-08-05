package com.korit.nomoreback.domain.district;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;


@Data
@Entity
public class District {
    @Id
    private Integer districtId;

    private String districtName;

}
