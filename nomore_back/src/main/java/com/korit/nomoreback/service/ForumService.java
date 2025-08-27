package com.korit.nomoreback.service;

import com.korit.nomoreback.domain.forum.*;
import com.korit.nomoreback.domain.moimRole.MoimRoleMapper;
import com.korit.nomoreback.dto.forum.*;
import com.korit.nomoreback.dto.moim.MoimRoleDto;
import com.korit.nomoreback.security.model.PrincipalUtil;
import com.korit.nomoreback.util.AppProperties;
import com.korit.nomoreback.util.ImageUrlUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ForumService {

    private final ForumMapper forumMapper;
    private final PrincipalUtil principalUtil;
    private final FileService fileService;
    private final ForumCommentMapper forumCommentMapper;
    private final ForumLikeMapper forumLikeMapper;
    private final ForumImgMapper forumImgMapper;
    private final MoimRoleMapper moimRoleMapper;
    private final ImageUrlUtil imageUrlUtil;
    private final AppProperties appProperties;

    @Transactional
    public void registerForum(ForumRegisterDto dto) {

        Forum forum = dto.toEntity();
        forumMapper.registerForum(forum);

        List<MultipartFile> imageFiles = dto.getForumImages();

        if (imageFiles != null && !imageFiles.isEmpty()) {
            List<ForumImg> forumImgs = new ArrayList<>();
            int seq = 1;

            for (MultipartFile file : imageFiles) {
                String storedPath = fileService.uploadFile(file, "forum");

                ForumImg forumImg = ForumImg.builder()
                        .forumId(forum.getForumId())
                        .seq(seq++)
                        .path(storedPath)
                        .build();

                forumImgs.add(forumImg);
            }
            System.out.println("이미지 저장 리스트: " + forumImgs);

            forumImgMapper.insertMany(forumImgs);
        }
    }

    public Forum getForumById(Integer forumId) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        Forum forum = forumMapper.findByForumIdAndUserId(forumId, userId);
        List<ForumImg> forumImgs = forumImgMapper.findImgById(forum.getForumId());
        forumImgs.forEach(img -> img.buildImageUrl(imageUrlUtil));
        forum.setForumImgList(forumImgs);
        forum.getUser().buildImageUrl(imageUrlUtil);

        return forum;
    }

    public byte[] getBlob(String url, String imageConfigsName) {
        String fileName = url.replaceAll(appProperties.getImageConfigs().get(imageConfigsName).getPrefix(), "");
        String path = appProperties.getImageConfigs().get(imageConfigsName).getDirPath() + fileName;
        return fileService.convertToBlob(path);
    }

    public List<Forum> getForumsByMoimId(Integer moimId) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        List<Forum> forums = forumMapper.findByMoimId(moimId, userId);

        for (Forum forum : forums) {
            List<ForumImg> forumImgs = forumImgMapper.findImgById(forum.getForumId());
            forumImgs.forEach(img -> img.buildImageUrl(imageUrlUtil));
            forum.setForumImgList(forumImgs);;
            forum.getUser().buildImageUrl(imageUrlUtil);
        }
        return forums;
    }

    public List<Forum> getForumsByCategoryId(Integer moimId, Integer categoryId) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        return forumMapper.findByCategoryId(moimId, categoryId, userId);
    }


    public void modifyForum(ForumModifyDto dto){
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        Integer forumId = dto.getForumId();
        Forum forum = forumMapper.findByForumId(forumId);
        Forum originForum = forumMapper.findByForumIdAndUserId(forumId,userId);

        List<ForumImg> forumImgs = forumImgMapper.findImgById(forumId);
        if (forumImgs != null && !forumImgs.isEmpty()) {
            List<Integer> imgIds = forumImgs.stream()
                    .map(forumImg -> forumImg.getForumImgId())
                    .toList();

            forumImgMapper.deleteImg(imgIds);
        }

        List<MultipartFile> imageFiles = dto.getForumImages();
        System.out.println("imageFiles" + imageFiles);
        List<ForumImg> modifiedImgList = new ArrayList<>();
        if (imageFiles != null) {
            int seq = 1;
            for (MultipartFile file : imageFiles) {
                String storedPath = fileService.uploadFile(file, "forum");

                ForumImg forumImg = ForumImg.builder()
                        .forumId(forumId)
                        .seq(seq++)
                        .path(storedPath)
                        .build();

                modifiedImgList.add(forumImg);
            }
        }

        if (userId.equals(forum.getUser().getUserId()) ||
                moimRoleMapper.findRoleByUserAndMoimId(userId,forum.getMoim().getMoimId()).equals("OWNER")){
            if (modifiedImgList != null && !modifiedImgList.isEmpty()) {
                forumImgMapper.insertMany(modifiedImgList);
            }
            forumMapper.modifyForum(dto.modify(originForum));
            return;
        }

        throw new IllegalArgumentException("권한 없음");
    }

    public void deleteForum(Integer forumId,Integer moimId) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

        Forum forum = forumMapper.findByForumId(forumId);

        List<ForumImg> forumImgs = forumImgMapper.findImgById(forumId);

        List<Integer> imgIds = forumImgs.stream()
                .map(ForumImg::getForumImgId)
                .toList();

        if (userId.equals(forum.getUser().getUserId()) ||
            moimRoleMapper.findRoleByUserAndMoimId(userId,moimId).equals("OWNER")){
            if (!imgIds.isEmpty()) {
                forumImgMapper.deleteImg(imgIds);
            }
            forumMapper.deleteForum(forumId);
            return;
        }

        throw new IllegalArgumentException("권한 없음");
    }

    public List<ForumCategory> getFourumCategories() {
        return forumMapper.getFourumCategories();
    }

    public Integer registerComment(ForumCommentRegDto dto) {

        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

        forumCommentMapper.insert(dto.toEntity(userId));

        return forumCommentMapper.getCountByForumId(dto.getForumId());
    }

    public List<ForumComment> getCommentsByForumId(Integer forumId) {

        return forumCommentMapper.findAllByForumId(forumId);

    }

    public void modifyComment (ForumCommentModifyDto modifyDto,Integer forumId) {
        List<ForumComment> forumCommentList = forumCommentMapper.findAllByForumId(forumId);
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        forumCommentList
                .stream().filter(comment -> comment.getUserId().equals(userId))
                .forEach(forumComment -> forumCommentMapper.modifyComment(modifyDto.toEntity(forumComment)));
    }

    public void deleteComment(Integer forumCommentId, Integer forumId, Integer moimId) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        ForumComment comment = forumCommentMapper.findByCommentId(forumCommentId);
        MoimRoleDto moimRoleDto = moimRoleMapper.findRoleByUserAndMoimId(userId,moimId);

        if (comment == null || !comment.getForumId().equals(forumId)) {
            throw new IllegalArgumentException("댓글이 존재하지 않거나 게시판이 다릅니다.");
        }

        if (!comment.getUserId().equals(userId) && moimRoleDto.getMoimRole().equals("MEMBER")) {
            throw new IllegalArgumentException("권한 없음");
        }

        forumCommentMapper.deleteComment(forumCommentId);
    }


    public void like(Integer forumId) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        forumLikeMapper.insertLike(forumId, userId);
    }

    public void dislike(Integer forumId) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        forumLikeMapper.deleteLike(forumId, userId);
    }

}
