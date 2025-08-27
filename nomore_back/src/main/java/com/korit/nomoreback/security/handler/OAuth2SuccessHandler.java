package com.korit.nomoreback.security.handler;

import com.korit.nomoreback.domain.user.User;
import com.korit.nomoreback.security.jwt.JwtUtil;
import com.korit.nomoreback.security.model.PrincipalUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        PrincipalUser principalUser = (PrincipalUser) authentication.getPrincipal();
        User user = principalUser.getUser();

        if (principalUser.getUser().getUserId() == null) {
            String email = URLEncoder.encode(user.getEmail(), StandardCharsets.UTF_8);
            String name = URLEncoder.encode(user.getFullName(), StandardCharsets.UTF_8);
            String provider = URLEncoder.encode(user.getProvider(), StandardCharsets.UTF_8);
            String providerId = URLEncoder.encode(user.getProviderId(), StandardCharsets.UTF_8);
            String publicToken = jwtUtil.generatePublicToken(1000 * 60 * 5);
            System.out.println("리다이렉트: 회원가입 페이지");
            String redirectUrl = String.format("http://localhost:5173/auth/signup?email=%s&name=%s&provider=%s&providerId=%s&publicToken=%s" ,email,name,provider, providerId, publicToken);
            response.sendRedirect(redirectUrl);
        } else {
            System.out.println("리다이렉트: 메인페이지");
            String accessToken = jwtUtil.generateAccessToken(principalUser.getUser());
            response.sendRedirect("http://localhost:5173/oauth2/login?accessToken=" + accessToken);
        }
    }
}