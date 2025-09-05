package com.korit.nomoreback.service;

import com.korit.nomoreback.domain.user.User;
import com.korit.nomoreback.domain.user.UserMapper;
import com.korit.nomoreback.dto.user.UserProfileUpdateReqDto;
import com.korit.nomoreback.security.model.PrincipalUtil;
import com.korit.nomoreback.util.ImageUrlUtil;
import com.korit.nomoreback.domain.moimRole.MoimRoleMapper;
// 추가 필요한 Mapper들
import com.korit.nomoreback.domain.forum.ForumMapper;
import com.korit.nomoreback.domain.forum.ForumCommentMapper;
import com.korit.nomoreback.domain.forum.ForumLikeMapper;
import com.korit.nomoreback.domain.forum.ForumImgMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;
    private final ImageUrlUtil imageUrlUtil;
    private final PrincipalUtil principalUtil;
    private final FileService fileService;


    // 추가: 유저-모임 역할/참여 테이블 처리용
    private final MoimRoleMapper moimRoleMapper;

    private final ForumMapper forumMapper;
    private final ForumCommentMapper forumCommentMapper;
    private final ForumLikeMapper forumLikeMapper;
    private final ForumImgMapper forumImgMapper;

    public List<User> allUser() {
        List<User> userList = userMapper.allUser()
                .stream()
                .map(user -> user.buildImageUrl(imageUrlUtil))
                .collect(Collectors.toList());
        return userList;
    }

    public void blockUser(Integer userId) {
        userMapper.blockUser(userId);
    }

    public void unBlockUser(Integer userId) {
        userMapper.unBlockUser(userId);
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateProfile(UserProfileUpdateReqDto dto) {
        User user = principalUtil.getPrincipalUser().getUser();
        String userImg = user.getProfileImgPath();
        System.out.println("userImg " + userImg);
        User userEntity = dto.toUser();
        if (dto.getProfileImgPath() != null) {
            fileService.deleteFile(userImg, "profile");
            String profileImgPath = fileService.uploadFile(dto.getProfileImgPath(), "profile");
            userEntity.setProfileImgPath(profileImgPath);
        }
        userEntity.setUserId(user.getUserId());
        userMapper.updateProfile(userEntity);
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteUser(Integer userId) {
        try {
            System.out.println("=== 회원 탈퇴 시작: userId = " + userId);

            // 1. 사용자 관련 이미지 파일 경로들 수집
            System.out.println("1. 이미지 경로 수집 중...");
            List<String> userImagePaths = collectUserImagePaths(userId);
            System.out.println("수집된 이미지 경로: " + userImagePaths.size() + "개");

            // 2. 데이터베이스에서 관련 데이터 삭제 (순서 중요!)
            System.out.println("2. 관련 데이터 삭제 중...");
            deleteUserRelatedData(userId);

            // 3. 실제 이미지 파일들 삭제
            System.out.println("3. 이미지 파일 삭제 중...");
            deleteImageFiles(userImagePaths);

            // 4. 마지막으로 사용자 삭제
            System.out.println("4. 사용자 삭제 중...");
            userMapper.deleteUser(userId);

            System.out.println("=== 회원 탈퇴 완료");
        } catch (Exception e) {
            System.err.println("회원 탈퇴 실패: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }

    }

    private List<String> collectUserImagePaths(Integer userId) {
        List<String> imagePaths = new ArrayList<>();

        // 사용자 프로필 이미지
        String profilePath = userMapper.findProfileImgPathByUserId(userId);
        if (profilePath != null && !profilePath.isEmpty()) {
            imagePaths.add(profilePath);
        }

        // 포럼 게시글 이미지들
        List<String> forumImages = forumImgMapper.findAllPathsByUserId(userId);
        imagePaths.addAll(forumImages);

        return imagePaths;
    }

    private void deleteUserRelatedData(Integer userId) {
        forumLikeMapper.deleteByUserId(userId);

        forumCommentMapper.deleteByUserId(userId);

        forumImgMapper.deleteByUserId(userId);

        forumMapper.deleteByUserId(userId);

        moimRoleMapper.deleteAllByUserId(userId);

    }

    private void deleteImageFiles(List<String> imagePaths) {
        for (String imagePath : imagePaths) {
            if (imagePath != null && !imagePath.isEmpty()) {
                try {
//                    fileService.deleteFile(imagePath);
                } catch (Exception e) {
                    System.err.println("이미지 파일 삭제 실패: " + imagePath + ", 오류: " + e.getMessage());
                }
            }
        }
    }
}