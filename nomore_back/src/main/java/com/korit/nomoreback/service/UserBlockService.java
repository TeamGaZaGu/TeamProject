package com.korit.nomoreback.service;

import com.korit.nomoreback.domain.user.UserBlock;
import com.korit.nomoreback.domain.user.UserBlockMapper;
import com.korit.nomoreback.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class UserBlockService {

    private final UserBlockMapper userBlockMapper;
    private final PrincipalUtil principalUtil;

    public Integer getCurrentUserId() {
        return principalUtil.getPrincipalUser().getUser().getUserId();
    }

    @Transactional(rollbackFor = Exception.class)
    public void blockUser(int blockedId) {
        Integer blockerId = getCurrentUserId();

        UserBlock existingBlock = userBlockMapper.findByBlockerIdAndBlockedId(blockerId, blockedId);
        if (existingBlock != null) {
            throw new IllegalStateException("이미 차단된 사용자입니다.");
        }

        if (blockerId.equals(blockedId)) {
            throw new IllegalArgumentException("자기 자신을 차단할 수 없습니다.");
        }

        UserBlock userBlock = UserBlock.builder()
                .blockerId(blockerId)
                .blockedId(blockedId)
                .build();

        userBlockMapper.insert(userBlock);
    }

    @Transactional(rollbackFor = Exception.class)
    public void unblockUser(int blockedId) {
        int blockerId = getCurrentUserId();

        UserBlock existingBlock = userBlockMapper.findByBlockerIdAndBlockedId(blockerId, blockedId);
        if (existingBlock == null) {
            throw new IllegalStateException("차단되지 않은 사용자입니다.");
        }

        userBlockMapper.delete(blockerId, blockedId);
    }

    public boolean isBlocked(int targetUserId) {
        int currentUserId = getCurrentUserId();
        return userBlockMapper.findByBlockerIdAndBlockedId(currentUserId, targetUserId) != null;
    }

    public List<Integer> getBlockedUserIds(Integer userId) {
        return userBlockMapper.findBlockedUserIdsByBlockerId(userId);
    }

}
