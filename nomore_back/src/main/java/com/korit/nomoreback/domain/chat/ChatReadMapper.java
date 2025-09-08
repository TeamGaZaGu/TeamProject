package com.korit.nomoreback.domain.chat;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ChatReadMapper {
    int insertRead(ChatRead chatRead);
    List<Integer> selectReadUser(@Param("chatId") Integer chatId);
    int countUserByChatId(@Param("chatId")Integer chatId);
}
