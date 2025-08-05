package com.korit.nomoreback.controller;

import com.korit.nomoreback.dto.moim.MoimCreateDto;
import com.korit.nomoreback.security.model.PrincipalUtil;
import com.korit.nomoreback.service.MoimService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MoimController {

    private final MoimService moimService;
    private final PrincipalUtil principalUtil;

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody MoimCreateDto dto) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

        moimService.createMoim(dto,userId);

        return ResponseEntity.ok("신규 생성 완");
    }

}
