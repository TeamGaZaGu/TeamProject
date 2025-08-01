package com.korit.nomore.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MoimListResponse {
    private List<MoimResponse> moims;
    private PageResponse pagination;
    private Map<String, String> filters;
}
