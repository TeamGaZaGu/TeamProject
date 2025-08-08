package com.korit.nomoreback.service;

import com.korit.nomoreback.domain.forum.Forum;
import com.korit.nomoreback.domain.forum.ForumMapper;
import com.korit.nomoreback.domain.postRole.PostRoleMapper;
import com.korit.nomoreback.dto.forum.ForumRegisterDto;
import com.korit.nomoreback.dto.forum.ForumRoleDto;
import com.korit.nomoreback.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ForumService {

    private final ForumMapper postMapper;
    private final PrincipalUtil principalUtil;
    private final FileService fileService;
    private final PostRoleMapper postRoleMapper;



    public void registerForum(ForumRegisterDto dto) {

        Forum forum = dto.toEntity();

        final String UPLOAD_PATH = "/forum";
        String postImgPath = UPLOAD_PATH + "/" + fileService.uploadFile(dto.getForumImgPath(), UPLOAD_PATH);
        forum.setForumImgPath(postImgPath);

        postMapper.registerForum(forum);

        ForumRoleDto roleDto = new ForumRoleDto();

        roleDto.setForumRoleName("OWNER");
        roleDto.setPostId(dto.getForumId());
        postRoleMapper.insertPostRole(roleDto);

    }

}
