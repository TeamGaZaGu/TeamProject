package com.korit.nomoreback.controller;

import com.korit.nomoreback.dto.user.UserProfileUpdateReqDto;
import com.korit.nomoreback.security.model.PrincipalUser;
import com.korit.nomoreback.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(
            @AuthenticationPrincipal PrincipalUser principal,
            @ModelAttribute UserProfileUpdateReqDto userProfileUpdateReqDto,
            @RequestParam(value = "profileImg", required = false) MultipartFile profileImg
    ) {
        userService.updateProfile(principal.getUser().getUserId(), userProfileUpdateReqDto, profileImg);
        System.out.println(userProfileUpdateReqDto);
        return ResponseEntity.ok().build();
    }
}