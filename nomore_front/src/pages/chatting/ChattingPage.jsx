/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import Slider from "react-slick";
import * as s from './styles';
import { reqGetMessages } from '../../api/chatApi';
import { reqMoimUserList } from '../../api/moimApi';
import usePrincipalQuery from '../../queries/usePrincipalQuery';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ChattingPage({ moimId }) {
  const moimIdNum = Number(moimId);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [files, setFiles] = useState([]);
  const [members, setMembers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const stompClientRef = useRef(null);
  const messageEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [page, setPage] = useState(0); 
  const [hasMore, setHasMore] = useState(true); 
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredMessageId, setHoveredMessageId] = useState(null);


  // Lightbox 관련 state
  const [lightboxImages, setLightboxImages] = useState([]);
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const principalQuery = usePrincipalQuery();
  const userObj = principalQuery?.data?.data?.user;

  if (!moimId || isNaN(moimIdNum)) return <div>올바른 채팅방 ID가 필요합니다.</div>;
  if (!userObj) return <div>사용자 정보를 가져오는 중...</div>;

  const openLightbox = (images, index = 0) => {
    setLightboxImages(images);
    setCurrentLightboxIndex(index);
    setIsLightboxOpen(true);
  };
  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setLightboxImages([]);
  };

  const handleScroll = async () => {
    if (!chatContainerRef.current || isLoading || !hasMore) return;
    if (chatContainerRef.current.scrollTop === 0) {
      setIsLoading(true);
      const nextPage = page + 1;
      try {
        const res = await reqGetMessages(moimIdNum, nextPage * 50, 50);
        if (res.data.length === 0) {
          setHasMore(false);
          setIsLoading(false);
          return;
        }
        const prevHeight = chatContainerRef.current.scrollHeight;
        setMessages(prev => [...res.data.reverse(), ...prev]);
        requestAnimationFrame(() => {
          const newHeight = chatContainerRef.current.scrollHeight;
          chatContainerRef.current.scrollTop = newHeight - prevHeight;
        });
        setPage(nextPage);
      } catch (err) {
        console.error('과거 메시지 불러오기 실패:', err);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function fetchInitial() {
      try {
        const res = await reqGetMessages(moimIdNum, 0, 50);
        setMessages(res.data.reverse());
        setTimeout(() => {
          messageEndRef.current?.scrollIntoView({ behavior: "auto" });
        }, 100);
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
    fetchInitial();
    fetchMembers();
  }, [moimIdNum]);

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
      reconnectDelay: 5000,
    });

    stompClient.onConnect = () => {
      console.log('✅ WebSocket connected');

      // 메시지 수신
      stompClient.subscribe(`/sub/chat/${moimIdNum}`, (msg) => {
        const chatMessage = JSON.parse(msg.body);
        setMessages(prev => [...prev, chatMessage]);
        if (chatMessage.userNickName === userObj.nickName) {
          setTimeout(() => {
            messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        }
      });

      // 삭제 이벤트 수신
      stompClient.subscribe(`/sub/chat/delete`, (msg) => {
        const deletedChatId = Number(msg.body);
        setMessages(prev => prev.filter(m => m.chatId !== deletedChatId));
      });

      // 온라인 상태
      stompClient.subscribe(`/sub/chat/${moimIdNum}/online`, (msg) => {
        const onlineData = JSON.parse(msg.body);
        setOnlineUsers(onlineData.map((id) => Number(id)));
      });
      stompClient.publish({ destination: `/pub/chat/${moimIdNum}/online` });
    };

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      stompClientRef.current.publish({
        destination: `/pub/chat/${moimIdNum}/${userObj.userId}/offline`,
      });
      stompClient.deactivate();
    };
  }, [moimIdNum, userObj.userId, userObj.nickName]);

  const handleFileUpload = async (fileList) => {
    if (!fileList || fileList.length === 0) return [];
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
  };

  const sendMessage = async () => {
    if (!input.trim() && files.length === 0) return;

    const paths = await handleFileUpload(files);
    const chatMessage = {
      chattingContent: input.trim(),
      moimId: moimIdNum,
      imagePaths: paths,
    };

    stompClientRef.current.publish({
      destination: `/pub/chat/${moimIdNum}`,
      body: JSON.stringify(chatMessage),
    });

    setInput('');
    setFiles([]);
    setTimeout(() => {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const deleteChat = async (chatId) => {
    try {
      await fetch(`http://localhost:8080/api/chat/${chatId}`, {
        method: 'DELETE',
        headers: { Authorization: localStorage.getItem('AccessToken') },
      });
      // WebSocket에서 삭제 이벤트 받으면 메시지 state에서 자동 제거
    } catch (err) {
      console.error('채팅 삭제 실패:', err);
    }
  };

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
                <span css={s.RoleTag}>{member.moimRole === 'OWNER' ? '👑 방장' : '👤 멤버'}</span>
              </div>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: circleColor, marginLeft: 'auto' }} />
            </div>
          );
        })}
      </div>

      {/* 채팅 영역 */}
      <div css={s.ChatContainer}>
        <div css={s.MessageList} ref={chatContainerRef} onScroll={handleScroll}>
          {messages.map((msg, idx) => {
            const isCurrentUser = msg.userNickName === userObj.nickName;
            const hasText = msg.chattingContent && msg.chattingContent.trim() !== '';
            const hasImages = msg.images && msg.images.length > 0;

            return (
              <div
                key={idx}
                style={{ marginBottom: '12px' }}
                onMouseEnter={() => setHoveredMessageId(msg.chatId)}
                onMouseLeave={() => setHoveredMessageId(null)}
              >
                {!isCurrentUser && (
                  <div style={{ fontSize: '12px', marginLeft: '32px', marginBottom: '2px', color: '#444' }}>
                    {msg.userNickName}
                  </div>
                )}

                <div css={isCurrentUser ? s.MyMessageWrapper : s.OtherMessageWrapper}>
                  {/* 마우스 올릴 때만 삭제 버튼 */}
                  {isCurrentUser && hoveredMessageId === msg.chatId && (
                    <button
                      onClick={() => deleteChat(msg.chatId)}
                      style={{ 
                        marginRight: '8px', 
                        cursor: 'pointer', 
                        fontSize: '12px', 
                        color: 'black',
                        backgroundColor:'transparent',
                        border:'none'
                      }}
                    >
                      삭제
                    </button>
                  )}
                  {!isCurrentUser && (
                    <img
                      src={findUserProfile(msg.userNickName)}
                      alt="프로필"
                      css={s.SmallProfileImage}
                    />
                  )}

                  {hasText && (
                    <div css={isCurrentUser ? s.MyMessageItem : s.OtherUserMessage}>
                      {msg.chattingContent}
                      {msg.chattedAt && (
                        <span css={s.Timestamp}>
                          {new Date(msg.chattedAt).toLocaleTimeString()}
                        </span>
                      )}
                    </div>
                  )}

                  {hasImages && (
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection:'row-reverse',
                        gap: '4px',
                        marginTop: hasText ? '6px' : '0',
                        maxWidth: 'calc(120px * 3 + 8px)',
                      }}
                    >
                      {msg.images.map((img, i) => (
                        <img
                          key={i}
                          src={img.path}
                          alt="chat-img"
                          style={{
                            width: '120px',
                            height: '120px',
                            objectFit: 'cover',
                            borderRadius: '6px',
                            cursor: 'pointer',
                          }}
                          onClick={() => openLightbox(msg.images, i)}
                        />
                      ))}
                    </div>
                  )}

                  
                </div>
              </div>
            );
          })}
          <div ref={messageEndRef}></div>
        </div>

        {/* 입력창 */}
        <div css={s.InputContainer}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="메시지를 입력하세요"
          />
          <label htmlFor="imageUpload" style={{ cursor: 'pointer', padding: '0 12px', background: '#eee', borderRadius: '6px', marginLeft: '8px' }}>파일</label>
          <input
            type="file"
            id="imageUpload"
            multiple
            style={{ display: 'none' }}
            onChange={async (e) => {
              const selectedFiles = Array.from(e.target.files);
              if (!selectedFiles.length) return;

              try {
                const paths = await handleFileUpload(selectedFiles);
                if (paths.length === 0) return;

                const chatMessage = {
                  chattingContent: '',
                  moimId: moimIdNum,
                  imagePaths: paths,
                };

                stompClientRef.current.publish({
                  destination: `/pub/chat/${moimIdNum}`,
                  body: JSON.stringify(chatMessage),
                });

                setTimeout(() => {
                  messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
                }, 50);

              } catch (err) {
                console.error('이미지 전송 실패', err);
              } finally {
                e.target.value = '';
              }
            }}
          />
          <button onClick={sendMessage}>전송</button>
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
          onClick={closeLightbox}
        >
          <div
            style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%' }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImages[currentLightboxIndex].path}
              alt="lightbox-img"
              style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px' }}
            />
            <button
              onClick={closeLightbox}
              style={{
                position: 'fixed',
                top: '5%',
                right: '5%',
                fontSize: '32px',
                background: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              ❌
            </button>
            {lightboxImages.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentLightboxIndex((prev) =>
                      prev === 0 ? lightboxImages.length - 1 : prev - 1
                    )
                  }
                  style={{
                      position: 'fixed',
                      top: '50%',
                      left: '5%',
                      transform: 'translateY(-50%)',
                      fontSize: '48px',
                      background: 'transparent',
                      border: 'none',
                      color: 'white',
                      cursor: 'pointer',
                    }}
                >
                  ◀
                </button>
                 <button
                    onClick={() =>
                      setCurrentLightboxIndex((prev) =>
                        prev === lightboxImages.length - 1 ? 0 : prev + 1
                      )
                    }
                    style={{
                      position: 'fixed',
                      top: '50%',
                      right: '5%',
                      transform: 'translateY(-50%)',
                      fontSize: '48px',
                      background: 'transparent',
                      border: 'none',
                      color: 'white',
                      cursor: 'pointer',
                    }}
                  >
                  ▶
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ChattingPage;
