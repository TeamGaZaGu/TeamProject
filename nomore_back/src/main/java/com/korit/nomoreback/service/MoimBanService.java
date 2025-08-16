package com.korit.nomoreback.service;

import com.korit.nomoreback.domain.moim.MoimBan;
import com.korit.nomoreback.domain.moim.MoimBanMapper;
import com.korit.nomoreback.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MoimBanService {

    private final PrincipalUtil principalUtil;
    private final MoimBanMapper moimBanMapper;

    @Transactional(rollbackFor = Exception.class)
    public void banUser(Integer moimId, Integer userId, String reason) {
        Integer currentUserId = principalUtil.getPrincipalUser().getUser().getUserId();

        if (currentUserId.equals(userId)) {
            throw new IllegalArgumentException("자기 자신을 강퇴할 수 없습니다.");
        }

        MoimBan existingBan = moimBanMapper.findByMoimIdAndUserId(moimId, userId);
        if (existingBan != null) {
            throw new IllegalStateException("이미 강퇴된 사용자입니다.");
        }

        MoimBan moimBan = MoimBan.builder()
                .moimId(moimId)
                .userId(userId)
                .reason(reason)
                .build();

        moimBanMapper.insert(moimBan);
    }

    @Transactional(rollbackFor = Exception.class)
    public void unbanUser(Integer moimId, Integer userId) {
        Integer currentUserId = principalUtil.getPrincipalUser().getUser().getUserId();

        MoimBan existingBan = moimBanMapper.findByMoimIdAndUserId(moimId, userId);
        if (existingBan == null) {
            throw new IllegalStateException("강퇴되지 않은 사용자입니다.");
        }

        moimBanMapper.delete(moimId, userId);
    }

    public boolean isBanned(Integer moimId, Integer userId) {
        return moimBanMapper.findByMoimIdAndUserId(moimId, userId) != null;
    }

    public List<Integer> getBannedUserIds(Integer moimId) {
        return moimBanMapper.findBannedUserIdsByMoimId(moimId);
    }

    public List<MoimBan> getBannedUsers(Integer moimId) {
        return moimBanMapper.findBannedUsersByMoimId(moimId);
    }

    public List<Integer> getBannedMoimIds(Integer userId) {
        return moimBanMapper.findBannedMoimIdsByUserId(userId);
    }
}