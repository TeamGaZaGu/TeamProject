package com.korit.nomoreback.domain.chat;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ChatImgMapper {

    int insertMany(@Param("chatImg")List<ChatImg> chatImgList);

    List<ChatImg> findByChatId(@Param("chatId")Integer chatId);

    void deleteByChatId(@Param("chatId") Integer chatId);

}
