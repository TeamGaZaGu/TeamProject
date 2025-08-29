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


    public ChatImgRepDto(Integer chatImgId, Integer seq, String path) {
        this.chatImgId = chatImgId;
        this.seq = seq;
        this.path = path;
    }
}
