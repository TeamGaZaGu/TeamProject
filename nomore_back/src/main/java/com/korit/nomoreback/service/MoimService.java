package com.korit.nomoreback.service;

import com.korit.nomoreback.domain.moim.Moim;
import com.korit.nomoreback.domain.moim.MoimMapper;
import com.korit.nomoreback.domain.moimRole.MoimRoleMapper;
import com.korit.nomoreback.domain.user.User;
import com.korit.nomoreback.dto.moim.*;
import com.korit.nomoreback.security.model.PrincipalUtil;
import com.korit.nomoreback.util.ImageUrlUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MoimService {

    private final MoimMapper moimMapper;
    private final MoimRoleMapper moimRoleMapper;
    private final PrincipalUtil principalUtil;
    private final FileService fileService;
    private final ImageUrlUtil imageUrlUtil;

    public User getCurrentUser() {
        return principalUtil.getPrincipalUser().getUser();
    }

    public MoimCategoryRespDto findMoims(MoimCategoryReqDto dto) {
        Integer totalElements = moimMapper.getCountOfOptions(dto.toOption());
        Integer totalPages = (int) Math.ceil(totalElements.doubleValue() / dto.getSize().doubleValue());
        List<Moim> foundMoims =
                moimMapper.findAllOfOptions(dto.toOption()).stream().map(moim -> moim.buildImageUrl(imageUrlUtil)).collect(Collectors.toList());
        boolean isLast = foundMoims.size() < dto.getSize();

        return MoimCategoryRespDto.builder()
                .contents(foundMoims)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .page(dto.getPage())
                .size(dto.getSize())
                .isLast(isLast)
                .build();
    }

    public void createMoim(MoimCreateDto dto) {
        Moim moimEntity = dto.toEntity();

        String moimImgPath = fileService.uploadFile(dto.getMoimImg(), "moim");
        moimEntity.setMoimImgPath(moimImgPath);

        Integer userId = getCurrentUser().getUserId();

        moimEntity.setUserId(userId);

        moimMapper.createMoim(moimEntity);

        MoimRoleDto roleDto = new MoimRoleDto();
        roleDto.setMoimRole("OWNER");
        roleDto.setMoimId(moimEntity.getMoimId());
        roleDto.setUserId(moimEntity.getUserId());
        moimRoleMapper.insertMoimRole(roleDto);
    }


    public void joinMoim(Integer moimId) {

        Integer userId = getCurrentUser().getUserId();

        Moim moim = moimMapper.findMoimId(moimId);
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

        moimMapper.updateMoimCount(moimId);
    }

    public void exitMoim(Integer moimId) {

        Integer userId = getCurrentUser().getUserId();

        MoimRoleDto isOwner = moimRoleMapper.findMoimRole(userId,moimId);

        if ("OWNER".equals(isOwner.getMoimRole())){
            return;
        }

        moimMapper.updateMoimCount(moimId);
        moimRoleMapper.exitMoim(moimId, userId);
    }

    public Moim findMoim (Integer moimId) {
        moimMapper.updateMoimCount(moimId);
        Moim findMoim = moimMapper.findMoimId(moimId).buildImageUrl(imageUrlUtil);
        return findMoim;
    }

    @Transactional(rollbackFor = Exception.class)
    public void modifyMoim(MoimModifyDto modifyDto) {
        Integer userId = getCurrentUser().getUserId();
        MoimRoleDto roleDto = moimRoleMapper.findMoimRole(userId, modifyDto.getMoimId());
        String userRole = getCurrentUser().getUserRole();
        String role = roleDto.getMoimRole();
        Moim moim = modifyDto.toEntity();

        if (!"ROLE_ADMIN".equals(userRole) || !"OWNER".equals(role)) {
            Moim originMoim = moimMapper.findMoimId(modifyDto.getMoimId());
            MultipartFile newImgFile = modifyDto.getMoimImgPath();
            if (originMoim.getMemberCount() > modifyDto.getMaxMember()) {
                throw new IllegalArgumentException("모임 정원 초과.");
            }
            if (newImgFile != null && !newImgFile.isEmpty()) {
                fileService.deleteFile(originMoim.getMoimImgPath());
                String savedFileName = fileService.uploadFile(newImgFile, "moim");
                moim.setMoimImgPath(savedFileName);
            }
            moimMapper.updateMoim(moim);
        }
    }

    public void deleteMoim(Integer moimId) {
        Integer userId = getCurrentUser().getUserId();
        String userRole = getCurrentUser().getUserRole();
        MoimRoleDto roleDto = moimRoleMapper.findMoimRole(userId, moimId);

        if ("ROLE_ADMIN".equals(userRole)) {
            moimMapper.deleteMoimById(moimId);
        } else {
            if (roleDto == null) {
                return;
            }
            String role = roleDto.getMoimRole();
            if (!"OWNER".equals(role)){
                throw new IllegalArgumentException("권한 없는 사용자");
            }
            moimMapper.deleteMoimById(moimId);
        }
    }

    public List<MoimListRespDto> searchMoim(MoimSearchReqDto searchReqDto) {
        return moimMapper.searchMoim(searchReqDto);
    }

    public List<User> moimUserList(Integer moimId) {
        List<User> userList = moimMapper.moimUserList(moimId).stream().map(user -> user.buildImageUrl(imageUrlUtil)).collect(Collectors.toList());
        return userList;
    }

    public List<Moim> myMoimList(Integer userId) {
        List<Moim> foundMoims = moimMapper.myMoimList(userId).stream().map(moim -> moim.buildImageUrl(imageUrlUtil)).collect(Collectors.toList());
        return foundMoims;
    }

    public List<Moim> findMoimsByUserId(Integer userId) {
        List<Moim> moims = moimMapper.findMoimsByUserId(userId);
        return moims.stream()
                .map(moim -> moim.buildImageUrl(imageUrlUtil))
                .collect(Collectors.toList());
    }

    public boolean hasOwnerMoims(Integer userId) {
        return moimRoleMapper.hasOwnerMoims(userId);
    }
}