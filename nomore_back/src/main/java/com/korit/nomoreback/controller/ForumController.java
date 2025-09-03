package com.korit.nomoreback.controller;

import com.korit.nomoreback.domain.forum.Forum;
import com.korit.nomoreback.dto.forum.*;
import com.korit.nomoreback.dto.response.ResponseDto;
import com.korit.nomoreback.service.BlobService;
import com.korit.nomoreback.service.ForumService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forum")
@RequiredArgsConstructor
public class ForumController {

    private final ForumService forumService;
    private final BlobService blobService;

    @PostMapping(value = "/{moimId}/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> registerForum(@PathVariable Integer moimId ,
                                           @ModelAttribute ForumRegisterDto dto) {
        dto.setMoimId(moimId);
        forumService.registerForum(dto);
        return ResponseEntity.ok("게시글작성");
    }

    @GetMapping("/{forumId}")
    public ResponseEntity<?> getForum(@PathVariable Integer forumId) {
        Forum forum = forumService.getForumById(forumId);
        return ResponseEntity.ok(forum);
    }


    @GetMapping("/forums")
    public ResponseEntity<ResponseDto<?>> getForumList(ForumSearchReqDto dto) {
        return ResponseEntity.ok(ResponseDto.success(forumService.getForumsByMoimId(dto)));
    }

    @GetMapping("/forums/blobs")
    public ResponseEntity<byte[]> getImage(@RequestParam String url, @RequestParam String imageConfigsName) {
        System.out.println("url " + url);
        byte[] data = blobService.getBlob(url, imageConfigsName);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        headers.setContentDisposition(ContentDisposition.inline().filename("image.jpg").build());
        headers.setContentLength(data.length);

        return ResponseEntity.ok().headers(headers).body(data);
    }

    @GetMapping("/{moimId}/forums/category/{categoryId}")
    public ResponseEntity<List<Forum>> getForumListByCategory(@PathVariable Integer moimId,
                                                              @PathVariable Integer categoryId) {
        List<Forum> froms = forumService.getForumsByCategoryId(moimId, categoryId);
        return ResponseEntity.ok(froms);
    }

    @PutMapping("/{forumId}/modify")
    public ResponseEntity<?> modifyForum(@PathVariable Integer forumId,
                                         @ModelAttribute ForumModifyDto forumModifyDto) {
        System.out.println(forumModifyDto);
        forumModifyDto.setForumId(forumId);
        forumService.modifyForum(forumModifyDto);
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

    @GetMapping("/comments")
    public ResponseEntity<ResponseDto<?>> getComments(ForumCommentSearchReqDto dto) {
        System.out.println(dto);
        return ResponseEntity.ok(ResponseDto.success(forumService.getCommentsByForumId(dto)));
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
