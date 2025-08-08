package com.korit.nomoreback.domain.forum;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ForumImg {
    private Integer ForumImgId;
    private Integer ForumId;
    private String ForumImgPath;
}
