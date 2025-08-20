package com.korit.nomoreback.controller;

import com.korit.nomoreback.domain.chat.Chat;
import com.korit.nomoreback.domain.user.User;
import com.korit.nomoreback.dto.chat.ChatMessageDto;
import com.korit.nomoreback.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat")
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
        chatMessageDto.setChattedAt(LocalDateTime.now());

        chatService.registerChat(user, chatMessageDto); // DB 저장
        template.convertAndSend("/sub/chat/" + moimId, chatMessageDto); // 실시간 전송
    }

    @GetMapping("/{moimId}/messages")
    public List<Chat> getMessages(@PathVariable Integer moimId,
                                  @RequestParam(defaultValue = "50") Integer limit,
                                  @RequestParam(defaultValue = "0") Integer offset){
        System.out.println("안나오는데");
        return chatService.getMessages(moimId,limit,offset);
    }
}
