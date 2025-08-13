package com.korit.nomoreback.domain.forum;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ForumCategory {
    private Integer forumCategoryId;
    private String forumCategoryName;
}
