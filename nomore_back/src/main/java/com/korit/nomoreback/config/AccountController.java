package com.korit.nomoreback.config;

import com.korit.nomoreback.security.model.PrincipalUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AccountController {

    @GetMapping("/account/principal")
    public ResponseEntity<?> principal(@AuthenticationPrincipal PrincipalUser principalUser) {
        return ResponseEntity.ok(principalUser);
    }
}
