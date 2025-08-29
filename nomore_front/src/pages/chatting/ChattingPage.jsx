/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import ReactModal from 'react-modal';
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

  const [modalImages, setModalImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const principalQuery = usePrincipalQuery();
  const userObj = principalQuery?.data?.data?.user;

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
      stompClient.subscribe(`/sub/chat/${moimIdNum}`, (msg) => {
        const chatMessage = JSON.parse(msg.body);
        setMessages((prev) => [...prev, chatMessage]);
        if (chatMessage.userNickName === userObj.nickName) {
          messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
      });
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
    setTimeout(() => messageEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const findUserProfile = (nickName) => {
    const member = members.find((m) => m.nickName === nickName);
    return member ? member.profileImgPath : null;
  };

  const NextArrow = ({ onClick }) => (
    <div style={{ position: 'absolute', right: '10px', top: '50%', zIndex: 10, cursor: 'pointer', fontSize: '24px', color: 'black' }} onClick={onClick}>
      ▶
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div style={{ position: 'absolute', left: '10px', top: '50%', zIndex: 10, cursor: 'pointer', fontSize: '24px', color: '#black' }} onClick={onClick}>
      ◀
    </div>
  );

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
                <span css={s.RoleTag}>{member.moimRole === 'OWNER' ? '👑 방장' : '👤 멤버'}</span>
              </div>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: circleColor, marginLeft: 'auto' }} />
            </div>
          );
        })}
      </div>

      <div css={s.ChatContainer}>
        <div css={s.MessageList} ref={chatContainerRef} onScroll={handleScroll}>
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
                  {!isCurrentUser && <img src={findUserProfile(msg.userNickName)} alt="프로필" css={s.SmallProfileImage} />}
                  <div css={isCurrentUser ? s.MyMessageItem : s.OtherUserMessage}>
                    {msg.chattingContent}
                    {msg.images && msg.images.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                        {msg.images.map((img, i) => (
                          <img key={i} src={img.path} alt="chat-img" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '6px', cursor: 'pointer' }} onClick={() => openModal(msg.images)} />
                        ))}
                      </div>
                    )}
                    {msg.chattedAt && <span css={s.Timestamp}>{new Date(msg.chattedAt).toLocaleTimeString()}</span>}
                  </div>
                </div>
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
  <label htmlFor="imageUpload" style={{ cursor: 'pointer', padding: '0 12px', background: '#eee', borderRadius: '6px', marginLeft: '8px' }}>📷</label>
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
          chattingContent: '', // 텍스트 없이 이미지 전송
          moimId: moimIdNum,
          imagePaths: paths,
        };

        stompClientRef.current.publish({
          destination: `/pub/chat/${moimIdNum}`,
          body: JSON.stringify(chatMessage),
        });
      } catch (err) {
        console.error('이미지 전송 실패', err);
      } finally {
        e.target.value = ''; // 선택 초기화
      }
    }}
  />
  <button onClick={sendMessage}>전송</button>
</div>
      </div>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: { backgroundColor: 'rgba(0,0,0,0.6)' },
          content: { maxWidth: '600px', margin: 'auto', padding: '40px 20px 20px 20px', borderRadius: '8px', position: 'relative' }
        }}
      >
        <button onClick={closeModal} style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10, background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer' }}>❌</button>
        <Slider dots={true} infinite={false} speed={300} slidesToShow={1} slidesToScroll={1} nextArrow={<NextArrow />} prevArrow={<PrevArrow />}>
          {modalImages.map((img, i) => (
            <div key={i}>
              <img src={img.path} alt="chat-img" style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', margin: '0 auto', borderRadius: '6px' }} />
            </div>
          ))}
        </Slider>
      </ReactModal>
    </div>
  );
}

export default ChattingPage;