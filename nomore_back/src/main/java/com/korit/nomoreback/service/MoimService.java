package com.korit.nomoreback.service;

import com.korit.nomoreback.domain.moim.Moim;
import com.korit.nomoreback.domain.moim.MoimMapper;
import com.korit.nomoreback.domain.moimRole.MoimRoleMapper;
import com.korit.nomoreback.domain.user.User;
import com.korit.nomoreback.dto.moim.*;
import com.korit.nomoreback.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MoimService {

    private final MoimMapper moimMapper;
    private final MoimRoleMapper moimRoleMapper;
    private final PrincipalUtil principalUtil;
    private final FileService fileService;

    public MoimCategoryRespDto categoryMoim(MoimCategoryReqDto dto) {
        Integer totalElements = moimMapper.getCountOfOptions(dto.toOption());
        Integer totalPages = (int) Math.ceil(totalElements.doubleValue() / dto.getSize().doubleValue());
        List<Moim> foundMoims = moimMapper.findAllOfOptions(dto.toOption());
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

        final String UPLOAD_PATH = "/moim";
        String moimImgPath = UPLOAD_PATH + "/" + fileService.uploadFile(dto.getMoimImg(), UPLOAD_PATH);
        moimEntity.setMoimImgPath(moimImgPath);

        moimMapper.createMoim(moimEntity);

        MoimRoleDto roleDto = new MoimRoleDto();
        roleDto.setMoimRole("OWNER");
        roleDto.setMoimId(moimEntity.getMoimId());
        roleDto.setUserId(moimEntity.getUserId());
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

    public Moim findMoim (Integer moimId) {
        return moimMapper.findByMoimId(moimId);
    }




    public void modifyMoim(MoimModifyDto modifyDto) {

        Moim originMoim = moimMapper.findByMoimId(modifyDto.getMoimId());
        final String UPLOAD_PATH = "/moim";

        MultipartFile newImgFile = modifyDto.getMoimImgPath();
        if (newImgFile != null && !newImgFile.isEmpty()) {
            if (originMoim.getMoimImgPath() != null) {
                fileService.deleteFile(originMoim.getMoimImgPath());
            }
            String savedFileName = UPLOAD_PATH + "/" + fileService.uploadFile(modifyDto.getMoimImgPath(), UPLOAD_PATH);
            originMoim.setMoimImgPath(savedFileName); // 저장된 파일명만 넣기
        }

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


    public List<Moim> findMoimByCategoryIdInUserId() {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

        if (userId == null) {
            throw new IllegalArgumentException("로그인 필요");
        }

        return moimMapper.findMoimByUserId(userId);
    }

//    public List<Moim> findMoimByCategoryId(Integer categoryId) {
//
//        if (categoryId == 1){
//            return moimMapper.findAll();
//        }else {
//            return moimMapper.findMoimByCategoryId(categoryId);
//        }
//    }

    public List<MoimListRespDto> searchMoim(MoimSearchReqDto searchReqDto) {
//        System.out.println("=== 검색 요청 ===");
//        System.out.println("districtId: " + searchReqDto.getDistrictId());
//        System.out.println("categoryId: " + searchReqDto.getCategoryId());
//        System.out.println("keyword: " + searchReqDto.getKeyword());

        List<MoimListRespDto> result = moimMapper.searchMoim(searchReqDto);
//        System.out.println("=== 검색 결과 ===");
//        System.out.println("결과 개수: " + result.size());
        result.forEach(moim -> System.out.println("모임: " + moim.getMoimTitle()));
        return result;
    }

    public List<User> moimUserList(Integer moimId) {
        return moimMapper.moimUserList(moimId);
    }
}