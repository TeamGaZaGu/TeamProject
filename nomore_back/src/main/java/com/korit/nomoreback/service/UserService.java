package com.korit.nomoreback.service;

import com.korit.nomoreback.domain.user.User;
import com.korit.nomoreback.domain.user.UserMapper;
import com.korit.nomoreback.dto.user.UserProfileUpdateReqDto;
import com.korit.nomoreback.security.model.PrincipalUtil;
import com.korit.nomoreback.util.ImageUrlUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;
    private final ImageUrlUtil imageUrlUtil;
    private final PrincipalUtil principalUtil;
    private final FileService fileService;

    public List<User> allUser() {
        List<User> userList = userMapper.allUser().stream().map(user -> user.buildImageUrl(imageUrlUtil)).collect(Collectors.toList());
        return userList;
    }

    public void blockUser(Integer userId) {
        Integer userSiteBlock = 1;
        userMapper.blockUser(userId, userSiteBlock);
    }

    public void unBlockUser(Integer userId) {
        Integer userSiteBlock = 0;
        userMapper.unBlockUser(userId, userSiteBlock);
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateProfile(UserProfileUpdateReqDto dto) {
        System.out.println("dto.getProfileImgPath() " + dto.getProfileImgPath());
        User user = principalUtil.getPrincipalUser().getUser();
        String userImg = user.getProfileImgPath();
        fileService.deleteFile(userImg);
        User userEntity = dto.toUser();
        if (dto.getProfileImgPath() != null) {
            String profileImgPath = fileService.uploadFile(dto.getProfileImgPath(), "profile");
            System.out.println("profileImgPath" + profileImgPath);
            userEntity.setProfileImgPath(profileImgPath);
        } else {
            userEntity.setProfileImgPath("default.jpg");
        }
        userEntity.setUserId(user.getUserId());
        userMapper.updateProfile(userEntity);
        System.out.println(userEntity);
    }

    public void deleteUser(Integer userId) {
        userMapper.deleteUser(userId);
    }

    public User findUserById(Integer userId) {
        return userMapper.findUserById(userId);
    }

    public User getUserDetail(Integer userId) {
        User user = userMapper.findByUserId(userId);
        if (user == null) {
            throw new RuntimeException("사용자를 찾을 수 없습니다.");
        }
        return user;
    }
}
