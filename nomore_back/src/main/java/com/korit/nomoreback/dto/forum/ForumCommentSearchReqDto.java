package com.korit.nomoreback.dto.forum;

import com.korit.nomoreback.domain.forum.ForumsCommentSearchOption;
import com.korit.nomoreback.domain.forum.ForumsSearchOption;
import lombok.Data;

@Data
public class ForumCommentSearchReqDto {

    private Integer page;
    private Integer size;
    private Integer forumId;

    public ForumsCommentSearchOption toOption() {
        return ForumsCommentSearchOption.builder()
                .startIndex((page - 1) * size)
                .size(size)
                .forumId(forumId)
                .build();
    }
}
