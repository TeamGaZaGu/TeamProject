package com.korit.nomoreback.service;

import com.korit.nomoreback.domain.moim.Moim;
import com.korit.nomoreback.domain.moim.MoimMapper;
import com.korit.nomoreback.domain.moimRole.MoimRoleMapper;
import com.korit.nomoreback.dto.moim.MoimCreateDto;
import com.korit.nomoreback.dto.moim.MoimModifyDto;
import com.korit.nomoreback.dto.moim.MoimRoleDto;
import com.korit.nomoreback.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MoimService {

    private final MoimMapper moimMapper;
    private final MoimRoleMapper moimRoleMapper;
    private final PrincipalUtil principalUtil;
    private final FileService fileService;

    public void createMoim(MoimCreateDto dto) {

        Moim moimEntity = dto.toEntity();

        final String UPLOAD_PATH = "/profile";
        String profileImgPath = UPLOAD_PATH + "/" + fileService.uploadFile(dto.getMoimImg(), UPLOAD_PATH);
        moimEntity.setMoimImgPath(profileImgPath);

        moimMapper.createMoim(moimEntity);

        MoimRoleDto roleDto = new MoimRoleDto();
        roleDto.setMoimRole("OWNER");
        roleDto.setMoimId(moimEntity.getMoimId());
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

    public void modifyMoim(MoimModifyDto modifyDto) {
        Moim originMoim = moimMapper.findByMoimId(modifyDto.getMoimId());
        Moim moim = modifyDto.modify(originMoim);
        moimMapper.updateMoim(moim);
    }

    public void deleteMoimById(Integer moimId, Integer userId) {

        MoimRoleDto roleDto = moimRoleMapper.findRoleByUserAndMoimId(userId, moimId);

        String role = roleDto.getMoimRole();

        if (roleDto == null || !"OWNER".equals(role)){
            throw new IllegalArgumentException("권한 없는 사용자");
        }

        moimMapper.deleteMoimById(moimId);
    }

    public List<Moim> findAll() {
        return moimMapper.findAll();
    }

    public List<Moim> findMoimByCategoryIdInUserId() {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

        if (userId == null) {
            throw new IllegalArgumentException("로그인 필요");
        }

        return moimMapper.findMoimByUserId(userId);
    }

    public List<Moim> findMoimByCategoryId(Integer categoryId) {

        if (categoryId == 1){
            return moimMapper.findAll();
        }else {
            return moimMapper.findMoimByCategoryId(categoryId);
        }
    }


}
