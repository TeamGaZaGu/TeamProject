package com.korit.nomoreback.dto.report;

import com.korit.nomoreback.domain.report.Report;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReportDto {

    private Integer userId;
    private Integer targetType;
    private Integer targetId;
    private String reason;

    public Report toEntity() {
        return Report.builder()
                .reporterId(userId)
                .targetType(targetType)
                .targetId(targetId)
                .reason(reason)
                .status(1)
                .createdAt(LocalDateTime.now())
                .build();
    }
}
