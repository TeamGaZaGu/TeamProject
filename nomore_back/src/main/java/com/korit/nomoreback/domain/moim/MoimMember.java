package com.korit.nomoreback.domain.moim;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MoimMember {
    private Integer moimId;
    private Integer userId;
    private String nickname;
    private String profileImgPath;
}
