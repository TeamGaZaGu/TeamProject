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

    public Moim modify(Moim modifyMoim) {
        if (title != null ) modifyMoim.setTitle(title);
        if (discription != null ) modifyMoim.setDiscription(discription);
        if (maxMember != null ) modifyMoim.setMaxMember(maxMember);
        return modifyMoim;
    }
}
