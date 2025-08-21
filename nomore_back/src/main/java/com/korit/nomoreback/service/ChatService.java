package com.korit.nomoreback.service;

import com.korit.nomoreback.domain.chat.Chat;
import com.korit.nomoreback.domain.chat.ChatMapper;
import com.korit.nomoreback.domain.user.User;
import com.korit.nomoreback.domain.user.UserMapper;
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
    private final UserMapper userMapper;




    @Transactional
    public void registerChat(Integer userId, ChatMessageDto chatMessageDto) {
        // 1. userId로 User 조회
        User user = userMapper.findById(userId);
        if (user == null) {
            throw new IllegalArgumentException("존재하지 않는 유저입니다.");
        }

        // 2. DTO에 닉네임 세팅
        chatMessageDto.setUserNickName(user.getNickName());

        // 3. DB 저장
        chatMapper.insertChat(chatMessageDto);
    }

    public List<Chat> getMessages(Integer moimId, Integer limit, Integer offset) {
        return chatMapper.getMessages(moimId,limit,offset);

    }

    public User getUserById(Integer userId) {
        return userMapper.findById(userId);
    }
}
