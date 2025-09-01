package com.korit.nomoreback.service;

import com.korit.nomoreback.domain.chat.Chat;
import com.korit.nomoreback.domain.chat.ChatImg;
import com.korit.nomoreback.domain.chat.ChatImgMapper;
import com.korit.nomoreback.domain.chat.ChatMapper;
import com.korit.nomoreback.domain.user.User;
import com.korit.nomoreback.domain.user.UserMapper;
import com.korit.nomoreback.dto.chat.ChatImgRepDto;
import com.korit.nomoreback.dto.chat.ChatMessageDto;
import com.korit.nomoreback.dto.chat.ChatResponseDto;
import com.korit.nomoreback.security.model.PrincipalUtil;
import com.korit.nomoreback.util.ImageUrlUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatMapper chatMapper;
    private final UserMapper userMapper;
    private final ChatImgMapper chatImgMapper;

    private final ImageUrlUtil imageUrlUtil;
    private final PrincipalUtil principalUtil;


    @Transactional
    public ChatResponseDto registerChat(Integer userId, ChatMessageDto chatMessageDto) {

        User user = userMapper.findById(userId);
        if (user == null) {
            throw new IllegalArgumentException("존재하지 않는 유저입니다.");
        }

        // 1) Chat insert
        Chat chat = Chat.builder()
                .chattingContent(chatMessageDto.getChattingContent())
                .userNickName(user.getNickName())
                .moimId(chatMessageDto.getMoimId())
                .chattedAt(LocalDateTime.now())
                .build();
        chatMapper.insertChat(chat); // chatId 생성됨

        System.out.println(chat.getChatId());

        // 2) 이미지 처리 (프론트에서 전달된 URL 사용)
        List<String> paths = chatMessageDto.getImagePaths(); // 이제 String 리스트
        List<ChatImg> chatImgList = new ArrayList<>();
        if (paths != null && !paths.isEmpty()) {
            int seq = 1;
            for (String path : paths) {
                ChatImg chatImg = ChatImg.builder()
                        .chatId(chat.getChatId()) // chatId 확보 후 연결
                        .seq(seq++)
                        .path(path)
                        .build();
                chatImgList.add(chatImg);
            }
            System.out.println("list"+chatImgList);
            chatImgMapper.insertMany(chatImgList);
        }

        // 3) DTO 반환 (WebSocket 브로드캐스트용)
        return ChatResponseDto.builder()
                .chatId(chat.getChatId())
                .chattingContent(chat.getChattingContent())
                .userNickName(chat.getUserNickName())
                .chattedAt(chat.getChattedAt())
                .images(chatImgList.stream()
                        .map(img -> new ChatImgRepDto(
                                img.getChatImgId(),
                                img.getSeq(),
                                imageUrlUtil.buildImageUrl(img.getPath(), "chat") // ✅ URL 변환
                        ))
                        .toList())
                .build();
    }

    public List<Chat> getMessages(Integer moimId, Integer limit, Integer offset) {
        return chatMapper.getMessages(moimId, limit, offset);
    }

    public User getUserById(Integer userId) {
        return userMapper.findById(userId);
    }

    public void deleteChat(Integer chatId) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

        Chat chat = chatMapper.findByChatId(chatId);

        User user = userMapper.findById(userId);

        if (chat == null) {
            throw new IllegalArgumentException("존재하지 않는 채팅입니다.");
        }

        if (!chat.getUserNickName().equals(user.getNickName())){
            throw new IllegalArgumentException("본인 채팅만 삭제 가능");
        }

        chatMapper.deleteChatById(chatId);
        chatImgMapper.deleteByChatId(chatId);


    }
}
