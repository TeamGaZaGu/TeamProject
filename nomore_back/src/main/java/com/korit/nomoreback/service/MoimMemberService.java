package com.korit.nomoreback.service;

import com.korit.nomoreback.domain.moim.MoimMemberMapper;
import com.korit.nomoreback.dto.moim.MoimMemberUserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MoimMemberService {

    private final MoimMemberMapper moimMemberMapper;

    public List<MoimMemberUserDto> getVisibleMembers(int moimId, int viewerId) {
        return moimMemberMapper.findVisibleMembers(moimId, viewerId);
    }
}