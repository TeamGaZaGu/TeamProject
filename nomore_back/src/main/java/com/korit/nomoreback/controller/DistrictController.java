package com.korit.nomoreback.controller;

import com.korit.nomoreback.domain.district.District;
import com.korit.nomoreback.dto.district.DistrictReqDto;
import com.korit.nomoreback.service.DistrictService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/search")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequiredArgsConstructor
public class DistrictController {

    private final DistrictService districtService;

    @GetMapping("/district")
    public List<District> searchDistrict(){
        return districtService.searchDistrict();
    }

}
