/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import * as s from './styles';
import { reqGetMessages } from '../../api/chatApi';
import { reqMoimUserList } from '../../api/moimApi';
import usePrincipalQuery from '../../queries/usePrincipalQuery';

function ChattingPage({ moimId }) {
  const moimIdNum = Number(moimId);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [members, setMembers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const stompClientRef = useRef(null);
  const messageEndRef = useRef(null);
  const principalQuery = usePrincipalQuery();
  const userObj = principalQuery?.data?.data?.user;

  if (!moimId || isNaN(moimIdNum)) return <div>올바른 채팅방 ID가 필요합니다.</div>;
  if (!userObj) return <div>사용자 정보를 가져오는 중...</div>;

  // 과거 메시지 & 멤버 가져오기
  useEffect(() => {
    async function fetchPastMessages() {
      try {
        const res = await reqGetMessages(moimIdNum, 0, 50);
        setMessages(res.data.reverse());
      } catch (err) {
        console.error('과거 메시지 불러오기 실패:', err);
      }
    }

    async function fetchMembers() {
      try {
        const res = await reqMoimUserList(moimIdNum);
        setMembers(res.data);
      } catch (err) {
        console.error('멤버 목록 가져오기 실패:', err);
      }
    }

    fetchPastMessages();
    fetchMembers();
  }, [moimIdNum]);

  // WebSocket 연결
  useEffect(() => {
    const stompClient = new Client({
      brokerURL: undefined,
      webSocketFactory: () => new SockJS(`http://192.168.2.17:8080/ws`),
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      connectHeaders: {
        moimId: moimIdNum.toString(),
        userId: userObj.userId.toString(),
      },
    });

    stompClient.onConnect = () => {
      console.log('✅ WebSocket connected');

      // 메시지 구독
      stompClient.subscribe(`/sub/chat/${moimIdNum}`, (msg) => {
        const chatMessage = JSON.parse(msg.body);
        setMessages((prev) => [...prev, chatMessage]);
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      });

      // 온라인 유저 구독
      stompClient.subscribe(`/sub/chat/${moimIdNum}/online`, (msg) => {
        const onlineData = JSON.parse(msg.body);
        setOnlineUsers(onlineData.map((id) => Number(id)));
        console.log('온라인 유저:', onlineData);
      });

      stompClientRef.current.publish({
        destination: `/pub/chat/${moimIdNum}/online`});
    };

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      stompClientRef.current.publish({
        destination: `/pub/chat/${moimIdNum}/${userObj.userId}/offline`});
      // 이후 연결 종료
      stompClient.deactivate();
      stompClientRef.current.publish({
        destination: `/pub/chat/${moimIdNum}/online`});
    };
  }, [moimIdNum, userObj.userId]);

  // 메시지 자동 스크롤
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || !stompClientRef.current?.connected) return;

    const chatMessage = {
      chattingContent: input,
      moimId: moimIdNum,
      chattedAt: new Date().toISOString(),
    };

    stompClientRef.current.publish({
      destination: `/pub/chat/${moimIdNum}`,
      body: JSON.stringify(chatMessage),
    });

    setInput('');
  };

  return (
    <div css={s.PageContainer}>
      {/* 유저 리스트 */}
      <div css={s.UserListContainer}>
        {members.map((member) => {
          const isMe = member.userId === userObj.userId;
          const isOnline = onlineUsers.includes(member.userId);
          const circleColor = isMe ? 'red' : isOnline ? 'green' : 'gray';

          return (
            <div key={member.userId} css={s.UserItem}>
              <img src={member.profileImg} alt="프로필" css={s.UserProfileImage} />
              <div css={s.UserDetails}>
                <span>{member.nickName}</span>
                <span css={s.RoleTag}>
                  {member.moimRole === 'OWNER' ? '👑 방장' : '👤 멤버'}
                </span>
              </div>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: circleColor,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* 채팅 영역 */}
      <div css={s.ChatContainer}>
        <div css={s.MessageList}>
          {messages.map((msg, idx) => {
            const isCurrentUser = msg.userNickName === userObj.nickName;
            return (
              <div key={idx} css={isCurrentUser ? s.MyMessageItem : s.OtherUserMessage}>
                <strong>{msg.userNickName}:</strong> {msg.chattingContent}
                {msg.chattedAt && (
                  <span css={s.Timestamp}>
                    ({new Date(msg.chattedAt).toLocaleTimeString()})
                  </span>
                )}
              </div>
            );
          })}
          <div ref={messageEndRef}></div>
        </div>

        <div css={s.InputContainer}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="메시지를 입력하세요"
          />
          <button onClick={sendMessage}>전송</button>
        </div>
      </div>
    </div>
  );
}

export default ChattingPage;
