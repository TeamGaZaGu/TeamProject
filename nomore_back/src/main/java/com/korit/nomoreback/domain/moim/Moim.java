package com.korit.nomoreback.domain.moim;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Moim {
    private Integer moimId;
    private String title;
    private String discription;
    private Integer memberCount;
    private Integer maxMember;
    private String moimImgPath;

    private Integer districtId;
    private Integer categoryId;
    private Integer userId;
}
