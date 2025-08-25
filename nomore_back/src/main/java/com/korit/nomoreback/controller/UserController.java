package com.korit.nomoreback.controller;

import com.korit.nomoreback.domain.user.User;
import com.korit.nomoreback.domain.user.UserMapper;
import com.korit.nomoreback.dto.response.ResponseDto;
import com.korit.nomoreback.dto.user.UserProfileUpdateReqDto;
import com.korit.nomoreback.security.model.PrincipalUser;
import com.korit.nomoreback.service.UserBlockService;
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
    private final UserBlockService userBlockService;


    @GetMapping("/admin")
    public ResponseEntity<List<User>> allUser() {
        return ResponseEntity.ok(userService.allUser());
    }

    @PutMapping("/siteBlockUser")
    public ResponseEntity<?> blockUser(@RequestParam Integer userId) {
        userService.blockUser(userId);
        return ResponseEntity.ok("회원 사이트 차단 완료");
    }

    @PutMapping("/siteUnBlockUser")
    public ResponseEntity<?> unBlockUser(@RequestParam Integer userId) {
        userService.unBlockUser(userId);
        return ResponseEntity.ok("회원 사이트 차단해제 완료");
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


    @PostMapping("/userBlock")
    public ResponseEntity<ResponseDto<?>> blockUser(
            @RequestParam int userId) {
        userBlockService.blockUser(userId);
        return ResponseEntity.ok(ResponseDto.success("사용자를 차단했습니다."));
    }

    @DeleteMapping("/userBlock")
    public ResponseEntity<ResponseDto<?>> unblockUser(
            @RequestParam int userId) {
        userBlockService.unblockUser(userId);
        return ResponseEntity.ok(ResponseDto.success("사용자 차단을 해제했습니다."));
    }

    @GetMapping("/{userId}/blocks")
    public ResponseEntity<ResponseDto<List<Integer>>> getBlockedUsers(@PathVariable Integer userId) {
        List<Integer> blockedUserIds = userBlockService.getBlockedUserIds(userId);
        return ResponseEntity.ok(ResponseDto.success(blockedUserIds));
    }

    @GetMapping("/userBlock/status")
    public ResponseEntity<ResponseDto<Boolean>> checkBlockStatus(@RequestParam int userId) {
        boolean blocked = userBlockService.isBlocked(userId);
        return ResponseEntity.ok(ResponseDto.success(blocked));
    }

    @DeleteMapping("{userId}")
    public ResponseEntity<ResponseDto<?>> deleteUser(@PathVariable Integer userId) {
        userService.deleteUser(userId);
        System.out.println(userId);
        return ResponseEntity.ok(ResponseDto.success("회원 탈퇴 완료"));
    }

}