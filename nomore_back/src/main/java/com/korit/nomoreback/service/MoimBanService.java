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

@Service
@RequiredArgsConstructor
public class MoimBanService {

    private final MoimBanMapper moimBanMapper;
    private final MoimMemberMapper moimMemberMapper;
    private final MoimRoleMapper moimRoleMapper;
    private final MoimMapper moimMapper;
    private final PrincipalUtil principalUtil;

    @Transactional(rollbackFor = Exception.class)
    public void banUser(Integer moimId, Integer targetUserId) {
        Integer currentUserId = principalUtil.getPrincipalUser().getUser().getUserId();

        MoimRoleDto operatorRole = moimRoleMapper.findRoleByUserAndMoimId(currentUserId, moimId);
        if (operatorRole == null || !"OWNER".equals(operatorRole.getMoimRole())) {
            throw new IllegalArgumentException("모임장만 강퇴할 수 있습니다.");
        }

        if (targetUserId.equals(currentUserId)) {
            throw new IllegalArgumentException("자기 자신을 강퇴할 수 없습니다.");
        }

        if (moimBanMapper.existsByMoimIdAndUserId(moimId, targetUserId)) {
            moimMemberMapper.updateStatus(moimId, targetUserId, "BANNED");
            moimRoleMapper.deleteByMoimIdAndUserId(moimId, targetUserId);
            return;
        }

        String prevStatus = moimMemberMapper.findStatus(moimId, targetUserId);
        if (!"JOINED".equalsIgnoreCase(prevStatus)) {
            throw new IllegalArgumentException("해당 유저는 활성 멤버가 아닙니다.");
        }

        moimMemberMapper.updateStatus(moimId, targetUserId, "BANNED");

        moimRoleMapper.deleteByMoimIdAndUserId(moimId, targetUserId);

        MoimBan moimBan = MoimBan.builder()
                .moimId(moimId)
                .userId(targetUserId)
                .build();
        moimBanMapper.insertBan(moimBan);

        if ("JOINED".equalsIgnoreCase(prevStatus)) {
            moimMapper.decreaseMoimCount(moimId);
        }
    }
}