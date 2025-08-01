package com.korit.nomore.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StatsResponse {
    private String id;
    private String name;
    private String emoji;
    private String type;
    private Long moimCount;
    private Long totalMembers;
}
