package com.korit.nomoreback.service;

import com.korit.nomoreback.domain.user.User;
import com.korit.nomoreback.domain.user.UserMapper;
import com.korit.nomoreback.security.model.PrincipalUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class OAuth2UserService extends DefaultOAuth2UserService {

    private final UserMapper userMapper;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        String providerId = null;
        String email = null;
        String name = null;

        OAuth2User oAuth2User = super.loadUser(userRequest);

        if ("google".equals(registrationId)) {
            providerId = oAuth2User.getAttribute("sub");
            email = oAuth2User.getAttribute("email");
            name = oAuth2User.getAttribute("name");
        } else if ("kakao".equals(registrationId)) {
            Map<String, Object> attributes = oAuth2User.getAttributes();
            Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
            Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
            email = kakaoAccount.get("email").toString();
            name = profile.get("nickname").toString();
            providerId = attributes.get("id").toString();
        }

        User user = userMapper.findByProviderId(providerId);

        if (user == null) {
            user = User.builder()
                    .fullName(name)
                    .email(email)
                    .provider(registrationId)
                    .providerId(providerId)
                    .build();
        }

        System.out.println("요청 성공");
        return PrincipalUser.builder()
                .user(user)
                .attributes(oAuth2User.getAttributes())
                .build();
    }
}
