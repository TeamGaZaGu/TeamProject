package com.korit.nomoreback.domain.chat;

import com.korit.nomoreback.dto.chat.ChatMessageDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ChatMapper {
    void insertChat(ChatMessageDto chat);
    List<Chat> getMessages(@Param("moimId") Integer moimId,
                           @Param("limit") Integer limit,
                           @Param("offset") Integer offset);
}
