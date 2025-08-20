package com.korit.nomoreback.dto.moim;

import com.korit.nomoreback.domain.moim.Moim;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MoimCategoryRespDto {
    private List<Moim> contents;
    private Integer totalElements;
    private Integer totalPages;
    private Integer page;
    private Integer size;
    private Boolean isLast;
}
