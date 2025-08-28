package com.korit.nomoreback.dto.forum;

import com.korit.nomoreback.domain.forum.ForumsSearchOption;
import com.korit.nomoreback.domain.moim.MoimsSearchOption;
import lombok.Data;

@Data
public class ForumSearchReqDto {

    private Integer page;
    private Integer size;
    private Integer moimId;

    public ForumsSearchOption toOption() {
        return ForumsSearchOption.builder()
                .startIndex((page - 1) * size)
                .size(size)
                .moimId(moimId)
                .build();
    }
}
