package com.korit.nomoreback.controller;

import com.korit.nomoreback.domain.user.User;
import com.korit.nomoreback.dto.chat.ChatMessageDto;
import com.korit.nomoreback.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
@RequiredArgsConstructor
public class ChattingController {

    private final ChatService chatService;
    private final SimpMessagingTemplate template;

    @MessageMapping("/chat/{moimId}")
    public void message(@DestinationVariable Integer moimId,
                        ChatMessageDto chatMessageDto,
                        @Header("simpSessionAttributes") Map<String, Object> sessionAttrs) {

        User user = (User) sessionAttrs.get("user");
        if (user == null) return; // 인증 실패 시 무시

        chatMessageDto.setUserNickName(user.getNickName());
        chatMessageDto.setMoimId(moimId);

        chatService.registerChat(user, chatMessageDto); // DB 저장
        template.convertAndSend("/sub/chat/" + moimId, chatMessageDto); // 실시간 전송
    }
}
