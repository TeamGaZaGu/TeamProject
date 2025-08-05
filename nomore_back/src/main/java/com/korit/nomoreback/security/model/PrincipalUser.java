package com.korit.nomoreback.security.model;

import com.korit.nomoreback.domain.user.User;
import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Builder
@Data
public class PrincipalUser implements UserDetails, OAuth2User {
    private User user;
    private Map<String, Object> attributes;
    private boolean isNewUser; // 신규 회원 여부 (OAuth2UserService에서 세팅)

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // null-safe: userRoles가 없을 수도 있으므로 방어코드
        if (user.getUserRoles() == null) return List.of();
        return user.getUserRoles()
                .stream()
                .map(userRole -> new SimpleGrantedAuthority(userRole.getRole().getRoleName()))
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        // 소셜로그인만 쓰면 사실상 의미없음, 자체 회원도 지원한다면 그대로 둠
        return user.getPassword() != null ? user.getPassword() : "";
    }

    @Override
    public String getUsername() {
        // 닉네임, 이메일, userId 순으로 반환 (권장)
        if (user.getNickName() != null && !user.getNickName().isEmpty()) {
            return user.getNickName();
        }
        if (user.getEmail() != null && !user.getEmail().isEmpty()) {
            return user.getEmail();
        }
        if (user.getUserId() != null) {
            return user.getUserId().toString();
        }
        // DB에도 없을 때 fallback (사실상 거의 안 옴)
        return UUID.randomUUID().toString();
    }

    @Override
    public String getName() {
        // principalName cannot be empty 오류 방지
        if (user.getNickName() != null && !user.getNickName().isEmpty()) {
            return user.getNickName();
        }
        if (user.getEmail() != null && !user.getEmail().isEmpty()) {
            return user.getEmail();
        }
        if (user.getUserId() != null) {
            return user.getUserId().toString();
        }
        return UUID.randomUUID().toString();
    }

    @Override
    public boolean isAccountNonExpired() { return true; }
    @Override
    public boolean isAccountNonLocked() { return true; }
    @Override
    public boolean isCredentialsNonExpired() { return true; }
    @Override
    public boolean isEnabled() { return true; }
    @Override
    public Map<String, Object> getAttributes() { return attributes; }
}