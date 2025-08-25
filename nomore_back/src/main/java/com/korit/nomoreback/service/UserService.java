package com.korit.nomoreback.service;

import com.korit.nomoreback.domain.user.User;
import com.korit.nomoreback.domain.user.UserMapper;
import com.korit.nomoreback.dto.user.UserProfileUpdateReqDto;
import com.korit.nomoreback.util.ImageUrlUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
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

    public void updateProfile(Integer userId, UserProfileUpdateReqDto reqDto, MultipartFile profileImg) {
        String profileImgPath = null;

        if (profileImg != null && !profileImg.isEmpty()) {
            String projectRoot = System.getProperty("user.dir");
            String uploadDir = projectRoot + File.separator + "upload" + File.separator + "profile";

            File uploadDirFile = new File(uploadDir);
            if (!uploadDirFile.exists()) {
                uploadDirFile.mkdirs();
            }

            String originalFileName = profileImg.getOriginalFilename();
            String newFileName = UUID.randomUUID() + "_" + originalFileName;
            File saveFile = new File(uploadDirFile, newFileName);

            try {
                profileImg.transferTo(saveFile);
                profileImgPath = "/profile/" + newFileName;
            } catch (Exception e) {
                throw new RuntimeException("프로필 이미지 저장 실패", e);
            }
        } else {
            profileImgPath = userMapper.findProfileImgPathByUserId(userId);
        }

        reqDto.setProfileImgPath(profileImgPath);
        reqDto.setUserId(userId);
        userMapper.updateProfile(reqDto);
    }

    public void deleteUser(Integer userId) {
        userMapper.deleteUser(userId);
    }
}
