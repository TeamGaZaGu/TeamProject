package com.korit.nomoreback.dto.moim;

import com.korit.nomoreback.domain.moim.Moim;
import lombok.Data;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
public class MoimCreateDto {
    private String title;
    private Integer userId;
    private String discription;
    private Integer maxMember;
    private Integer districtId;
    private Integer categoryId;

    private MultipartFile moimImg;

    public Moim toEntity() {
        return Moim.builder()
                .title(title)
                .userId(userId)
                .discription(discription)
                .maxMember(maxMember)
                .districtId(districtId)
                .categoryId(categoryId)
                .build();
    }
}
