package com.korit.nomoreback.service;

import com.korit.nomoreback.domain.post.Post;
import com.korit.nomoreback.domain.post.PostMapper;
import com.korit.nomoreback.domain.postRole.PostRoleMapper;
import com.korit.nomoreback.dto.moim.MoimRoleDto;
import com.korit.nomoreback.dto.post.PostRegisterDto;
import com.korit.nomoreback.dto.post.PostRoleDto;
import com.korit.nomoreback.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostMapper postMapper;
    private final PrincipalUtil principalUtil;
    private final FileService fileService;
    private final PostRoleMapper postRoleMapper;



    public void registerPost(PostRegisterDto dto) {

        Post post = dto.toEntity();



        final String UPLOAD_PATH = "/post";
        String postImgPath = UPLOAD_PATH + "/" + fileService.uploadFile(dto.getPostImgPath(), UPLOAD_PATH);
        post.setPostImgPath(postImgPath);

        postMapper.registerForum(post);

        PostRoleDto roleDto = new PostRoleDto();

        roleDto.setPostRoleName("OWNER");
        roleDto.setPostId(dto.getPostId());
        postRoleMapper.insertPostRole(roleDto);

    }

}
