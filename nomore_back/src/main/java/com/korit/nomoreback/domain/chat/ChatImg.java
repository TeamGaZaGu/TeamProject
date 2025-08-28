package com.korit.nomoreback.domain.chat;

import com.korit.nomoreback.util.ImageUrlUtil;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ChatImg {

    private Integer chatImgId;
    private Integer chatId;
    private Integer seq;
    private String path;

    public ChatImg buildUrl(ImageUrlUtil imageUrlUtil) {
        this.path = imageUrlUtil.buildImageUrl(this.path ,"chat");
        return this;
    }
}
