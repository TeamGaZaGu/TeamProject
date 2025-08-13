package com.korit.nomoreback.dto.moim;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class MoimListRespDto {
    private Integer moimId;
    private String moimTitle;
    private String moimDiscription;
    private Integer moimMemberCount;
    private Integer moimMaxMember;
    private Integer districtId;
    private String districtName;
    private Integer categoryId;
    private String categoryName;
    private Integer userId;
    private String nickName;
    private MultipartFile moimImagePath;
}