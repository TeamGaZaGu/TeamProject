package com.korit.nomoreback.service;

import com.korit.nomoreback.util.AppProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileService {

    private final AppProperties appProperties;

    public String uploadFile(MultipartFile file, String imageConfigName) {
        System.out.println("imageConfigName" + imageConfigName);
        String dirPath = appProperties.getImageConfigs().get(imageConfigName).getDirPath();
        String originalFilename = generateFilename(file.getOriginalFilename());

        mkdirs(dirPath);

        String filePath = dirPath + "/" + originalFilename;

        Path path = Paths.get(filePath);
        try {
            Files.write(path, file.getBytes());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return originalFilename;
    }

    private String generateFilename(String originFilename) {
        StringBuilder newFilename = new StringBuilder();
        newFilename.append(UUID.randomUUID().toString().replaceAll("-", ""));
        newFilename.append("_");
        newFilename.append(originFilename);

        return newFilename.toString();
    }
    private void mkdirs( String path) {
        File f = new File(path);
        if (!f.exists()) {
            f.mkdirs();
        }
    }

    public void deleteFile(String path) {
        if (path == null || path.isEmpty()) {
            return;
        }

        File file = new File(path);
        if (!file.exists()) {
            return;
        }
        file.delete();
    }

    public byte[] convertToBlob(String path) {
        try {
            File file = new File(path);
            return Files.readAllBytes(file.toPath());
        }catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}