package com.korit.nomoreback.domain.forum;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ForumsSearchOption {
    private Integer startIndex;
    private Integer size;
    private Integer moimId;

    private Integer userId;
}
