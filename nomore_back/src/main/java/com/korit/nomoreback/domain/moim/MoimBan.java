package com.korit.nomoreback.domain.moim;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MoimBan {
    private Integer banId;
    private Integer moimId;
    private Integer userId;
}