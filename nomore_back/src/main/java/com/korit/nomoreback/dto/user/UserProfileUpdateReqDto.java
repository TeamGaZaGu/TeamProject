package com.korit.nomoreback.dto.user;

import com.korit.nomoreback.domain.user.User;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
public class UserProfileUpdateReqDto {
    private Integer userId;
    private String nickName;
    private String introduction;
    private Integer categoryId;
    private MultipartFile profileImgPath;

    public User toUser() {
        return User.builder()
                .nickName(nickName)
                .introduction(introduction)
                .categoryId(categoryId)
                .build();
    }
}
