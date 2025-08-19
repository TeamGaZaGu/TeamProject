package com.korit.nomoreback.dto.block;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BlockResDto {
    private Integer blockerId;
    private Integer blockedId;
}