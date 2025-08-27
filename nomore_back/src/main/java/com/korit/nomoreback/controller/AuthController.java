package com.korit.nomoreback.controller;

import com.korit.nomoreback.dto.auth.SignupReqDto;
import com.korit.nomoreback.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/auth/signup")
    public ResponseEntity<?> signin(@RequestBody @Valid SignupReqDto dto) throws BindException {
        authService.signup(dto);
        return ResponseEntity.ok("회원가입 완료");
    }

    @GetMapping("/auth/authorization/public")
    public ResponseEntity<?> authorizationPublic(@RequestParam String publicToken) {
        return ResponseEntity.ok(authService.authorizationPublic(publicToken));
    }
}
