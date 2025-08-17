package com.korit.nomoreback.domain.user;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserBlock {
    private Integer blockId;
    private Integer blockerId;
    private Integer blockedId;
}
