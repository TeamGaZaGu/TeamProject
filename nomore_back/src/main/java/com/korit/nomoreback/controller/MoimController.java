package com.korit.nomoreback.controller;

import com.korit.nomoreback.domain.moim.Moim;
import com.korit.nomoreback.dto.moim.MoimCreateDto;
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

    @PostMapping("/join/{moimId}")
    public ResponseEntity<?> join(@PathVariable Integer moimId) {

        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

        moimService.joinMoim(moimId, userId);

        return ResponseEntity.ok("가입 완");
    }

    @GetMapping("/find")
    public List<Moim> findAllMoims() {
        return moimService.findAll();
    }

    // categoryId 기준, districtId 기준, postMapping 시 권한 부여?
    /*
        예를 들어,

        POST /api/moim/create → 모임 생성 (로그인한 사용자만 가능)

        POST /api/moim/{id}/join → 모임 참여 신청 (로그인한 사용자)

        PATCH /api/moim/{id} → 모임 수정 (모임 생성자만 가능)

        DELETE /api/moim/{id} → 모임 삭제 (모임 생성자만 가능)

        이런 식으로 권한을 다르게 둬서 역할에 따라 할 수 있는 행동을 제한합니다.
     */

}
