/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import * as s from './styles';
import { reqGetMessages } from '../../api/chatApi';
import { reqMoimUserList } from '../../api/moimApi';
import usePrincipalQuery from '../../queries/usePrincipalQuery';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdReport } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import useCategoryQuery from '../../queries/useCategoryQuery';
import useUserBlockListQuery from '../../queries/useUserBlockListQuery';

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
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const categoryQuery = useCategoryQuery();
  const categories = categoryQuery?.data?.data || [];
  const [hoveredMessageId, setHoveredMessageId] = useState(null);

  // Lightbox 관련 state
  const [lightboxImages, setLightboxImages] = useState([]);
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);   
  
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [reportTargetType, setReportTargetType] = useState(3);
  const [reportTargetId, setReportTargetId] = useState(null);

  const principalQuery = usePrincipalQuery();
  const userObj = principalQuery?.data?.data?.user;
  const userBlockListQuery = useUserBlockListQuery(userObj?.userId);
  const userBlockList = userBlockListQuery?.data?.data?.body; 
  const isBlockedUser = userBlockList?.includes(selectedUser?.userId);

  // // 🔹 읽음 기능 state (메시지별 읽은 유저 목록)
  // const [readUsersMap, setReadUsersMap] = useState({}); 
  // // 예: { 101: [3, 5], 102: [1, 3, 5] }

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

  const handleOpenUserModal = (member) => {
    setSelectedUser(member);
    setIsUserModalOpen(true);
  }
  const handleCloseUserModal = () => {
    setIsUserModalOpen(false);
    setSelectedUser(null);
  }    
  const handleModalBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseUserModal();
    }
  }
  const handleReportUserOnClick = () => {
    setReportTargetType(1);
    setReportTargetId(selectedUser.userId);
    setIsReportModalOpen(true);
  }
  const handleCloseReportModal = () => {
    setIsReportModalOpen(false);
    setSelectedReason('');
    setCustomReason('');
    setReportTargetType(3);
    setReportTargetId(null);
  }

  const reportReasons = [
    '스팸 / 광고성 활동',
    '욕설 / 비방 / 혐오 발언',
    '음란물 / 불건전한 내용',
    '사기 / 도용 / 사칭',
    '불법 행위 (범죄, 불법거래 등)',
    '기타'
  ];
  const handleSubmitReport = async () => {
    if (!selectedReason) return alert('신고 사유를 선택해주세요.');
    if (selectedReason === '기타' && !customReason.trim()) return alert('기타 사유를 입력해주세요.');

    try {
      const reportData = {
        userId,
        targetType: reportTargetType,
        targetId: reportTargetId,
        reason: selectedReason === '기타' ? customReason : selectedReason
      };
      await submitReport(reportData);
      toast.success('신고가 접수되었습니다');
      handleCloseReportModal();
    } catch (error) {
      console.error('신고 제출 실패:', error);
      toast.error('신고 제출에 실패했습니다.');
    }
  }

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

  const handleToggleUserBlock = async (targetUserId, nickName) => {
    const action = isBlockedUser ? '차단해제' : '차단';
    const isConfirmed = window.confirm(`"${nickName}" 님을 ${action}하시겠습니까?`);
    if (!isConfirmed) return;

    try {
      if (isBlockedUser) await reqUserUnBlock(targetUserId);
      else await reqUserBlock(targetUserId);
      await queryClient.invalidateQueries(['userBlockList', userObj.userId]);
    } catch (error) {
      console.log(`사용자 ${action} 실패:`, error);
      alert(`${action}에 실패했습니다. 다시 시도해주세요.`);
    }
  }

  useEffect(() => {
  const interval = setInterval(async () => {
    try {
      const res = await reqGetMessages(moimIdNum, 0, 50);
      const serverMessages = res.data.reverse();

      // 클라이언트 메시지 상태와 비교해서 갱신
      setMessages(prev => {
        // 메시지가 갯수나 내용이 다르면 업데이트
        if (JSON.stringify(prev) !== JSON.stringify(serverMessages)) {
          return serverMessages;
        }
        return prev;
      });
    } catch (err) {
      console.error("메시지 리패치 실패:", err);
    }
  }, 5000); // 🔹 5초마다 최신화

  return () => clearInterval(interval);
}, [moimIdNum]);

    // 🔹 초기 메시지 불러오기
  useEffect(() => {
  async function fetchInitial() {
    try {
      const res = await reqGetMessages(moimIdNum, 0, 50);
      const messages = res.data.reverse();
      setMessages(messages);

      // 🔹 각 메시지에 대해 현재 사용자 읽음 처리
      messages.forEach(msg => {
        stompClientRef.current?.publish({
          destination: `/pub/chat/${moimIdNum}/read`,
          body: JSON.stringify({ chatId: msg.chatId, userId: userObj.userId }),
        });
      });

      setTimeout(() => messageEndRef.current?.scrollIntoView({ behavior: 'auto' }), 100);
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
  }, [moimId]);

useEffect(() => {
  if (!stompClientRef.current) return;

  // ✅ WebSocket 구독 (실시간 반영)
  const subscription = stompClientRef.current.subscribe(
    `/sub/chat/${moimIdNum}/online`,
    (msg) => {
      const onlineData = JSON.parse(msg.body); // [ "1", "2", "3" ] 이런 식
      setOnlineUsers(onlineData.map((id) => Number(id)));
    }
  );

  // ✅ Polling 보강 (5초마다 REST API 요청)
  const interval = setInterval(async () => {
    try {
      const res = await api.get(`/api/chat/${moimIdNum}/onlineUsers`);
      setOnlineUsers(res.data);
    } catch (err) {
      console.error("온라인 유저 리스트 가져오기 실패:", err);
    }
  }, 5000);

  return () => {
    subscription.unsubscribe();
    clearInterval(interval);
  };
}, [moimIdNum]);

  useEffect(() => {
  const interval = setInterval(async () => {
    try {
      const res = await api.get(`/api/chat/${moimId}/users`); 
      setOnlineUsers(res.data); 
    } catch (err) {
      console.error("유저 리스트 리패치 실패:", err);
    }
  }, 5000);

  return () => clearInterval(interval);
}, [moimId]);
// 🔹 WebSocket 연결 및 읽음 처리
// 🔹 WebSocket 연결 및 읽음 처리 (initRead 포함)
useEffect(() => {
  if (!members.length) return; // 멤버 정보 없으면 skip

  const stompClient = new Client({
    brokerURL: undefined,
    webSocketFactory: () =>
      new SockJS(
        `http://192.168.2.17:8080/ws?access_token=${localStorage.getItem('AccessToken')}&moimId=${moimIdNum}&userId=${userObj.userId}`
      ),
    connectHeaders: { moimId: moimIdNum, userId: userObj.userId },
    reconnectDelay: 5000,
  });

  stompClient.onConnect = () => {
    console.log('✅ WebSocket connected');

  

    

    // 🔹 채팅 수신
  stompClient.subscribe(`/sub/chat/${moimIdNum}`, (msg) => {
  const chatMessage = JSON.parse(msg.body);
  chatMessage.readUsers = chatMessage.readUsers || []; // 🔹 추가
  setMessages(prev => [...prev, chatMessage]);

  // 본인이 읽음 표시
  stompClient.publish({
    destination: `/pub/chat/${moimIdNum}/read`,
    body: JSON.stringify({ chatId: chatMessage.chatId, userId: userObj.userId }),
  });

  setTimeout(() => messageEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
});
  // 🔹 읽음 이벤트 수신
stompClient.subscribe(`/sub/chat/${moimIdNum}/read`, (msg) => {
  const { chatId, readUserId } = JSON.parse(msg.body); // 🔹 readUsers -> readUserId
  setMessages(prev =>
    prev.map(m => {
      if (m.chatId === chatId) {
        const readUsers = m.readUsers || [];
        if (!readUsers.includes(readUserId)) readUsers.push(readUserId);
        return { ...m, readUsers }; // 🔹 readUsers 업데이트
      }
      return m;
    })
  );
});
    // 🔹 삭제 이벤트
    stompClient.subscribe(`/sub/chat/delete`, (msg) => {
      const deletedChat = JSON.parse(msg.body);
      setMessages(prev =>
        prev.map(m => (m.chatId === deletedChat.chatId ? { ...m, ...deletedChat } : m))
      );
    });

    // 🔹 온라인 상태
    stompClient.subscribe(`/sub/chat/${moimIdNum}/online`, (msg) => {
      const onlineData = JSON.parse(msg.body);
      setOnlineUsers(onlineData.map(id => Number(id)));
    });

    // 🔹 ✅ 초기 메시지 read 처리 (initRead)
    stompClient.publish({
      destination: `/pub/chat/${moimIdNum}/initRead`,
      headers: { userId: userObj.userId },
    });

    // 🔹 온라인 상태 브로드캐스트
    stompClient.publish({ destination: `/pub/chat/${moimIdNum}/online` });
  };

  stompClient.activate();
  stompClientRef.current = stompClient;

  return () => {
    try {
      stompClientRef.current?.publish({
        destination: `/pub/chat/${moimIdNum}/${userObj.userId}/offline`,
      });
    } catch {}
    stompClient.deactivate();
  };
}, [moimIdNum, userObj.userId, members]);

// 2️⃣ 기존 메시지 초기 읽음 처리
// useEffect(() => {
//   if (!stompClientRef.current || messages.length === 0) return;

//   messages.forEach(msg => {
//     if (msg.chatId && msg.unreadCount === undefined) {
//       try {
//         stompClientRef.current.publish({
//           destination: `/pub/chat/${moimIdNum}/read`,
//           body: JSON.stringify({ chatId: msg.chatId, userId: userObj.userId }),
//         });
//       } catch (e) {
//         console.error('초기 메시지 읽음 publish 실패:', e);
//       }
//     }
//   });
// }, [messages, moimIdNum, userObj.userId]);


  const handleFileUpload = async (fileList) => {
    if (!fileList || fileList.length === 0) return [];
    const formData = new FormData();
    fileList.forEach((file) => formData.append("files", file));
    try {
      const token = localStorage.getItem("AccessToken");
      const res = await fetch(`http://192.168.2.17:8080/api/chat/${moimIdNum}/upload`, {
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
      await fetch(`http://192.168.2.17:8080/api/chat/${chatId}`, {
        method: 'DELETE',
        headers: { Authorization: localStorage.getItem('AccessToken') },
      });
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
              <img 
                src={member.profileImgPath} 
                alt="프로필"
                css={s.UserProfileImage}
                onClick={() => handleOpenUserModal(member)}
                style={{cursor: 'pointer'}}
              />
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
          const prevMsg = idx > 0 ? messages[idx - 1] : null;
          const formatDate = (dateString) => {
          const date = new Date(dateString);
          const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 2자리
          const day = String(date.getDate()).padStart(2, '0'); // 일 2자리
          return `${month}월 ${day}일`;
        };

        
// map 안에서 사용
const currentDate = formatDate(msg.chattedAt);
const prevDate = prevMsg ? formatDate(prevMsg.chattedAt) : null;
  const showProfileAndName =
    !isCurrentUser &&
    (!prevMsg || prevMsg.userNickName !== msg.userNickName);

  // 🔹 읽음 수 계산
const unreadCount = (members?.length || 0) - (msg.readUsers?.length || 0); 
  return (
    <div
      key={msg.chatId}
      style={{ marginBottom: '12px' }}
      onClick={() =>
        setHoveredMessageId(prev => (prev === msg.chatId ? null : msg.chatId))
      }
          >
            {currentDate !== prevDate && (
        <div css={s.DateSeparator}>
          {currentDate}
        </div>
      )}
      {showProfileAndName && (
        <div style={{ fontSize: '12px',  marginBottom: '2px', color: '#444', display: 'flex', alignItems: 'center', gap: 6 }}>
          <img
            src={findUserProfile(msg.userNickName) || '/default-profile.png'}
            alt="프로필"
            style={{ width:'32px', height:'32px', borderRadius:'50%' }}
          />
          <span>{msg.userNickName}</span>
        </div>
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: isCurrentUser ? 'row-reverse' : 'row',
          alignItems: 'flex-end',
          marginBottom: '12px',
          gap: '8px', // 버튼과 메시지 사이 간격
        }}
      >
        

        {/* 메시지 내용 */}
        {msg.deleted ? (
          <div css={isCurrentUser ? s.MyMessageItem : s.OtherUserMessage}>삭제된 메시지입니다.</div>
        ) : (
          <div css={isCurrentUser ? s.MyMessageItem : s.OtherUserMessage}
          style={{
                  backgroundColor: hasText ? (isCurrentUser ? '#fef01b' : '#ffffff') : 'transparent'
                }}>
            {hasText && msg.chattingContent}
            {hasImages && (
              <div
                style={{
                  display: 'flex',
                  backgroundColor:'transparent',
                  flexWrap: 'wrap',
                  flexDirection: 'row-reverse',
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
        )}
        {/* 삭제 버튼 */}
        {isCurrentUser && hoveredMessageId === msg.chatId && !msg.deleted && (
          <button
            onClick={() => deleteChat(msg.chatId)}
            style={{
              cursor: 'pointer',
              fontSize: '12px',
              color: 'black',
              backgroundColor: 'transparent',
              border: 'none',
            }}
          >
            삭제
          </button>
        )}

                      {/* 🔹 시간 + 읽음 수 (측면 표시, 삭제 메시지 제외) */}
                      {!msg.deleted && (
  <div style={{
    display: 'flex',
    flexDirection: isCurrentUser ? 'row-reverse' : 'row',
    alignItems: 'center',
    gap: '6px',
    fontSize: '10px',
    color: '#666',
    marginTop: '2px',
  }}>
    {unreadCount > 0 && (
      <span style={{ fontWeight: 'bold', color: 'red' }}>{unreadCount}</span>
    )}
    {msg.chattedAt && (
      <span>
        {new Date(msg.chattedAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </span>
    )}
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
          <label htmlFor="imageUpload" 
            style={{ 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '0 12px',
              background: '#eee',
              borderRadius: '6px',
              marginLeft: '8px',
            }}
          >
            파일
          </label>
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
      

      {isUserModalOpen && selectedUser && (
        <div css={s.modalOverlay} onClick={handleModalBackdropClick}>
          <div css={s.modalContent}>
            <div css={s.modalHeader}>
              <h3>사용자 프로필</h3>
              <div css={s.modalHeaderButtons}>
                <button css={s.reportButton} onClick={handleReportUserOnClick}>
                  <MdReport />
                </button>
                <button css={s.closeButton} onClick={handleCloseUserModal}>
                  <IoClose />
                </button>
              </div>
            </div>
            <div css={s.modalBody}>
              <div css={s.userProfile}>
                <img
                  src={`${selectedUser.profileImgPath}`}
                  alt="프로필"
                  css={s.modalProfileImageLarge}
                />
                <div css={s.userDetails}>
                  <div css={s.userNameRow}>
                    <h4>{selectedUser.nickName}</h4>
                    {selectedUser.birthDate && <div>{selectedUser.birthDate}</div>}
                  </div>
                  <div css={s.userCategory}>
                    {categories?.find(category => category.categoryId === selectedUser.categoryId)?.categoryEmoji}
                    {categories?.find(category => category.categoryId === selectedUser.categoryId)?.categoryName}
                  </div>
                  {selectedUser.introduction && (
                    <p css={s.userIntroduction}>{selectedUser.introduction}</p>
                  )}
                  <div css={s.modalButtonContainer}>
                    <button onClick={() => handleToggleUserBlock(selectedUser.userId, selectedUser.nickName)}>
                      {isBlockedUser ? '차단 해제' : '차단하기'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isReportModalOpen && (
        <div css={s.reportModalOverlay} onClick={(e) => e.target === e.currentTarget && handleCloseReportModal()}>
          <div css={s.reportModalContent}>
            <div css={s.reportModalHeader}>
              <h3>
                {reportTargetType === 3 ? '게시글 신고' : 
                 reportTargetType === 4 ? '댓글 신고' : '사용자 신고'}
              </h3>
              <button css={s.closeButton} onClick={handleCloseReportModal}>
                <IoClose />
              </button>
            </div>
            <div css={s.reportModalBody}>
              <p css={s.reportModalDescription}>신고 사유를 선택해주세요:</p>
              <div css={s.reasonList}>
                {reportReasons.map((reason, index) => (
                  <label key={index} css={s.reasonItem}>
                    <input
                      type="radio"
                      name="reportReason"
                      value={reason}
                      checked={selectedReason === reason}
                      onChange={() => setSelectedReason(reason)}
                    />
                    <span css={s.reasonText}>{reason}</span>
                  </label>
                ))}
              </div>
              {selectedReason === '기타' && (
                <textarea
                  css={s.customReasonInput}
                  placeholder="기타 사유를 입력해주세요..."
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  maxLength={200}
                />
              )}
              <div css={s.reportModalFooter}>
                <button css={s.submitReportButton} onClick={handleSubmitReport}>
                  신고하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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