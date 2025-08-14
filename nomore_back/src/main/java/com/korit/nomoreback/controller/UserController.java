package com.korit.nomoreback.controller;

import com.korit.nomoreback.domain.user.User;
import com.korit.nomoreback.domain.user.UserMapper;
import com.korit.nomoreback.dto.user.UserProfileUpdateReqDto;
import com.korit.nomoreback.security.model.PrincipalUser;
import com.korit.nomoreback.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    @GetMapping("/admin")
    public ResponseEntity<List<User>> allUser() {
        System.out.println(userService.allUser());
        return ResponseEntity.ok(userService.allUser());
    }

    @PutMapping("/blockUser")
    public ResponseEntity<?> blockUser(@RequestParam Integer userId) {
        userService.blockUser(userId);
        return ResponseEntity.ok("회원 차단 완료");
    }

    @PutMapping("/unBlockUser")
    public ResponseEntity<?> unBlockUser(@RequestParam Integer userId) {
        userService.unBlockUser(userId);
        return ResponseEntity.ok("회원 차단 완료");
    }

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