package com.korit.nomoreback.dto.moim;

import com.korit.nomoreback.domain.moim.Moim;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
public class MoimCreateDto {
    private String title;
    private String discription;
    private Integer memberCount;
    private Integer maxMember;
    private LocalDate date;
    private LocalTime time;
    private Integer districtId;
    private Integer categoryId;
    private Integer userId;
    private String moimImgPath;

    public Moim toEntity() {
        return Moim.builder()
                .title(title)
                .discription(discription)
                .memberCount(memberCount)
                .maxMember(maxMember)
                .date(this.getDate())
                .time(this.getTime())
                .moimImgPath(moimImgPath)
                .districtId(districtId)
                .categoryId(categoryId)
                .userId(userId)
                .build();
    }

}
