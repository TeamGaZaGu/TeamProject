package com.korit.nomoreback.controller;

import com.korit.nomoreback.domain.moim.Moim;
import com.korit.nomoreback.dto.moim.MoimCreateDto;
import com.korit.nomoreback.dto.moim.MoimModifyDto;
import com.korit.nomoreback.security.model.PrincipalUtil;
import com.korit.nomoreback.service.MoimService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/moim")
public class MoimController {

    private final MoimService moimService;
    private final PrincipalUtil principalUtil;

    @PostMapping("/register")
    public ResponseEntity<?> create(@RequestBody MoimCreateDto dto) {

        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

        moimService.createMoim(dto, userId);

        return ResponseEntity.ok("신규 생성 완");
    }

    @PostMapping("/{moimId}/join")
    public ResponseEntity<?> join(@PathVariable Integer moimId) {

        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

        moimService.joinMoim(moimId, userId);

        return ResponseEntity.ok("가입 완");
    }

    @GetMapping("/find")
    public List<Moim> findAllMoims() {
        return moimService.findAll();
    }

    @PatchMapping("/{moimId}")
    public ResponseEntity<?> updateMoim(@PathVariable Integer moimId, @RequestBody MoimModifyDto dto) {
        dto.setMoimId(moimId);
        moimService.modifyMoim(dto);
        return ResponseEntity.ok("수정 완");
    }

    @DeleteMapping("/{moimId}")
    public ResponseEntity<?> remove(@PathVariable Integer moimId) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

        moimService.deleteMoimById(moimId, userId);

        return ResponseEntity.ok("삭제 완");
    }
}
