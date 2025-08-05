package com.korit.nomoreback.security.handler;

import com.korit.nomoreback.security.model.PrincipalUser;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        PrincipalUser principal = (PrincipalUser) authentication.getPrincipal();

        if (principal.isNewUser()) {
            System.out.println("리다이렉트: 회원가입 페이지");
            response.sendRedirect("http://localhost:5173/auth/signup");
        } else {
            System.out.println("리다이렉트: 메인페이지");
            response.sendRedirect("http://localhost:5173/");
        }
    }
}