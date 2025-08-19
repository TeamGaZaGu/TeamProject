package com.korit.nomoreback.service;

import com.korit.nomoreback.domain.chat.ChatMapper;
import com.korit.nomoreback.domain.user.User;
import com.korit.nomoreback.dto.chat.ChatMessageDto;
import com.korit.nomoreback.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatMapper chatMapper;
    private final PrincipalUtil principalUtil;

    @Transactional
    public void registerChat(User user, ChatMessageDto chatMessageDto) {
        chatMessageDto.setUserNickName(user.getNickName());
        chatMapper.insertChat(chatMessageDto); // DB 저장
    }
}
