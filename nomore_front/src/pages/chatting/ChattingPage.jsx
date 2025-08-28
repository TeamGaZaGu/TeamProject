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
  const [files, setFiles] = useState([]);
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
        const res = await reqGetMessages(moimIdNum, 0, 150);
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
      webSocketFactory: () =>
        new SockJS(
          `http://192.168.2.17:8080/ws?access_token=${localStorage.getItem(
            'AccessToken'
          )}&moimId=${moimIdNum}&userId=${userObj.userId}`
        ),
      connectHeaders: {
        moimId: moimIdNum,
        userId: userObj.userId,
      },
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
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
      });

      // 온라인 등록
      stompClientRef.current.publish({
        destination: `/pub/chat/${moimIdNum}/online`,
      });
    };

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      // 오프라인 등록
      stompClientRef.current.publish({
        destination: `/pub/chat/${moimIdNum}/${userObj.userId}/offline`,
      });
      stompClient.deactivate();
    };
  }, [moimIdNum, userObj.userId]);

  // 자동 스크롤
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 메시지 전송
const handleFileUpload = async (fileList) => {
  if (!fileList || fileList.length === 0) return [];

  const formData = new FormData();
  fileList.forEach((file) => formData.append("files", file));
  const token = localStorage.getItem("AccessToken");

  try {
    const token = localStorage.getItem("AccessToken");
    const res = await fetch(`http://localhost:8080/api/chat/${moimIdNum}/upload`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    });

    if (!res.ok) throw new Error("업로드 실패");

    const text = await res.text();
    if (!text) return [];

    const data = JSON.parse(text); // 서버에서 받은 JSON
    return data.map(item => item.path); // 업로드된 이미지 경로 배열 반환
  } catch (err) {
    console.error("이미지 업로드 실패:", err);
    return [];
  }
};

// 2️⃣ sendMessage 수정
async function sendMessage() {
  if (!input.trim() && files.length === 0) return;

  // 1️⃣ 이미지 업로드
  const paths = await handleFileUpload(files);

  // 2️⃣ WebSocket으로 메시지 전송
  const chatMessage = {
    chattingContent: input,
    moimId: moimIdNum,
    imagePaths: paths,
  };

  stompClientRef.current.publish({
    destination: `/pub/chat/${moimIdNum}`,
    body: JSON.stringify(chatMessage),
  });

  setInput('');
  setFiles([]); // 업로드 후 초기화
}

  // 유저 프로필 찾기
  const findUserProfile = (nickName) => {
    const member = members.find((m) => m.nickName === nickName);
    return member ? member.profileImgPath : null;
  };

  return (
    <div css={s.PageContainer}>
      {/* 유저 리스트 */}
      <div css={s.UserListContainer}>
        {members.map((member) => {
          const isMe = member.userId === userObj.userId;
          const isOnline = onlineUsers.includes(member.userId);
          const circleColor = isMe ? 'blue' : isOnline ? 'green' : 'gray';

          return (
            <div key={member.userId} css={s.UserItem}>
              <img src={member.profileImgPath} alt="프로필" css={s.UserProfileImage} />
              <div css={s.UserDetails}>
                <span>{member.nickName}</span>
                <span css={s.RoleTag}>
                  {member.moimRole === 'OWNER' ? '👑 방장' : '👤 멤버'}
                </span>
              </div>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: circleColor,
                  marginLeft: 'auto',
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
              <div key={idx} style={{ marginBottom: '12px' }}>
                {!isCurrentUser && (
                  <div style={{ fontSize: '12px', marginLeft: '32px', marginBottom: '2px', color: '#444' }}>
                    {msg.userNickName}
                  </div>
                )}
                <div css={isCurrentUser ? s.MyMessageWrapper : s.OtherMessageWrapper}>
                  {!isCurrentUser && (
                    <img src={findUserProfile(msg.userNickName)} alt="프로필" css={s.SmallProfileImage} />
                  )}
                  <div css={isCurrentUser ? s.MyMessageItem : s.OtherUserMessage}>
                    {msg.chattingContent}
                    {msg.images && msg.images.map((img, i) => (
                      <img key={i} src={img.path} alt="chat-img" style={{ maxWidth: '150px', marginTop: '4px' }} />
                    ))}
                    {msg.chattedAt && (
                      <span css={s.Timestamp}>{new Date(msg.chattedAt).toLocaleTimeString()}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messageEndRef}></div>
        </div>

        {/* 입력 영역 */}
        <div css={s.InputContainer}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="메시지를 입력하세요"
          />
          <input
            type="file"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files))}
          />
          <button onClick={sendMessage}>전송</button>
        </div>
      </div>
    </div>
  );
}

export default ChattingPage;
