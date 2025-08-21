package com.korit.nomoreback.dto.forum;

import com.korit.nomoreback.domain.forum.Forum;
import com.korit.nomoreback.domain.moim.Moim;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ForumSearchRespDto {
    private List<Forum> contents;
    private Integer totalElements;
    private Integer totalPages;
    private Integer page;
    private Integer size;
    private Boolean isLast;
}
