package com.korit.nomoreback.domain.report;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Report {

    private Integer reportId;
    private Integer reporterId;
    private String reporterNickName;
    private Integer targetType;
    private Integer targetId;
    private String targetNickName;
    private String reason;
    private Integer status;
    private LocalDateTime createdAt;

    private Integer moimId;
}