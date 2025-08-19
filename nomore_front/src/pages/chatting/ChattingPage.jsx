import React, { useEffect, useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
/** @jsxImportSource @emotion/react */
import * as s from './styles';

function ChattingPage({ moimId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const stompClientRef = useRef(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('AccessToken');
if (!accessToken) return console.error('🚫 accessToken 없음. WebSocket 연결 불가.');

const tokenWithoutBearer = accessToken.replace(/^Bearer\s/, ''); // "Bearer " 제거

const stompClient = new Client({
  brokerURL: undefined,
  webSocketFactory: () =>
    new SockJS(`http://localhost:8080/ws?access_token=${tokenWithoutBearer}`),
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

    const chatMessage = { chattingContent: input, moimId };
    stompClientRef.current.publish({
      destination: `/pub/chat/${moimId}`,
      body: JSON.stringify(chatMessage),
    });

    setInput('');
  };

  return (
    <div css={s.ChatContainer}>
      <div css={s.MessageList}>
        {messages.map((msg, idx) => (
          <div key={idx} css={s.MessageItem}>
            <strong>{msg.userNickName}:</strong> {msg.chattingContent}
          </div>
        ))}
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
