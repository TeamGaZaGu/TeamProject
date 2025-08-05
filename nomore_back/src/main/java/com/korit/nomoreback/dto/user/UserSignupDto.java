package com.korit.nomoreback.dto.user;

import lombok.Data;

@Data
public class UserSignupDto {
    private String nickName;
    private String fullName;
    private String birthDate;
    private String gender;
    private String category;
}