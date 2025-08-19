package com.korit.nomoreback.dto.moim;

import lombok.Data;

@Data
public class MoimMemberUserDto {
    private Integer userId;
    private String  nickname;
    private String  role;
    private String  status;
}
