package com.korit.nomoreback.controller;

import com.korit.nomoreback.domain.moim.Moim;
import com.korit.nomoreback.domain.moim.MoimBan;
import com.korit.nomoreback.domain.user.User;
import com.korit.nomoreback.dto.moim.*;
import com.korit.nomoreback.dto.response.ResponseDto;
import com.korit.nomoreback.dto.moim.MoimCreateDto;
import com.korit.nomoreback.dto.moim.MoimListRespDto;
import com.korit.nomoreback.dto.moim.MoimModifyDto;
import com.korit.nomoreback.dto.moim.MoimSearchReqDto;
import com.korit.nomoreback.security.model.PrincipalUtil;
import com.korit.nomoreback.service.MoimBanService;
import com.korit.nomoreback.service.MoimService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/moim")
public class MoimController {

    private final MoimService moimService;
    private final PrincipalUtil principalUtil;
    private final MoimBanService moimBanService;

    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> create(@ModelAttribute MoimCreateDto dto) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        dto.setUserId(userId);
        moimService.createMoim(dto);
        return ResponseEntity.ok("신규 생성 완료");
    }

    @PostMapping("/{moimId}/join")
    public ResponseEntity<?> join(@PathVariable Integer moimId) {

        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        moimService.joinMoim(moimId, userId);
        return ResponseEntity.ok("가입 완");
    }

    @DeleteMapping("/{moimId}/exit")
    public ResponseEntity<?> exit(@PathVariable Integer moimId) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        moimService.exitMoim(moimId, userId);
        return ResponseEntity.ok("탈퇴 완");
    }

    @GetMapping("/{moimId}/select")
    public ResponseEntity<?> selectMoim(@PathVariable Integer moimId) {
        return ResponseEntity.ok(moimService.findMoim(moimId));
    }


    @GetMapping("/find")
    public ResponseEntity<ResponseDto<?>> findCategoryMoims(MoimCategoryReqDto dto) {
        System.out.println(dto);
        return ResponseEntity.ok(ResponseDto.success(moimService.categoryMoim(dto)));
    }

    @GetMapping("/find/categoryIdInUserId")
    public List<Moim> findMoimByCategoryIdInUserId() {
        return moimService.findMoimByCategoryIdInUserId();
    }

//        @GetMapping("/find/{categoryId}")
//        public List<Moim> findMoimByCategoryId(@PathVariable Integer categoryId) {
//            return moimService.findMoimByCategoryId(categoryId);
//        }

    @PatchMapping(value = "/{moimId}/modify", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateMoim(@PathVariable Integer moimId, @ModelAttribute MoimModifyDto dto) {
      System.out.println(dto);
      Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
      dto.setMoimId(moimId);
      moimService.modifyMoim(dto, userId);
      return ResponseEntity.ok("수정 완");
    }

    @DeleteMapping("/{moimId}/delete")
    public ResponseEntity<?> remove(@PathVariable Integer moimId) {
      moimService.deleteMoimById(moimId);
      return ResponseEntity.ok("삭제 완");
    }

    @GetMapping("/search")
    public ResponseEntity<List<MoimListRespDto>> searchMoim(
          @RequestParam(required = false) Integer districtId,
          @RequestParam(required = false) Integer categoryId,
          @RequestParam(required = false) String keyword
    ) {
      MoimSearchReqDto searchReqDto = new MoimSearchReqDto();
      searchReqDto.setDistrictId(districtId);
      searchReqDto.setCategoryId(categoryId);
      searchReqDto.setKeyword(keyword);

      List<MoimListRespDto> moimList = moimService.searchMoim(searchReqDto);
      System.out.println("검색 파라미터: " + searchReqDto);
      return ResponseEntity.ok(moimList);
    }

    @GetMapping("/userList")
    public ResponseEntity<List<User>> moimUserList(@RequestParam Integer moimId) {
      System.out.println(moimService.moimUserList(moimId));
      return ResponseEntity.ok(moimService.moimUserList(moimId));
    }

    @PostMapping("/{moimId}/ban/{userId}")
    public ResponseEntity<ResponseDto<?>> banUser(
          @PathVariable Integer moimId,
          @PathVariable Integer userId) {
      moimBanService.banUser(moimId, userId);
      return ResponseEntity.ok(ResponseDto.success("사용자를 모임에서 강퇴했습니다."));
    }

    @GetMapping("/{moimId}/ban")
    public ResponseEntity<List<MoimBan>> banUserList(@PathVariable Integer moimId) {
      return ResponseEntity.ok(moimBanService.banUserList(moimId));
    }

    @GetMapping("/{userId}/moims")
    public ResponseEntity<List<Moim>> myMoimList(@PathVariable Integer userId) {
      System.out.println(moimService.myMoimList(userId));
      return ResponseEntity.ok(moimService.myMoimList(userId));
    }

    @PostMapping("/transfer-ownership/{moimId}")
    public ResponseEntity<?> transferOwnership(
            @PathVariable Integer moimId,
            @RequestBody Map<String, Integer> request) {

        try {
            Integer newOwnerId = request.get("newOwnerId");
            Integer currentUserId = request.get("currentUserId");

            moimService.transferOwnership(moimId, newOwnerId, currentUserId);
            return ResponseEntity.ok("권한이 성공적으로 이양되었습니다");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("권한 이양 중 오류가 발생했습니다");
        }
    }

    @GetMapping("/members/{moimId}")
    public ResponseEntity<?> getAllMoimMembers(@PathVariable Integer moimId) {
        try {
            List<MoimRoleDto> members = moimService.getAllMoimMembers(moimId);
            return ResponseEntity.ok(members);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("멤버 목록 조회 중 오류가 발생했습니다");
        }
    }

    @PostMapping("/transfer-ownership-direct/{moimId}/{newOwnerId}")
    public ResponseEntity<?> transferOwnershipDirect(
            @PathVariable Integer moimId,
            @PathVariable Integer newOwnerId,
            @PathVariable Integer currentUserId) {

        try {
            moimService.transferOwnership(moimId, newOwnerId, currentUserId);
            return ResponseEntity.ok("권한이 성공적으로 이양되었습니다");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("권한 이양 중 오류가 발생했습니다");
        }
    }
}
