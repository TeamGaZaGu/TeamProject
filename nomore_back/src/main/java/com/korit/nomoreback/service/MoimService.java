package com.korit.nomoreback.service;

import com.korit.nomoreback.domain.moim.Moim;
import com.korit.nomoreback.domain.moim.MoimMapper;
import com.korit.nomoreback.dto.moim.MoimCreateDto;
import com.korit.nomoreback.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MoimService {

    private final MoimMapper moimMapper;
    private final PrincipalUtil principalUtil;

    public void createMoim(MoimCreateDto dto, Integer userId) {

        Moim moim = dto.toEntity();

        moim.setUserId(principalUtil.getPrincipalUser().getUser().getUserId());

        moimMapper.createMoim(moim);

    }
}
