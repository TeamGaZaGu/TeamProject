package com.korit.nomore.controller;

import com.korit.nomore.domain.entity.District;
import com.korit.nomore.dto.response.ApiResponse;
import com.korit.nomore.service.DistrictService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/districts")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DistrictController {

    private final DistrictService districtService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<District>>> getDistricts() {
        List<District> districts = districtService.getAllDistricts();
        ApiResponse<List<District>> response = ApiResponse.success(
                districts,
                "부산광역시 구/군 목록을 성공적으로 조회했습니다."
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<District>> getDistrict(@PathVariable String id) {
        return districtService.getDistrictById(id)
                .map(district -> ResponseEntity.ok(
                        ApiResponse.success(district, "구/군 정보를 성공적으로 조회했습니다.")
                ))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<ApiResponse<List<District>>> getDistrictsByType(
            @PathVariable District.DistrictType type) {
        List<District> districts = districtService.getDistrictsByType(type);
        ApiResponse<List<District>> response = ApiResponse.success(
                districts,
                type.name() + " 타입의 구/군 목록을 성공적으로 조회했습니다."
        );
        return ResponseEntity.ok(response);
    }
}
