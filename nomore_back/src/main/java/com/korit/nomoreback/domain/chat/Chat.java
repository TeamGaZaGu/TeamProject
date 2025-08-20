package com.korit.nomoreback.domain.chat;

import com.korit.nomoreback.domain.moim.Moim;
import com.korit.nomoreback.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Chat {

    private Integer chatId;
    private String chattingContent;
    private LocalDateTime chattedAt;
    private String userNickName;
    private Integer moimId;

    private User user;
    private Moim moim;

}
