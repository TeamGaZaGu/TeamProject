package com.korit.nomoreback.controller;

import com.korit.nomoreback.dto.forum.ForumRegisterDto;
import com.korit.nomoreback.security.model.PrincipalUtil;
import com.korit.nomoreback.service.ForumService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/moims/{moimId}")
@RequiredArgsConstructor
public class ForumController {

    private final ForumService forumService;
    private final PrincipalUtil principalUtil;

    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> registerForum(@PathVariable Integer moimId ,
                                        @ModelAttribute ForumRegisterDto dto) {

        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

        dto.setMoimId(moimId);
        dto.setUserId(userId);

        forumService.registerForum(dto);
        
        return ResponseEntity.ok(null);
    }

}
