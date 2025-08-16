package com.korit.nomoreback.dto.moim;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MoimMemberWithBlockDto {
    private Integer userId;
    private String nickname;
    private String profileImgPath;
    private boolean blockedByMe;
}
