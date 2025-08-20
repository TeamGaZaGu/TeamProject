import React, { useEffect, useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { reqGetMessages } from '../../api/chatApi';
import usePrincipalQuery from '../../queries/usePrincipalQuery';

function ChattingPage({ moimId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const stompClientRef = useRef(null);
  const principalQuery = usePrincipalQuery();
    const user = principalQuery?.data?.data?.user.nickName;
    console.log(user);

  useEffect(() => {
    async function fetchPastMessages() {
    try {
      const response = await reqGetMessages(moimId, 0, 50); // offset 0, limit 50
      // DESC로 가져왔으면 시간순으로 정렬
      const messageData = response.data;
      console.log('과거메시지:' , messageData);
      setMessages(messageData.reverse());
    } catch (err) {
      console.error('과거 메시지 불러오기 실패:', err);
    }
  }

  fetchPastMessages();




    const accessToken = localStorage.getItem('AccessToken');
    if (!accessToken) return console.error('🚫 accessToken 없음. WebSocket 연결 불가.');

    const tokenWithoutBearer = accessToken.replace(/^Bearer\s/, ''); // "Bearer " 제거

    const stompClient = new Client({
      brokerURL: undefined,
      webSocketFactory: () =>
        new SockJS(`http://192.168.2.17:8080/ws?access_token=${tokenWithoutBearer}`), // websocket 사용시 URL
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
    });


    stompClient.onConnect = () => {
      console.log('✅ WebSocket connected');
      stompClient.subscribe(`/sub/chat/${moimId}`, (msg) => {
        const chatMessage = JSON.parse(msg.body);
        setMessages((prev) => [...prev, chatMessage]);
      });
    };

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => stompClient.deactivate();
  }, [moimId]);

  const sendMessage = () => {
    if (!input.trim()) return;
    if (!stompClientRef.current?.connected) return;

    const chatMessage = { chattingContent: input, moimId , chattedAt: new Date().toISOString()};
    console.log('보내는 메시지:', chatMessage);
    stompClientRef.current.publish({
      destination: `/pub/chat/${moimId}`,
      body: JSON.stringify(chatMessage),
    });

    setInput('');
  };
  

  return (
    <div css={s.ChatContainer}>
      

      <div css={s.MessageList}>
        {messages.map((msg, idx) => {
          const isCurrentUser = msg.userNickName === user; 
          return (
          <div key={idx} css={isCurrentUser ? s.MyMessageItem : s.OtherUserMessage}>
            <strong>{msg.userNickName}:</strong> {msg.chattingContent} {msg.chattedAt && <span css={s.Timestamp}>({new Date(msg.chattedAt).toLocaleTimeString()})</span>}
          </div>)
    })}
      </div>

      <div css={s.InputContainer}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요"
        />
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
}

export default ChattingPage;
