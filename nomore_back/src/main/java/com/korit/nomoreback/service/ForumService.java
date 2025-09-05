package com.korit.nomoreback.service;

import com.korit.nomoreback.domain.forum.*;
import com.korit.nomoreback.domain.moimRole.MoimRoleMapper;
import com.korit.nomoreback.domain.user.User;
import com.korit.nomoreback.dto.forum.*;
import com.korit.nomoreback.dto.moim.MoimRoleDto;
import com.korit.nomoreback.security.model.PrincipalUtil;
import com.korit.nomoreback.util.ImageUrlUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    public User getCurrentUser(){
        return principalUtil.getPrincipalUser().getUser();
    }

    @Transactional(rollbackFor = Exception.class)
    public void registerForum(ForumRegisterDto dto) {
        Integer userId = getCurrentUser().getUserId();
        dto.setUserId(userId);
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
            forumImgMapper.insertMany(forumImgs);
        }
    }

    public Forum getForumById(Integer forumId) {
        Integer userId = getCurrentUser().getUserId();

        Forum forum = forumMapper.getForum(forumId, userId);

        if (forum == null && hasAdminRole()) {
            forum = forumMapper.findByForumId(forumId);
        }

        if (forum == null) {
            throw new IllegalArgumentException("존재하지 않는 게시글이거나 접근 권한이 없습니다.");
        }
        List<ForumImg> forumImgs = forumImgMapper.findImgById(forum.getForumId());
        forumImgs.forEach(img -> img.buildImageUrl(imageUrlUtil));
        forum.setForumImgList(forumImgs);
        forum.getUser().buildImageUrl(imageUrlUtil);

        return forum;
    }

    public ForumSearchRespDto getForumsByMoimId(ForumSearchReqDto dto) {
        Integer userId = getCurrentUser().getUserId();
        Integer moimId = dto.getMoimId();

        if (!hasAdminRole() && !moimRoleMapper.isMoimIdAndUserId(moimId, userId)) {
            throw new IllegalArgumentException("게시판 접근 권한이 없습니다. 모임에 가입해주세요.");
        }

        Integer totalElements = forumMapper.getCountOfOptions(dto.toOption());
        Integer totalPages = (int) Math.ceil(totalElements.doubleValue() / dto.getSize().doubleValue());
        List<Forum> foundForums = forumMapper.findAllOfOptions(dto.toOption());
        boolean isLast = foundForums.size() < dto.getSize();

        for (Forum forum : foundForums) {
            List<ForumImg> forumImgs = forumImgMapper.findImgById(forum.getForumId());
            forumImgs.forEach(img -> img.buildImageUrl(imageUrlUtil));
            forum.setForumImgList(forumImgs);;
            forum.getUser().buildImageUrl(imageUrlUtil);
        }

        return ForumSearchRespDto.builder()
                .contents(foundForums)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .page(dto.getPage())
                .size(dto.getSize())
                .isLast(isLast)
                .build();
    }

    public List<Forum> getForumsByCategoryId(Integer moimId, Integer categoryId) {
        Integer userId = getCurrentUser().getUserId();

        if (!hasAdminRole() && !moimRoleMapper.isMoimIdAndUserId(moimId, userId)) {
            throw new IllegalArgumentException("게시판 접근 권한이 없습니다. 모임에 가입해주세요.");
        }

        return forumMapper.findByCategoryId(moimId, categoryId, userId);
    }

    @Transactional(rollbackFor = Exception.class)
    public void modifyForum(ForumModifyDto dto){
        Integer userId = getCurrentUser().getUserId();
        String userRole = getCurrentUser().getUserRole();
        Integer forumId = dto.getForumId();
        Forum forum = forumMapper.findByForumId(forumId);
        Forum originForum = forumMapper.getForum(forumId,userId);

        List<ForumImg> forumImgs = forumImgMapper.findImgById(forumId);
        System.out.println("forumImgs" + forumImgs);
        forumImgs.forEach(forumImg -> fileService.deleteFile(forumImg.getPath(), "forum"));
        if (forumImgs != null && !forumImgs.isEmpty()) {
            List<Integer> imgIds = forumImgs.stream()
                    .map(forumImg -> forumImg.getForumImgId())
                    .toList();
            forumImgMapper.deleteImg(imgIds);
        }


        List<MultipartFile> imageFiles = dto.getForumImages();
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
        String moimRole = moimRoleMapper.findMoimRole(userId, forum.getMoim().getMoimId());

        if ("ROLE_ADMIN".equals(userRole) ||
                userId.equals(forum.getUser().getUserId()) ||
                "OWNER".equals(moimRole)) {
            if (modifiedImgList != null && !modifiedImgList.isEmpty()) {
                forumImgMapper.insertMany(modifiedImgList);
            }
            forumMapper.modifyForum(dto.modify(originForum));
            return;
        }
        throw new IllegalArgumentException("권한 없음");
    }

    public void deleteForum(Integer forumId,Integer moimId) {
        Integer userId = getCurrentUser().getUserId();
        Forum forum = forumMapper.findByForumId(forumId);
        List<ForumImg> forumImgs = forumImgMapper.findImgById(forumId);
        List<Integer> imgIds = forumImgs.stream()
                .map(ForumImg::getForumImgId)
                .toList();

        if (userId.equals(forum.getUser().getUserId()) || moimRoleMapper.findMoimRole(userId,moimId).equals("OWNER")) {
            if (!imgIds.isEmpty()) {
                forumImgMapper.deleteImg(imgIds);
            }
            forumMapper.deleteForum(forumId);
            return;
        }
        System.out.println("권한 없음");
    }

    public List<ForumCategory> getFourumCategories() {
        return forumMapper.getFourumCategories();
    }

    public Integer registerComment(ForumCommentRegDto dto) {
        Integer userId = getCurrentUser().getUserId();
        forumCommentMapper.insert(dto.toEntity(userId));
        return forumCommentMapper.getCountByForumId(dto.getForumId());
    }

    public void modifyComment(ForumCommentModifyDto dto, Integer forumId) {
        Integer userId = getCurrentUser().getUserId();
        ForumComment comment = forumCommentMapper.findByCommentId(dto.getForumCommentId());
        forumCommentMapper.modifyComment(dto.toEntity(comment));
    }

    public void deleteComment(Integer forumCommentId, Integer forumId, Integer moimId) {
        Integer userId = getCurrentUser().getUserId();
        ForumComment comment = forumCommentMapper.findByCommentId(forumCommentId);
        if (comment == null) {
            throw new IllegalArgumentException("댓글을 찾을 수 없습니다.");
        }
        forumCommentMapper.deleteComment(forumCommentId);
    }

    public ForumCommentSearchRespDto getCommentsByForumId(ForumCommentSearchReqDto dto) {
        Integer totalElements = forumCommentMapper.getCountOfOptions(dto.toOption());
        Integer totalPages = (int) Math.ceil(totalElements.doubleValue() / dto.getSize().doubleValue());
        List<ForumComment> foundComments = forumCommentMapper.findAllOfOptions(dto.toOption());
        boolean isLast = foundComments.size() < dto.getSize();

        for (ForumComment comment : foundComments) {
            comment.getUser().buildImageUrl(imageUrlUtil);
        }

        return ForumCommentSearchRespDto.builder()
                .contents(foundComments)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .page(dto.getPage())
                .size(dto.getSize())
                .isLast(isLast)
                .build();
    }

    public void like(Integer forumId) {
        Integer userId = getCurrentUser().getUserId();
        forumLikeMapper.insertLike(forumId, userId);
    }

    public void dislike(Integer forumId) {
        Integer userId = getCurrentUser().getUserId();
        forumLikeMapper.deleteLike(forumId, userId);
    }

    public List<Forum> findPostsByUserId(Integer userId) {
        List<Forum> forums = forumMapper.findPostsByUserId(userId);
        for (Forum forum : forums) {
            List<ForumImg> forumImgs = forumImgMapper.findImgById(forum.getForumId());
            forumImgs.forEach(img -> img.buildImageUrl(imageUrlUtil));
            forum.setForumImgList(forumImgs);
            forum.getUser().buildImageUrl(imageUrlUtil);
        }
        return forums;
    }

    private boolean hasAdminRole() {
        String userRole = principalUtil.getPrincipalUser().getUser().getUserRole();
        return "ROLE_ADMIN".equals(userRole);
    }
}