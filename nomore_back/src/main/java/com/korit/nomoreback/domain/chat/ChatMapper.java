package com.korit.nomoreback.domain.chat;

import com.korit.nomoreback.dto.chat.ChatMessageDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ChatMapper {
    void insertChat(ChatMessageDto chat);
}
