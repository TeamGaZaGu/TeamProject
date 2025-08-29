/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useRef, useCallback } from 'react';
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

  const scrollToBottom = useCallback(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleFileUpload = useCallback(async (fileList) => {
    if (!fileList?.length) return [];

    const formData = new FormData();
    fileList.forEach((file) => formData.append("files", file));

    try {
      const token = localStorage.getItem("AccessToken");
      const res = await fetch(`http://localhost:8080/api/chat/${moimIdNum}/upload`, {
        method: "POST",
        headers: { Authorization: token },
        body: formData,
      });

      if (!res.ok) throw new Error("업로드 실패");

      const text = await res.text();
      if (!text) return [];

      const data = JSON.parse(text);
      return data.map(item => item.path);
    } catch (err) {
      console.error("이미지 업로드 실패:", err);
      return [];
    }
  }, [moimIdNum]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() && !files.length) return;

    const paths = await handleFileUpload(files);
    const chatMessage = {
      chattingContent: input,
      moimId: moimIdNum,
      imagePaths: paths,
    };

    stompClientRef.current?.publish({
      destination: `/pub/chat/${moimIdNum}`,
      body: JSON.stringify(chatMessage),
    });

    setInput('');
    setFiles([]);
  }, [input, files, moimIdNum, handleFileUpload]);

  const findUserProfile = useCallback((nickName) => {
    return members.find((m) => m.nickName === nickName)?.profileImgPath;
  }, [members]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [messagesRes, membersRes] = await Promise.all([
          reqGetMessages(moimIdNum, 0, 150),
          reqMoimUserList(moimIdNum)
        ]);
        setMessages(messagesRes.data.reverse());
        setMembers(membersRes.data);
      } catch (err) {
        console.error('데이터 로딩 실패:', err);
      }
    };

    fetchData();
  }, [moimIdNum]);

  useEffect(() => {
    if (!userObj) return;

    const stompClient = new Client({
      brokerURL: undefined,
      webSocketFactory: () =>
        new SockJS(
          `http://192.168.2.17:8080/ws?access_token=${localStorage.getItem('AccessToken')}&moimId=${moimIdNum}&userId=${userObj.userId}`
        ),
      connectHeaders: {
        moimId: moimIdNum,
        userId: userObj.userId,
      },
      reconnectDelay: 5000,
    });

    stompClient.onConnect = () => {
      stompClient.subscribe(`/sub/chat/${moimIdNum}`, (msg) => {
        const chatMessage = JSON.parse(msg.body);
        setMessages((prev) => [...prev, chatMessage]);
        scrollToBottom();
      });

      stompClient.subscribe(`/sub/chat/${moimIdNum}/online`, (msg) => {
        const onlineData = JSON.parse(msg.body);
        setOnlineUsers(onlineData.map((id) => Number(id)));
      });

      stompClientRef.current?.publish({
        destination: `/pub/chat/${moimIdNum}/online`,
      });
    };

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      stompClientRef.current?.publish({
        destination: `/pub/chat/${moimIdNum}/${userObj.userId}/offline`,
      });
      stompClient.deactivate();
    };
  }, [moimIdNum, userObj, scrollToBottom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  if (!moimId || isNaN(moimIdNum)) {
    return <div>올바른 채팅방 ID가 필요합니다.</div>;
  }

  if (!userObj) {
    return <div>사용자 정보를 가져오는 중...</div>;
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  return (
    <div css={s.PageContainer}>
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
                    {msg.images?.map((img, i) => (
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
          <div ref={messageEndRef} />
        </div>

        <div css={s.InputContainer}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="메시지를 입력하세요"
          />
          <input
            type="file"
            multiple
            onChange={handleFileChange}
          />
          <button onClick={sendMessage}>전송</button>
        </div>
      </div>
    </div>
  );
}

export default ChattingPage;