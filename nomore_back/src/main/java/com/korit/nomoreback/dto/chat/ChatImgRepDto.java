package com.korit.nomoreback.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatImgRepDto {

    private Integer chatImgId;
    private Integer chatId;
    private Integer seq;
    private String path;

    public ChatImgRepDto(Integer chatId, Integer seq, String path) {
    }
}
