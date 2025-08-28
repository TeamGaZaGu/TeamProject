package com.korit.nomoreback.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ChatResponseDto {

    private Integer chatId;
    private String chattingContent;
    private String userNickName;
    private LocalDateTime chattedAt;
    private List<ChatImgRepDto> images;

}
