package com.korit.nomoreback.controller;

import com.korit.nomoreback.domain.forum.Forum;
import com.korit.nomoreback.dto.forum.ForumCommentRegDto;
import com.korit.nomoreback.dto.forum.ForumImgModifyDto;
import com.korit.nomoreback.dto.forum.ForumModifyDto;
import com.korit.nomoreback.dto.forum.ForumRegisterDto;
import com.korit.nomoreback.security.model.PrincipalUtil;
import com.korit.nomoreback.service.ForumService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/moims")
@RequiredArgsConstructor
public class ForumController {

    private final ForumService forumService;
    private final PrincipalUtil principalUtil;

    @PostMapping(value = "/{moimId}/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> registerForum(@PathVariable Integer moimId ,
                                        @ModelAttribute ForumRegisterDto dto) {
        System.out.println(dto);
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        dto.setMoimId(moimId);
        dto.setUserId(userId);
        System.out.println("이미지 저장 리스트: " + dto);

        forumService.registerForum(dto);
        return ResponseEntity.ok("게시글작성");
    }

    @PostMapping(value = "/{moimId}/forum/{forumId}/comment", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> registerComment(@PathVariable Integer moimId,
                                             @PathVariable Integer forumId,
                                             @ModelAttribute ForumCommentRegDto dto) {
        dto.setMoimId(moimId);
        dto.setForumId(forumId);
        forumService.registerComment(dto);
        return ResponseEntity.ok("댓글달기");
    }

    @GetMapping("/{moimId}/{forumId}")
    public ResponseEntity<?> getForum(@PathVariable Integer moimId, @PathVariable Integer forumId) {
        Forum forum = forumService.getForumById(forumId);
        return ResponseEntity.ok(forum);
    }

    @PutMapping("/{moimId}/{forumId}/modify")
    public ResponseEntity<?> modifyForum(@PathVariable Integer moimId,
                                         @PathVariable Integer forumId,
                                         @ModelAttribute ForumImgModifyDto forumImgModifyDto,
                                         @ModelAttribute ForumModifyDto forumModifyDto) {
        forumModifyDto.setForumId(forumId);
        forumService.modifyForum(forumModifyDto,forumImgModifyDto);
        return ResponseEntity.ok("수정 완료");
    }

    @DeleteMapping("/{moimId}/{forumId}/delete")
    public ResponseEntity<?> deleteForum(@PathVariable Integer moimId,
                                         @PathVariable Integer forumId){
        forumService.deleteForum(forumId,moimId);
        return ResponseEntity.ok("삭제 완료");
    }

    @PostMapping("/{moimId}/{forumId}/like")
    public ResponseEntity<?> like(@PathVariable Integer moimId,
                                  @PathVariable Integer forumId) {
        forumService.like(forumId);
        return ResponseEntity.ok("좋아요");
    }
    @DeleteMapping("/{moimId}/{forumId}/dislike")
    public ResponseEntity<?> dislike(@PathVariable Integer moimId,
                                     @PathVariable Integer forumId) {
        forumService.dislike(forumId);
        return ResponseEntity.ok("좋아요 삭제 요청 완료");
    }

}
