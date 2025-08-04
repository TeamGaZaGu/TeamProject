package com.korit.nomoreback.domain.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.korit.nomoreback.domain.userRole.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Integer userId;
    private String username;
    private String nickName;
    private String fullName;
    @JsonIgnore
    private String password;
    private Integer age;
    private String email;
    private String profileImgPath;
    private String introduction;
    private String gender;
    private String phoneNumber;
    private Integer categoryId;
    private String provider;
    private String providerId;

    private String roleNames;
    private List<UserRole> userRoles;
}
