package com.korit.nomoreback.dto.moim;

import lombok.Data;

@Data
public class MoimRoleDto {
    private Integer moimRoleId;
    private String moimRole;
    private Integer moimId;
    private Integer userId;

    private String nickName;
    private String profileImgPath;
}
