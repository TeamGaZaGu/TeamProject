package com.korit.nomoreback.service;

import com.korit.nomoreback.domain.role.Role;
import com.korit.nomoreback.domain.role.RoleMapper;
import com.korit.nomoreback.domain.user.User;
import com.korit.nomoreback.domain.user.UserMapper;
import com.korit.nomoreback.domain.userRole.UserRole;
import com.korit.nomoreback.domain.userRole.UserRoleMapper;
import com.korit.nomoreback.security.model.PrincipalUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OAuth2UserService extends DefaultOAuth2UserService {

    private final UserMapper userMapper;
    private final UserRoleMapper userRoleMapper;
    private final RoleMapper roleMapper;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        String providerId = null;
        String email = null;
        String name = null;
        String profileImgPath = null;

        if ("google".equals(registrationId)) {
            providerId = oAuth2User.getAttribute("sub");
            email = oAuth2User.getAttribute("email");
            name = oAuth2User.getAttribute("name");
            profileImgPath = oAuth2User.getAttribute("picture");
        } else if ("kakao".equals(registrationId)) {
            Map<String, Object> attributes = oAuth2User.getAttributes();
            Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
            Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");

            providerId = attributes.get("id").toString();
            email = kakaoAccount.get("email") != null ? kakaoAccount.get("email").toString() : null;
            name = profile.get("nickname") != null ? profile.get("nickname").toString() : null;
            profileImgPath = profile.get("profile_image_url") != null ? profile.get("profile_image_url").toString() : "/profile/default.jpg";
        } else {
            throw new OAuth2AuthenticationException("지원하지 않는 소셜 로그인입니다: " + registrationId);
        }

        User user = userMapper.findByProviderAndProviderId(registrationId, providerId);

        if (user == null) {
            // 1. 닉네임 기본값 생성
            String baseNickName = (name != null && !name.isEmpty())
                    ? name
                    : (email != null ? email.split("@")[0] : "user" + System.currentTimeMillis());
            String nickName = baseNickName;
            int count = 1;
            // 2. nickName 중복 있으면 뒤에 숫자 붙이기
            while (userMapper.findByNickName(nickName) != null) {
                nickName = baseNickName + "_" + count;
                count++;
            }

            user = User.builder()
                    .nickName(nickName)
                    .fullName(name != null ? name : nickName)
                    .email(email != null ? email : (nickName + "@temp.com"))
                    .profileImgPath(profileImgPath != null ? profileImgPath : "/profile/default.jpg")
                    .provider(registrationId)
                    .providerId(providerId)
                    .password(passwordEncoder.encode(UUID.randomUUID().toString()))
                    .age(0)
                    .introduction("")
                    .gender("Unknown")
                    .categoryId(1)
                    .build();

            userMapper.insert(user);

            Role role = roleMapper.findByRoleName("ROLE_USER");
            if (role == null) {
                throw new OAuth2AuthenticationException("기본 권한이 DB에 없습니다.");
            }

            UserRole userRole = UserRole.builder()
                    .roleId(role.getRoleId())
                    .userId(user.getUserId())
                    .build();

            userRoleMapper.insert(userRole);
            userRole.setRole(role);
            user.setUserRoles(List.of(userRole));
        }

        return PrincipalUser.builder()
                .user(user)
                .attributes(oAuth2User.getAttributes())
                .build();
    }
}
