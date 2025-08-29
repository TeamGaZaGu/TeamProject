/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import ReactModal from 'react-modal';
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

  // 모달 관련 state
  const [modalImages, setModalImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!moimId || isNaN(moimIdNum)) return <div>올바른 채팅방 ID가 필요합니다.</div>;
  if (!userObj) return <div>사용자 정보를 가져오는 중...</div>;

  const openModal = (images) => {
    setModalImages(images);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImages([]);
  };

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

      const data = JSON.parse(text);
      return data.map(item => item.path);
    } catch (err) {
      console.error("이미지 업로드 실패:", err);
      return [];
    }
  };

  async function sendMessage() {
    if (!input.trim() && files.length === 0) return;

    const paths = await handleFileUpload(files);

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
    setFiles([]);
  }

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

                    {/* 이미지 표시: seq 1만 보여주고, 나머지는 클릭 시 모달 */}
                    {msg.images && msg.images.length > 0 && (
                      <>
                        <img
                          src={msg.images[0].path}
                          alt="chat-img"
                          style={{
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                            borderRadius: '6px',
                            marginTop: '4px',
                            cursor: msg.images.length > 1 ? 'pointer' : 'default'
                          }}
                          onClick={() => msg.images.length > 1 && openModal(msg.images)}
                        />
                        {msg.images.length > 1 && (
                          <div style={{ fontSize: '12px', color: '#555', marginTop: '2px' }}>
                            +{msg.images.length - 1} more
                          </div>
                        )}
                      </>
                    )}

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

      {/* 모달: 클릭 시 전체 이미지 확인 */}
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: { backgroundColor: 'rgba(0,0,0,0.6)' },
          content: { maxWidth: '600px', margin: 'auto', padding: '20px', borderRadius: '8px' }
        }}
      >
        <button onClick={closeModal} style={{ float: 'right' }}>닫기</button>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '40px' }}>
          {modalImages.map((img, i) => (
            <img
              key={i}
              src={img.path}
              alt="chat-img"
              style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '6px' }}
            />
          ))}
        </div>
      </ReactModal>
    </div>
  );
}

export default ChattingPage;
