package com.korit.nomoreback.controller;

import com.korit.nomoreback.dto.report.ReportDto;
import com.korit.nomoreback.dto.response.ResponseDto;
import com.korit.nomoreback.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/report")
    public ResponseEntity<ResponseDto<?>> reqAllReport() {
        return ResponseEntity.ok(ResponseDto.success(reportService.reqAllReport()));
    }

    @PutMapping("/report")
    public ResponseEntity<ResponseDto<?>> reportUser(@RequestBody ReportDto dto) {
        System.out.println(dto);
        reportService.reportUser(dto);
        return ResponseEntity.ok(ResponseDto.success("신고되었습니다."));
    }

    @PostMapping("/report/{reportId}")
    public ResponseEntity<ResponseDto<?>> reportComplete(@PathVariable Integer reportId) {
        reportService.reportComplete(reportId);
        return ResponseEntity.ok(ResponseDto.success("조치완료 되었습니다."));
    }
}