package com.korit.nomoreback.domain.moimRole;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MoimRole {
    private Integer moimRoleId;
    private String moimRole;
    private Integer moimId;
    private Integer userId;
}
