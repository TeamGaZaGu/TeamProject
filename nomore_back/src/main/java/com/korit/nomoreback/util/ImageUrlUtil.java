package com.korit.nomoreback.util;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ImageUrlUtil {

    private final AppProperties appProperties;

    public String buildImageUrl(String imageUrl, String imageConfigName) {

        if (imageConfigName == null) {
            return null;
        }

        if (!appProperties.getImageConfigs().containsKey(imageConfigName)) {
            return null;
        }

        String prefix = appProperties.getImageConfigs().get(imageConfigName).getPrefix();
        String defaultImg = appProperties.getImageConfigs().get(imageConfigName).getDefaultImg();

        if (imageUrl == null) {
            return prefix + "/" + defaultImg;
        }

        if (imageUrl.startsWith("http")) {
            return imageUrl;
        }

        return prefix + "/" + imageUrl;
    }
}