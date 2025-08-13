package com.korit.nomoreback.controller;

import com.korit.nomoreback.domain.forum.Forum;
import com.korit.nomoreback.dto.forum.ForumCommentRegDto;
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
        return ResponseEntity.ok("게시글작성");
    }

    @PostMapping(value = "/forum/{forumId}/comment", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> registerComment(@PathVariable Integer moimId,
                                             @PathVariable Integer forumId,
                                             @ModelAttribute ForumCommentRegDto dto) {
        dto.setMoimId(moimId);
        dto.setForumId(forumId);
        forumService.registerComment(dto);
        return ResponseEntity.ok("댓글달기");
    }

    @GetMapping("/{forumId}  ")
    public ResponseEntity<?> getForum(@PathVariable Integer moimId, @PathVariable Integer forumId) {
        Forum forum = forumService.getForumById(forumId);
        return ResponseEntity.ok(forum);
    }

    @PostMapping("/{forumId}/like")
    public ResponseEntity<?> like(@PathVariable Integer moimId,
                                  @PathVariable Integer forumId) {
        forumService.like(forumId);
        return ResponseEntity.ok("좋아요");
    }
    @DeleteMapping("/{forumId}/dislike")
    public ResponseEntity<?> dislike(@PathVariable Integer moimId,
                                     @PathVariable Integer forumId) {
        forumService.dislike(forumId);
        return ResponseEntity.ok("좋아요 삭제 요청 완료");
    }

}
