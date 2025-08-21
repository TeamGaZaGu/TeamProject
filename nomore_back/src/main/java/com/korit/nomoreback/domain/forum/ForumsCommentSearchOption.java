package com.korit.nomoreback.domain.forum;

import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ForumsCommentSearchOption {
    private Integer startIndex;
    private Integer size;
    private Integer forumId;
}
