package com.korit.nomore.controller;

import com.korit.nomore.dto.response.ApiResponse;
import com.korit.nomore.dto.response.StatsResponse;
import com.korit.nomore.service.StatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/stats")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class StatsController {

    private final StatsService statsService;

    @GetMapping("/districts")
    public ResponseEntity<ApiResponse<List<StatsResponse>>> getDistrictStats() {
        List<StatsResponse> stats = statsService.getDistrictStats();
        ApiResponse<List<StatsResponse>> response = ApiResponse.success(
                stats,
                "구별 모임 통계를 성공적으로 조회했습니다."
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<StatsResponse>>> getCategoryStats() {
        List<StatsResponse> stats = statsService.getCategoryStats();
        ApiResponse<List<StatsResponse>> response = ApiResponse.success(
                stats,
                "카테고리별 모임 통계를 성공적으로 조회했습니다."
        );
        return ResponseEntity.ok(response);
    }
}
