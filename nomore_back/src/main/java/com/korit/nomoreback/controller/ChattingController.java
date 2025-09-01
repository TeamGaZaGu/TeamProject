package com.korit.nomoreback.controller;

import com.korit.nomoreback.domain.chat.Chat;
import com.korit.nomoreback.domain.chat.ChatImg;
import com.korit.nomoreback.domain.chat.ChatImgMapper;
import com.korit.nomoreback.domain.chat.ChatMapper;
import com.korit.nomoreback.domain.user.User;
import com.korit.nomoreback.dto.chat.ChatImgRepDto;
import com.korit.nomoreback.dto.chat.ChatImgUploadResponseDto;
import com.korit.nomoreback.dto.chat.ChatMessageDto;
import com.korit.nomoreback.dto.chat.ChatResponseDto;
import com.korit.nomoreback.event.ChatOnlineUsersState;
import com.korit.nomoreback.service.ChatService;
import com.korit.nomoreback.service.FileService;
import com.korit.nomoreback.service.MoimService;
import com.korit.nomoreback.util.ImageUrlUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat")
public class ChattingController {

    private final ChatService chatService;
    private final SimpMessagingTemplate template;
    private final ChatOnlineUsersState chatOnlineUsersState;
    private final MoimService moimService;
    private final ChatMapper chatMapper;
    private final ChatImgMapper chatImgMapper;
    private final FileService fileService;
    private final ImageUrlUtil imageUrlUtil;


    // WebSocket 채팅 메시지 수신
    @MessageMapping("/chat/{moimId}")
    public void message(@DestinationVariable Integer moimId,
                        @Payload ChatMessageDto chatMessageDto,
                        @Header("simpSessionAttributes") Map<String, Object> sessionAttrs) {

        Object userIdObj = sessionAttrs.get("userId");
        if (userIdObj == null) return;

        Integer userId = (userIdObj instanceof Integer)
                ? (Integer) userIdObj
                : Integer.parseInt(userIdObj.toString());

        User user = chatService.getUserById(userId);
        if (user == null) return;

        boolean isMember = moimService.moimUserList(moimId)
                .stream()
                .anyMatch(m -> m.getUserId().equals(userId));
        if (!isMember) {
            System.out.println("❌채팅 권한이 없습니다❌");
            return;
        }

        // 🔹 서비스에서 Chat + ChatImg 처리 후 DTO 반환
        ChatResponseDto response = chatService.registerChat(userId, chatMessageDto);

        // 🔹 반환된 DTO를 WebSocket 브로드캐스트
        template.convertAndSend("/sub/chat/" + moimId, response);
    }

    // REST API: 채팅 기록 조회
    @GetMapping("/{moimId}/messages")
    public List<ChatResponseDto> getMessagesWithImages(@PathVariable Integer moimId,
                                                       @RequestParam(defaultValue = "70") Integer limit,
                                                       @RequestParam(defaultValue = "0") Integer offset) {
        List<Chat> chatList = chatMapper.getMessages(moimId, limit, offset);
        List<ChatResponseDto> result = new ArrayList<>();

        for (Chat chat : chatList) {
            List<ChatImg> imgs = chatImgMapper.findByChatId(chat.getChatId());

            // ✅ 여기서 path를 URL로 변환
            List<ChatImgRepDto> imgDtos = imgs.stream()
                    .map(img -> new ChatImgRepDto(
                            img.getChatImgId(),
                            img.getSeq(),
                            imageUrlUtil.buildImageUrl(img.getPath(), "chat") // ✅ "chat"은 imageConfigName
                    ))
                    .toList();

            result.add(ChatResponseDto.builder()
                    .chatId(chat.getChatId())
                    .chattingContent(chat.getChattingContent())
                    .userNickName(chat.getUserNickName())
                    .chattedAt(chat.getChattedAt())
                    .images(imgDtos)
                    .build());
        }

        System.out.println(result);
        return result;
    }

    @PostMapping("/{moimId}/upload")
    public ResponseEntity<List<Map<String, String>>> uploadImages(
            @PathVariable Integer moimId,
            @RequestParam("files") List<MultipartFile> files) {

        if (files == null || files.isEmpty()) {
            return ResponseEntity.ok(List.of()); // 빈 배열 반환
        }

        List<Map<String, String>> uploaded = files.stream().map(file -> {
            String path = fileService.uploadFile(file, "chat");
            Map<String, String> map = new HashMap<>();
            map.put("path", path);
            return map;
        }).toList();

        System.out.println(uploaded);
        return ResponseEntity.ok(uploaded);
    }

    @DeleteMapping("/{chatId}")
    public ResponseEntity<Void> deleteChat(@PathVariable Integer chatId) {
        chatService.deleteChat(chatId);
        template.convertAndSend("/sub/chat/delete", chatId);
        return ResponseEntity.noContent().build();
    }

    // WebSocket: 온라인 유저 리스트 조회
    @MessageMapping("/chat/{moimId}/online")
    public void getOnlineUserList(@DestinationVariable Integer moimId) {
        Set<Integer> userSet = chatOnlineUsersState.getOnlineUsersByMoim().get(moimId);
        if (userSet != null && !userSet.isEmpty()) {
            template.convertAndSend("/sub/chat/" + moimId + "/online",
                    userSet.stream().map(String::valueOf).toList());
        }
    }

    // WebSocket: 유저 오프라인 처리
    @MessageMapping("/chat/{moimId}/{userId}/offline")
    public void userOffline(@DestinationVariable Integer moimId,
                            @DestinationVariable Integer userId) {
        chatOnlineUsersState.removeOnlineUserByMoimId(moimId, userId);
    }
}
