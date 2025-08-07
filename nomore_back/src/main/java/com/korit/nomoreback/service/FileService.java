package com.korit.nomoreback.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileService {

    @Value("${user.dir}")
    private String rootPath;

    public String uploadFile(MultipartFile file, String dirPath) {
        // 원본 파일 명
        String originalFilename = generateFilename(file.getOriginalFilename());

        // 파일 업로드 경로 생성
        String uploadPath = rootPath + "/upload" + dirPath;
        // 해당 경로 제어할 수 있는 File 객체 생성

        mkdirs(uploadPath);

        String filePath = uploadPath + "/" + originalFilename;

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
        // 겹치지 않는 새 파일명 생성 위한 uuid 문자열 생성
        newFilename.append(UUID.randomUUID().toString().replaceAll("-", ""));
        // uuid와 원본 파일 명 구분 위한 _ 추가
        newFilename.append("_");
        // 마지막 원본 파일 명 추가
        newFilename.append(originFilename);

        return newFilename.toString();
    }
    private void mkdirs( String path) {
        File f = new File(path);
        // 해당 File 객체 생성때의 주입한 경로가 존제ㅔ 하는지 확인
        if (!f.exists()) {
            f.mkdirs();
        }
    }

    public void deleteFile(String path) {
        if (path.substring(path.lastIndexOf("/")).contains("default")) {
            return;
        }
        File file = new File(rootPath + "/upload/" + path);
        if (!file.exists()) {
            return;
        }
        file.delete();
    }
}