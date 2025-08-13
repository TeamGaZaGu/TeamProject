package com.korit.nomoreback.service;

import com.korit.nomoreback.domain.forum.*;
import com.korit.nomoreback.domain.postRole.PostRoleMapper;
import com.korit.nomoreback.dto.forum.ForumCommentRegDto;
import com.korit.nomoreback.dto.forum.ForumRegisterDto;
import com.korit.nomoreback.dto.forum.ForumRoleDto;
import com.korit.nomoreback.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ForumService {

    private final ForumMapper forumMapper;
    private final PrincipalUtil principalUtil;
    private final FileService fileService;
    private final PostRoleMapper postRoleMapper;
    private final ForumCommentMapper forumCommentMapper;
    private final ForumRoleMapper forumRoleMapper;
    private final ForumLikeMapper forumLikeMapper;
    private final ForumImgMapper forumImgMapper;


    public void registerForum(ForumRegisterDto dto) {

        Forum forum = dto.toEntity();

        forumMapper.registerForum(forum);

        final String UPLOAD_PATH = "/forum";
        List<MultipartFile> imageFiles = dto.getForumImages();  // DTO에서 여러 MultipartFile 받는 필드로 변경 필요

        if (imageFiles != null && !imageFiles.isEmpty()) {
            List<ForumImg> forumImgs = new ArrayList<>();
            int seq = 1;

            for (MultipartFile file : imageFiles) {
                String storedPath = UPLOAD_PATH + "/" + fileService.uploadFile(file, UPLOAD_PATH);

                ForumImg forumImg = ForumImg.builder()
                        .forumId(forum.getForumId())
                        .seq(seq++)
                        .path(storedPath)
                        .build();

                forumImgs.add(forumImg);
            }

            forumImgMapper.insertMany(forumImgs);
        }

        // 3) 역할 등록
        Integer userId = dto.getUserId();

        ForumRoleDto roleDto = new ForumRoleDto();
        roleDto.setForumRoleName("OWNER");
        roleDto.setForumId(forum.getForumId());
        roleDto.setUserId(userId);

        forumRoleMapper.insertForumRole(roleDto);
    }

    public Forum getForumById(Integer forumId) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        return forumMapper.findByForumId(forumId, userId);
    }

    public Integer registerComment(ForumCommentRegDto dto) {

        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

        forumCommentMapper.insert(dto.toEntity(userId));

        return forumCommentMapper.getCountByForumId(dto.getForumId());
    }

    public void like(Integer forumId) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        forumLikeMapper.insertLike(forumId, userId);
    }

    public void dislike(Integer forumId) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        forumLikeMapper.deleteLike(forumId, userId);
    }




}
