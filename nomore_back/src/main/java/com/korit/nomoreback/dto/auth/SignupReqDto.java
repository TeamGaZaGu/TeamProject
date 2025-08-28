package com.korit.nomoreback.dto.auth;

import com.korit.nomoreback.domain.user.User;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class SignupReqDto {
    @Pattern(regexp = "^[a-zA-Z0-9가-힣]{2,15}$", message = "닉네임은 2~15자 사이의 한글, 영어, 숫자만 가능합니다.")
    private String nickName;
    @Pattern(regexp = "^[가-힣]{2,10}$", message = "이름은 2~10자의 한글만 입력해주세요.")
    private String fullName;
    @Pattern(regexp = "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$", message = "생년월일은 YYYY-MM-DD 형식으로 정확히 입력해주세요.")
    private String birthDate;
    private String email;
    private String profileImgPath;
    private String introduction;
    private String gender;
    private Integer categoryId;
    private String provider;
    private String providerId;

    public User toEntity() {
        return User.builder()
                .nickName(nickName)
                .fullName(fullName)
                .birthDate(birthDate)
                .email(email)
                .profileImgPath("default.jpg")
                .introduction(introduction)
                .gender(gender)
                .categoryId(categoryId)
                .provider(provider)
                .providerId(providerId)
                .userRole("ROLE_USER")
                .userSiteBlock(0)
                .build();
    }
}
