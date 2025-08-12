package com.korit.nomoreback.domain.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Integer userId;
    private String nickName;
    private String fullName;
    private String birthDate;
    private String email;
    private String profileImgPath;
    private String introduction;
    private String gender;
    private Integer categoryId;
    private String provider;
    private String providerId;
    private String userRole;
}
