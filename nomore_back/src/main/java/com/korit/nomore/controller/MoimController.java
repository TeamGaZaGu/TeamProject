package com.korit.nomore.controller;

import com.korit.nomore.dto.request.MoimFilterRequest;
import com.korit.nomore.dto.response.ApiResponse;
import com.korit.nomore.dto.response.MoimListResponse;
import com.korit.nomore.dto.response.MoimResponse;
import com.korit.nomore.service.MoimService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/moims")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MoimController {

    private final MoimService moimService;

    @GetMapping
    public ResponseEntity<ApiResponse<MoimListResponse>> getMoims(
            @Valid @ModelAttribute MoimFilterRequest request) {
        MoimListResponse response = moimService.getMoimsWithFilters(request);
        ApiResponse<MoimListResponse> apiResponse = ApiResponse.success(
                response,
                "모임 목록을 성공적으로 조회했습니다."
        );
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<MoimResponse>> getMoim(@PathVariable Long id) {
        return moimService.getMoimById(id)
                .map(moim -> ResponseEntity.ok(
                        ApiResponse.success(moim, "모임 상세정보를 성공적으로 조회했습니다.")
                ))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/popular")
    public ResponseEntity<ApiResponse<List<MoimResponse>>> getPopularMoims(
            @RequestParam(defaultValue = "5") int limit) {
        List<MoimResponse> moims = moimService.getPopularMoims(limit);
        ApiResponse<List<MoimResponse>> response = ApiResponse.success(
                moims,
                "인기 모임 목록을 성공적으로 조회했습니다."
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/recent")
    public ResponseEntity<ApiResponse<List<MoimResponse>>> getRecentMoims(
            @RequestParam(defaultValue = "5") int limit) {
        List<MoimResponse> moims = moimService.getRecentMoims(limit);
        ApiResponse<List<MoimResponse>> response = ApiResponse.success(
                moims,
                "최신 모임 목록을 성공적으로 조회했습니다."
        );
        return ResponseEntity.ok(response);
    }
}
