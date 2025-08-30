package com.korit.nomoreback.service;

import com.korit.nomoreback.domain.user.User;
import com.korit.nomoreback.domain.user.UserMapper;
import com.korit.nomoreback.dto.user.UserProfileUpdateReqDto;
import com.korit.nomoreback.security.model.PrincipalUtil;
import com.korit.nomoreback.util.ImageUrlUtil;
import com.korit.nomoreback.domain.moimRole.MoimRoleMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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

        fileService.deleteFile(userImg);

        User userEntity = dto.toUser();
        if (dto.getProfileImgPath() != null) {
            String userImg = user.getProfileImgPath();
            fileService.deleteFile(userImg);
            String profileImgPath = fileService.uploadFile(dto.getProfileImgPath(), "profile");
            userEntity.setProfileImgPath(profileImgPath);
        }

        userEntity.setUserId(user.getUserId());
        userMapper.updateProfile(userEntity);
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteUser(Integer userId) {
        moimRoleMapper.deleteAllByUserId(userId);

        userMapper.deleteUser(userId);
    }
}
