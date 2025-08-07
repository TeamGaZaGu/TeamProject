package com.korit.nomoreback.dto.user;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserProfileUpdateReqDto {
    private Integer userId;
    private String nickName;
    private String introduction;
    private Integer categoryId;
    private String profileImgPath;
}
