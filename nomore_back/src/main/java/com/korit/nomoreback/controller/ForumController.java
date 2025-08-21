package com.korit.nomoreback.controller;

import com.korit.nomoreback.domain.forum.Forum;
import com.korit.nomoreback.domain.forum.ForumComment;
import com.korit.nomoreback.dto.forum.*;
import com.korit.nomoreback.security.model.PrincipalUtil;
import com.korit.nomoreback.service.ForumService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/moims")
@RequiredArgsConstructor
public class ForumController {

    private final ForumService forumService;
    private final PrincipalUtil principalUtil;

    @PostMapping(value = "/{moimId}/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> registerForum(@PathVariable Integer moimId ,
                                        @ModelAttribute ForumRegisterDto dto) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        dto.setMoimId(moimId);
        dto.setUserId(userId);

        forumService.registerForum(dto);
        return ResponseEntity.ok("게시글작성");
    }

    @GetMapping("/{forumId}")
    public ResponseEntity<?> getForum(@PathVariable Integer forumId) {
        Forum forum = forumService.getForumById(forumId);
        return ResponseEntity.ok(forum);
    }

    @GetMapping("/{moimId}/forums")
    public ResponseEntity<List<Forum>> getForumList(@PathVariable Integer moimId) {
        List<Forum> forums = forumService.getForumsByMoimId(moimId);

        System.out.println(forumService.getForumsByMoimId(moimId));
        return ResponseEntity.ok(forums);
    }


    @GetMapping("/{moimId}/forums/category/{categoryId}")
    public ResponseEntity<List<Forum>> getForumListByCategory(@PathVariable Integer moimId,
                                                              @PathVariable Integer categoryId) {
        List<Forum> froms = forumService.getForumsByCategoryId(moimId, categoryId);
        return ResponseEntity.ok(froms);
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

    @PostMapping("/{moimId}/{forumId}/comment")
    public ResponseEntity<?> registerComment(@PathVariable Integer moimId,
                                             @PathVariable Integer forumId,
                                             @RequestBody ForumCommentRegDto dto) {
        System.out.println(dto);
        dto.setMoimId(moimId);
        dto.setForumId(forumId);
        forumService.registerComment(dto);
        return ResponseEntity.ok("댓글달기");
    }

    @PutMapping("/{moimId}/{forumId}/comment/modify")
    public ResponseEntity<?> modifyComment(@PathVariable Integer moimId,
                                           @PathVariable Integer forumId,
                                           @ModelAttribute ForumCommentModifyDto modifyDto){
        forumService.modifyComment(modifyDto,forumId);
        return ResponseEntity.ok("댓글 수정 완료");
    }
  
    @GetMapping("/forumCategories")
    public ResponseEntity<?> getFourumCategories() {
        return ResponseEntity.ok(forumService.getFourumCategories());
    }

    @GetMapping("/{forumId}/comments")
    public ResponseEntity<List<ForumComment>> getComments(@PathVariable Integer forumId) {
        List<ForumComment> comments = forumService.getCommentsByForumId(forumId);
        return ResponseEntity.ok(comments);
    }
  
    @DeleteMapping("/{moimId}/{forumId}/comment/delete/{forumCommentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Integer moimId,
                                           @PathVariable Integer forumId,
                                           @PathVariable Integer forumCommentId) {
        forumService.deleteComment(forumCommentId,forumId, moimId);
        return ResponseEntity.ok("댓글 삭제 완료");
    }

    @PostMapping("/{forumId}/like")
    public ResponseEntity<?> like(@PathVariable Integer forumId) {
        forumService.like(forumId);
        return ResponseEntity.ok("좋아요");
    }
  
    @DeleteMapping("/{forumId}/dislike")
    public ResponseEntity<?> dislike(@PathVariable Integer forumId) {
        forumService.dislike(forumId);
        return ResponseEntity.ok("좋아요 삭제 요청 완료");
    }

}
