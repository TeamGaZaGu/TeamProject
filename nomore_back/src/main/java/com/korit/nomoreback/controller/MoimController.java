package com.korit.nomoreback.controller;

import com.korit.nomoreback.domain.moim.Moim;
import com.korit.nomoreback.dto.moim.MoimCreateDto;
import com.korit.nomoreback.dto.moim.MoimListRespDto;
import com.korit.nomoreback.dto.moim.MoimModifyDto;
import com.korit.nomoreback.dto.moim.MoimSearchReqDto;
import com.korit.nomoreback.security.model.PrincipalUtil;
import com.korit.nomoreback.service.MoimService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/moim")
public class MoimController {

    private final MoimService moimService;
    private final PrincipalUtil principalUtil;

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

    @GetMapping("/{moimId}/select")
    public ResponseEntity<?> selectMoim(@PathVariable Integer moimId) {

        moimService.findMoim(moimId);

        return ResponseEntity.ok("찾았다");
    }


    @GetMapping("/find")
    public List<Moim> findAllMoims() {
        return moimService.findAll();
    }

    @GetMapping("/find/categoryIdInUserId")
    public List<Moim> findMoimByCategoryIdInUserId() {
        return moimService.findMoimByCategoryIdInUserId();
    }

    @GetMapping("/find/{categoryId}")
    public List<Moim> findMoimByCategoryId(@PathVariable Integer categoryId) {
        return moimService.findMoimByCategoryId(categoryId);
    }

    @PatchMapping("/{moimId}")
    public ResponseEntity<?> updateMoim(@PathVariable Integer moimId, @RequestBody MoimModifyDto dto) {
        dto.setMoimId(moimId);
        moimService.modifyMoim(dto);
        return ResponseEntity.ok("수정 완");
    }

    @DeleteMapping("/{moimId}")
    public ResponseEntity<?> remove(@PathVariable Integer moimId) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

        moimService.deleteMoimById(moimId, userId);

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
}