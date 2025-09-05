package com.korit.nomoreback.service;

import com.korit.nomoreback.util.AppProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileService {

    private final AppProperties appProperties;

    public String uploadFile(MultipartFile file, String imageConfigName) {
        if (file == null || file.isEmpty()) {
            return null;
        }

        System.out.println("imageConfigName" + imageConfigName);
        String dirPath = appProperties.getImageConfigs().get(imageConfigName).getDirPath();
        String originalFilename = file.getOriginalFilename();
        if ("default.jpg".equals(originalFilename)) {
            return "default.jpg";
        }
        System.out.println("originalFilename" + originalFilename);

        // 같은 원본명 + 같은 크기의 파일 찾기
        String existingFile = findSimilarFile(dirPath, originalFilename, file.getSize());
        if (existingFile != null) {
            return existingFile; // 기존 파일 재사용
        }

        // 새 파일 저장 - UUID 붙인 파일명으로
        String newFilename = generateRandomFilename(originalFilename);
        mkdirs(dirPath);
        Path path = Paths.get(dirPath + "/" + newFilename);

        try {
            Files.write(path, file.getBytes());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return newFilename;
    }

    private String findSimilarFile(String dirPath, String originalFilename, long fileSize) {
        File dir = new File(dirPath);
        if (!dir.exists()) return null;

        File[] files = dir.listFiles();
        if (files == null) return null;

        for (File file : files) {
            // UUID_원본파일명 형태에서 원본파일명 추출
            String fileName = file.getName();
            if (fileName.contains("_")) {
                String extractedOriginalName = fileName.substring(fileName.indexOf("_") + 1);
                // 원본 파일명과 파일 크기가 같으면 중복으로 판단
                if (extractedOriginalName.equals(originalFilename) && file.length() == fileSize) {
                    return fileName; // 기존 파일명 반환 (UUID 포함)
                }
            }
        }
        return null;
    }

    private String generateRandomFilename(String originalFilename) {
        StringBuilder newFilename = new StringBuilder();
        newFilename.append(UUID.randomUUID().toString().replaceAll("-", ""));
        newFilename.append("_");
        newFilename.append(originalFilename);
        return newFilename.toString();
    }

    private void mkdirs(String path) {
        File f = new File(path);
        if (!f.exists()) {
            f.mkdirs();
        }
    }

    public void deleteFile(String path,  String imageConfigName) {
        if (path == null || path.isEmpty()) {
            return;
        }
        System.out.println(1);

        String key = "/" + imageConfigName + "/";
        int idx = path.indexOf(key);
        String deleteImg;
        if (idx != -1) {
            deleteImg = path.substring(idx + key.length());
        } else {
            deleteImg = path;
        }
        if ("default.jpg".equals(deleteImg)) {
            return;
        }
        System.out.println(2);
        String dirPath = appProperties.getImageConfigs().get(imageConfigName).getDirPath();

        String filePath = dirPath + "/" + deleteImg;

        File file = new File(filePath);
        System.out.println("file " + file);
        if (!file.exists()) {
            return;
        }
        System.out.println(3);
        file.delete();
        System.out.println(4);
    }

    public byte[] convertToBlob(String path) {
        try {
            File file = new File(path);
            return Files.readAllBytes(file.toPath());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}