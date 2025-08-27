package com.korit.nomoreback.domain.report;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReportMapper {

    List<Report> reqAllReport();

    void reportUser(Report report);

    void reportComplete(Integer reportId);
}