package com.korit.nomoreback.controller;

import com.korit.nomoreback.domain.forum.Forum;
import com.korit.nomoreback.domain.moim.Moim;
import com.korit.nomoreback.domain.user.User;
import com.korit.nomoreback.domain.user.UserMapper;
import com.korit.nomoreback.dto.response.ResponseDto;
import com.korit.nomoreback.dto.user.UserProfileUpdateReqDto;
import com.korit.nomoreback.security.model.PrincipalUser;
import com.korit.nomoreback.security.model.PrincipalUtil;
import com.korit.nomoreback.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
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
    private final PrincipalUtil principalUtil;
    private final MoimService moimService;
    private final ForumService forumService;
    private final BlobService blobService;

    @GetMapping("/admin")
    public ResponseEntity<List<User>> allUser() {
        return ResponseEntity.ok(userService.allUser());
    }

    @PutMapping("/banUser")
    public ResponseEntity<?> blockUser(@RequestParam Integer userId) {
        userService.blockUser(userId);
        return ResponseEntity.ok("회원 사이트 차단 완료");
    }

    @PutMapping("/liftBanUser")
    public ResponseEntity<?> unBlockUser(@RequestParam Integer userId) {
        userService.unBlockUser(userId);
        return ResponseEntity.ok("회원 사이트 차단해제 완료");
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@ModelAttribute UserProfileUpdateReqDto dto) {
        userService.updateProfile(dto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/blob")
    public ResponseEntity<byte[]> getImg(@RequestParam String url, @RequestParam String imageConfigsName) {
        byte[] data = blobService.getBlob(url, imageConfigsName);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        headers.setContentDisposition(ContentDisposition.inline().filename("image.jpg").build());
        headers.setContentLength(data.length);

        return ResponseEntity.ok().headers(headers).body(data);
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

    @GetMapping("/admin/user/{userId}/moims")
    public ResponseEntity<?> getUserMoims(@PathVariable Integer userId) {
        String currentUserRole = principalUtil.getPrincipalUser().getUser().getUserRole();
        if (!"ROLE_ADMIN".equals(currentUserRole)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("접근 권한이 없습니다");
        }

        List<Moim> userMoims = moimService.findMoimsByUserId(userId);
        return ResponseEntity.ok(userMoims);
    }

    @GetMapping("/admin/user/{userId}/posts")
    public ResponseEntity<?> getUserPosts(@PathVariable Integer userId) {
        Integer currentUserId = principalUtil.getPrincipalUser().getUser().getUserId();
        String currentUserRole = principalUtil.getPrincipalUser().getUser().getUserRole();

        if (!"ROLE_ADMIN".equals(currentUserRole) && !currentUserId.equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("접근 권한이 없습니다");
        }

        List<Forum> userPosts = forumService.findPostsByUserId(userId);
        return ResponseEntity.ok(userPosts);
    }
}