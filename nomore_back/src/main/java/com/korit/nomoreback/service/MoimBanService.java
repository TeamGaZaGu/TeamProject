package com.korit.nomoreback.service;

import com.korit.nomoreback.domain.moim.MoimBan;
import com.korit.nomoreback.domain.moim.MoimBanMapper;
import com.korit.nomoreback.domain.moim.MoimMapper;
import com.korit.nomoreback.domain.moim.MoimMemberMapper;
import com.korit.nomoreback.domain.moimRole.MoimRoleMapper;
import com.korit.nomoreback.dto.moim.MoimRoleDto;
import com.korit.nomoreback.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MoimBanService {

    private final MoimBanMapper moimBanMapper;
    private final MoimRoleMapper moimRoleMapper;
    private final MoimMapper moimMapper;

    @Transactional(rollbackFor = Exception.class)
    public void banUser(Integer moimId, Integer userId) {
        moimRoleMapper.deleteByMoimIdAndUserId(moimId, userId);
        MoimBan moimBan = MoimBan.builder()
                .moimId(moimId)
                .userId(userId)
                .build();
        moimBanMapper.insertBan(moimBan);
        moimMapper.updateMoimCount(moimId);
    }

    public List<MoimBan> banUserList(Integer moimId) {
        return moimBanMapper.selectBanUser(moimId);
    }
}