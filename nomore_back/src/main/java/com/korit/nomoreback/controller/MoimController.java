package com.korit.nomoreback.controller;

import com.korit.nomoreback.domain.moim.Moim;
import com.korit.nomoreback.domain.moim.MoimBan;
import com.korit.nomoreback.domain.moim.MoimMapper;
import com.korit.nomoreback.domain.user.User;
import com.korit.nomoreback.dto.moim.*;
import com.korit.nomoreback.dto.response.ResponseDto;
import com.korit.nomoreback.dto.moim.MoimCreateDto;
import com.korit.nomoreback.dto.moim.MoimListRespDto;
import com.korit.nomoreback.dto.moim.MoimModifyDto;
import com.korit.nomoreback.dto.moim.MoimSearchReqDto;
import com.korit.nomoreback.security.model.PrincipalUtil;
import com.korit.nomoreback.service.MoimBanService;
import com.korit.nomoreback.service.MoimService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/moims")
public class MoimController {

    private final MoimService moimService;
    private final PrincipalUtil principalUtil;
    private final MoimBanService moimBanService;
    private final MoimMapper moimMapper;

    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> create(@ModelAttribute MoimCreateDto dto) {
        moimService.createMoim(dto);
        return ResponseEntity.ok("신규 생성 완료");
    }

    @PostMapping("/{moimId}/join")
    public ResponseEntity<?> join(@PathVariable Integer moimId) {
        moimService.joinMoim(moimId);
        return ResponseEntity.ok("가입 완");
    }

    @DeleteMapping("/{moimId}/exit")
    public ResponseEntity<?> exit(@PathVariable Integer moimId) {
        moimService.exitMoim(moimId);
        return ResponseEntity.ok("탈퇴 완");
    }

    @GetMapping("/{moimId}")
    public ResponseEntity<?> selectMoim(@PathVariable Integer moimId) {
        moimMapper.updateMoimCount(moimId);
        Moim moim = moimService.findMoim(moimId);
        if (moim == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("모임을 찾을 수 없습니다");
        }
        return ResponseEntity.ok(moim);
    }

    @GetMapping("/search")
    public ResponseEntity<ResponseDto<?>> findMoims(MoimCategoryReqDto dto) {
        return ResponseEntity.ok(ResponseDto.success(moimService.findMoims(dto)));
    }

    @PatchMapping(value = "/{moimId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateMoim(@PathVariable Integer moimId, @ModelAttribute MoimModifyDto dto) {
        dto.setMoimId(moimId);
        moimService.modifyMoim(dto);
        return ResponseEntity.ok("수정 완");
    }

    @DeleteMapping("/{moimId}")
    public ResponseEntity<?> remove(@PathVariable Integer moimId) {
        moimService.deleteMoim(moimId);
        return ResponseEntity.ok("삭제 완");
    }

    @GetMapping("/{moimId}/users")
    public ResponseEntity<List<User>> moimUserList(@PathVariable Integer moimId) {
        return ResponseEntity.ok(moimService.moimUserList(moimId));
    }

    @PostMapping("/{moimId}/ban/{userId}")
    public ResponseEntity<ResponseDto<?>> banUser(
            @PathVariable Integer moimId,
            @PathVariable Integer userId) {
        moimBanService.banUser(moimId, userId);
        return ResponseEntity.ok(ResponseDto.success("사용자를 모임에서 강퇴했습니다."));
    }

    @GetMapping("/{moimId}/ban")
    public ResponseEntity<List<MoimBan>> banUserList(@PathVariable Integer moimId) {
        return ResponseEntity.ok(moimBanService.banUserList(moimId));
    }

    @GetMapping("/users/{userId}/moims")
    public ResponseEntity<List<Moim>> myMoimList(@PathVariable Integer userId) {
        return ResponseEntity.ok(moimService.myMoimList(userId));
    }

    @GetMapping("/ownership")
    public ResponseEntity<Map<String, Boolean>> checkUserHasOwnerMoims() {
        try {
            Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
            boolean hasOwnerMoims = moimService.hasOwnerMoims(userId);

            Map<String, Boolean> response = new HashMap<>();
            response.put("hasOwnerMoims", hasOwnerMoims);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Boolean> errorResponse = new HashMap<>();
            errorResponse.put("hasOwnerMoims", false);
            return ResponseEntity.ok(errorResponse);
        }
    }

    @PostMapping("/{moimId}/transfer-ownership")
    public ResponseEntity<?> transferOwnership(@PathVariable Integer moimId, @RequestBody Map<String, Object> requestBody) {
        try {
            Integer targetUserId = (Integer) requestBody.get("targetUserId");
            Integer currentUserId = principalUtil.getPrincipalUser().getUser().getUserId();

            moimService.transferOwnership(moimId, currentUserId, targetUserId);
            return ResponseEntity.ok("권한이 성공적으로 이양되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
