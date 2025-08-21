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

  useEffect(() => {
    async function fetchPastMessages() {
      try {
        const response = await reqGetMessages(moimIdNum, 0, 50);
        setMessages(response.data.reverse());
      } catch (err) {
        console.error('과거 메시지 불러오기 실패:', err);
      }
    }

    async function fetchMembers() {
      try {
        const response = await reqMoimUserList(moimIdNum);
        setMembers(response.data);
      } catch (err) {
        console.error('멤버 목록 가져오기 실패:', err);
      }
    }

    fetchPastMessages();
    fetchMembers();

    const accessToken = localStorage.getItem('AccessToken');
    if (!accessToken) return console.error('🚫 accessToken 없음.');

    const tokenWithoutBearer = accessToken.replace(/^Bearer\s/, '');
    const stompClient = new Client({
      brokerURL: undefined,
      webSocketFactory: () =>
        new SockJS(
          `http://192.168.2.17:8080/ws?access_token=${tokenWithoutBearer}&moimId=${moimIdNum}&userId=${userObj.userId}`
        ),
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
    });

    stompClient.connectHeaders = {
      moimId: moimIdNum.toString(),
      userId: userObj.userId.toString(),
    };

    stompClient.onConnect = () => {
      console.log('✅ WebSocket connected');

      // 채팅 메시지 구독
      stompClient.subscribe(`/sub/chat/${moimIdNum}`, (msg) => {
        const chatMessage = JSON.parse(msg.body);
        setMessages((prev) => [...prev, chatMessage]);
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      });

      // 온라인 유저 구독
      stompClient.subscribe(`/sub/chat/${moimIdNum}/online`, (msg) => {
        const onlineUserData = JSON.parse(msg.body);
        console.log('온라인 유저 데이터 수신:', onlineUserData);
        setOnlineUsers(onlineUserData.map(String));
      });
    };

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => stompClient.deactivate();
  }, [moimIdNum, userObj]);

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
      <div css={s.UserListContainer}>
        {members.map((member) => {
          let circleColor = 'gray'; // 기본 오프라인
          if (member.userId === userObj.userId) circleColor = 'red'; // 자기 자신
          else if (onlineUsers.includes(member.userId.toString())) circleColor = 'green'; // 온라인

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
              ></div>
            </div>
          );
        })}
      </div>

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
            onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
            placeholder="메시지를 입력하세요"
          />
          <button onClick={sendMessage}>전송</button>
        </div>
      </div>
    </div>
  );
}

export default ChattingPage;
