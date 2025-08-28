package com.korit.nomoreback.dto.forum;

import com.korit.nomoreback.domain.forum.Forum;
import com.korit.nomoreback.domain.forum.ForumCategory;
import com.korit.nomoreback.domain.user.User;
import com.korit.nomoreback.domain.moim.Moim;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ForumRegisterDto {

    private String forumTitle;
    private String forumContent;
    private LocalDateTime createdAt;

    private List<MultipartFile> forumImages;  // 여러장 이미지 업로드용

    private Integer moimId;  // id만 받는 경우도 가능
    private Integer userId;
    private Integer forumCategoryId;

    public Forum toEntity() {
        return Forum.builder()
                .forumTitle(forumTitle)
                .forumContent(forumContent)
                .forumCreatedAt(LocalDateTime.now())
                .moim(Moim.builder().moimId(moimId).build())  // 객체로 넣기
                .user(User.builder().userId(userId).build())
                .forumCategory(ForumCategory.builder().forumCategoryId(forumCategoryId).build())
                .build();
    }
}
