package com.korit.nomoreback.service;

import com.korit.nomoreback.domain.report.Report;
import com.korit.nomoreback.domain.report.ReportMapper;
import com.korit.nomoreback.dto.report.ReportDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportMapper reportMapper;

    public List<Report> reqAllReport() {
        return reportMapper.reqAllReport();
    }

    public void reportUser(ReportDto dto) {
        reportMapper.reportUser(dto.toEntity());
    }

    public void reportComplete(Integer reportId) {
        reportMapper.reportComplete(reportId);
    }
}