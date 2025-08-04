package com.korit.nomoreback.domain.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserSearchOption {
    private Integer startIndex;
    private Integer size;
    private String searchText;
}
