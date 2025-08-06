package com.korit.nomoreback.service;

import com.korit.nomoreback.domain.moim.Moim;
import com.korit.nomoreback.domain.moim.MoimMapper;
import com.korit.nomoreback.domain.moimRole.MoimRoleMapper;
import com.korit.nomoreback.dto.moim.MoimCreateDto;
import com.korit.nomoreback.dto.moim.MoimRoleDto;
import com.korit.nomoreback.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MoimService {

    private final MoimMapper moimMapper;
    private final MoimRoleMapper moimRoleMapper;
    private final PrincipalUtil principalUtil;

    private Moim toEntity(MoimCreateDto dto) {

        Moim moim = dto.toEntity();
        moim.setUserId(principalUtil.getPrincipalUser().getUser().getUserId());
        return moim;

    }


    public void createMoim(MoimCreateDto dto, Integer userId) {

        Moim createMoim = toEntity(dto);

        moimMapper.createMoim(createMoim);
        MoimRoleDto roleDto = new MoimRoleDto();
        roleDto.setMoimRole("OWNER");
        roleDto.setMoimId(createMoim.getMoimId());
        moimRoleMapper.insertMoimRole(roleDto);

    }


    public void joinMoim(Integer moimId, Integer userId) {

        Moim moim = moimMapper.findByMoimId(moimId);
        if (moim == null){
            throw new IllegalArgumentException("존재하지 않는 모임");
        }

        if (moim.getMemberCount() >= moim.getMaxMember()) {
            throw new IllegalArgumentException("모임 정원이 가득 찼습니다.");
        }

        boolean moimOk = moimRoleMapper.isMoimIdAndUserId(moimId, userId);
        if (moimOk) {
            throw new IllegalArgumentException("이미 가입 된 모임");
        }

        MoimRoleDto roleDto = new MoimRoleDto();
        roleDto.setMoimRole("MEMBER");
        roleDto.setMoimId(moimId);
        roleDto.setUserId(userId);
        moimRoleMapper.insertMoimRole(roleDto);

        moimMapper.increaseMoimCount(moimId);

    }

    public List<Moim> findAll() {
        return moimMapper.findAll();
    }

}
