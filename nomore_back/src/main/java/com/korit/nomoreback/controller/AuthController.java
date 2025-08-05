package com.korit.nomoreback.controller;

import com.korit.nomoreback.dto.user.UserSignupDto;
import com.korit.nomoreback.security.model.PrincipalUser;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @PostMapping("/auth/signup")
    public ResponseEntity<?> signup(
            @RequestBody UserSignupDto dto,
            @AuthenticationPrincipal PrincipalUser user) {
        return ResponseEntity.ok().build();
    }

}