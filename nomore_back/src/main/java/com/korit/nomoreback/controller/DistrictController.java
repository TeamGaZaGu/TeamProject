package com.korit.nomoreback.controller;

import com.korit.nomoreback.dto.DistrictReqDto;
import com.korit.nomoreback.service.DistrictService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/search")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class DistrictController {

    private final DistrictService districtService;

    public DistrictController (DistrictService districtService){
        this.districtService = districtService;
    }

    @GetMapping("/district")
    public List<DistrictReqDto> searchDistrict() {
        return districtService.getDistrict();
    }
}
