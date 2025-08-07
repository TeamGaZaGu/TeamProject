package com.korit.nomoreback.controller;

import com.korit.nomoreback.dto.post.PostRegisterDto;
import com.korit.nomoreback.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/moims/{moimId}")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> registerForum(@ModelAttribute PostRegisterDto dto) {

        postService.registerPost(dto);
        
        return ResponseEntity.ok(null);
    }

}
