package com.korit.nomoreback.service;

import com.korit.nomoreback.domain.chat.Chat;
import com.korit.nomoreback.domain.chat.ChatMapper;
import com.korit.nomoreback.domain.user.User;
import com.korit.nomoreback.dto.chat.ChatMessageDto;
import com.korit.nomoreback.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatMapper chatMapper;

    @Transactional
    public void registerChat(User user, ChatMessageDto chatMessageDto) {
        chatMessageDto.setUserNickName(user.getNickName());
        chatMapper.insertChat(chatMessageDto); // DB 저장
    }

    public List<Chat> getMessages(Integer moimId, Integer limit, Integer offset) {
        return chatMapper.getMessages(moimId,limit,offset);

    }
}
