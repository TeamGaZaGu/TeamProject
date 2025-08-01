package com.korit.nomore.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PageResponse {
    private int currentPage;
    private int totalPages;
    private long totalElements;
    private boolean hasNext;
    private boolean hasPrevious;
    private int size;

    public static PageResponse of(int currentPage, long totalElements, int size) {
        int totalPages = (int) Math.ceil((double) totalElements / size);

        return PageResponse.builder()
                .currentPage(currentPage)
                .totalPages(totalPages)
                .totalElements(totalElements)
                .hasNext(currentPage < totalPages)
                .hasPrevious(currentPage > 1)
                .size(size)
                .build();
    }
}
