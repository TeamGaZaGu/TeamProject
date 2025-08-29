package com.korit.nomoreback.service;

import com.korit.nomoreback.util.AppProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BlobService {

    private final AppProperties appProperties;
    private final FileService fileService;

    public byte[] getBlob(String url, String imageConfigsName) {
        String fileName = url.replaceAll(appProperties.getImageConfigs().get(imageConfigsName).getPrefix(), "");
        String path = appProperties.getImageConfigs().get(imageConfigsName).getDirPath() + fileName;
        return fileService.convertToBlob(path);
    }
}
