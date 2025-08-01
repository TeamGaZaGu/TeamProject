package com.korit.nomore.dto.response;

import com.korit.nomore.domain.entity.Moim;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MoimResponse {
    private Long id;
    private String title;
    private String description;
    private String category;
    private String categoryName;
    private String district;
    private String districtName;
    private String location;
    private Integer memberCount;
    private Integer maxMembers;
    private Integer remainingSlots;
    private LocalDate date;
    private LocalTime time;
    private List<String> tags;
    private String organizer;
    private String emoji;
    private Boolean isOnline;
    private Integer fee;
    private Boolean isFree;
    private Boolean isFull;

    public static MoimResponse from(Moim moim, String districtName, String categoryName) {
        return MoimResponse.builder()
                .id(moim.getId())
                .title(moim.getTitle())
                .description(moim.getDescription())
                .category(moim.getCategory())
                .categoryName(categoryName)
                .district(moim.getDistrict())
                .districtName(districtName)
                .location(moim.getLocation())
                .memberCount(moim.getMemberCount())
                .maxMembers(moim.getMaxMembers())
                .remainingSlots(moim.getRemainingSlots())
                .date(moim.getDate())
                .time(moim.getTime())
                .tags(moim.getTags())
                .organizer(moim.getOrganizer())
                .emoji(moim.getEmoji())
                .isOnline(moim.getIsOnline())
                .fee(moim.getFee())
                .isFree(moim.isFree())
                .isFull(moim.isFull())
                .build();
    }
}
