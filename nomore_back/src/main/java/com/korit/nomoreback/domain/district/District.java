package com.korit.nomoreback.domain.district;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "district_tb")
public class District {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "district_id")
    private Integer districtId;

    @Column(name = "district_name")
    private String districtName;

}
