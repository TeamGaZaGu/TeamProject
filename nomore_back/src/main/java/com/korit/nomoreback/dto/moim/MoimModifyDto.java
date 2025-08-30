package com.korit.nomoreback.dto.moim;

import com.korit.nomoreback.domain.moim.Moim;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class MoimModifyDto {

    private Integer moimId;
    private String title;
    private String discription;
    private Integer maxMember;
    private Integer districtId;
    private Integer categoryId;
    private MultipartFile moimImgPath;

    public Moim toEntity() {
        return Moim.builder()
                .moimId(moimId)
                .title(title)
                .discription(discription)
                .maxMember(maxMember)
                .districtId(districtId)
                .categoryId(categoryId)
                .build();
    }
}
