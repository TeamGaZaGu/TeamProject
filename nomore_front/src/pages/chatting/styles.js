/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const PageContainer = css`
  display: flex;
  flex: 1;
  height: 80vh;
  width: 100%;
  max-width: 1200px;
  margin: 15px auto 0;
  border: 1px solid #9bbbd4;
  border-radius: 8px;
  overflow: hidden;
  background-color: skyblue;
`;

export const UserListContainer = css`
  width: 200px;
  background-color: #f9f9f9;
  border-right: 1px solid #ddd;
  overflow-y: auto;
  padding: 16px;
`;

export const UserItem = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
`;

export const UserProfileImage = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserDetails = css`
  display: flex;
  flex-direction: column;
`;

export const RoleTag = css`
  font-size: 12px;
  color: #555;
`;

export const ChatContainer = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const MessageList = css`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MyMessageWrapper = css`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
`;

export const OtherMessageWrapper = css`
  display: flex;
  align-items: flex-end;
  margin-bottom: 8px;
`;

export const MyMessageItem = css`
  align-self: flex-end;
  background-color: #fef01b;
  color: black;
  padding: 8px 12px;
  border-radius: 16px;
  max-width: 60%;
  flex-shrink: 0;    
  word-break: break-word;

  strong {
    display: none;
  }
`;

export const OtherUserMessage = css`
  align-self: flex-start;
  background-color: #ffffff;
  color: black;
  padding: 8px 12px;
  border-radius: 16px;
  max-width: 60%;
  flex-shrink: 0;
  word-break: break-word;
`;

export const SmallProfileImage = css`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 8px;
`;

export const Timestamp = css`
  font-size: 10px;
  color: #556677;
  margin-left: 4px;
`;

export const InputContainer = css`
  display: flex;
  padding: 8px;
  border-top: 1px solid #ddd;
  gap: 8px;
  background-color: #ffffff;

  input {
    flex: 1;
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid #ddd;
  }

  button {
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    background-color: #4f93ff;
    color: white;
    cursor: pointer;
  }
`;// 사용자 프로필 모달 관련 스타일
export const modalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const modalContent = css`
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

export const modalHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  
  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #111827;
  }
`;

export const modalHeaderButtons = css`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const modalBody = css`
  padding: 20px;
`;

export const userProfile = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const modalProfileImageLarge = css`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 16px;
  border: 3px solid #f3f4f6;
`;

export const userDetails = css`
  width: 100%;
`;

export const userNameRow = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 12px;
  
  h4 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: #111827;
  }
`;

export const userCategory = css`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  text-align: center;
`;

export const userIntroduction = css`
  margin: 0 0 16px 0;
  font-size: 14px;
  line-height: 1.5;
  padding: 12px;
  background-color: #f9fafb;
  border-radius: 8px;
  text-align: left;
`;

export const modalButtonContainer = css`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  justify-content: center;
  
  button {
    padding: 8px 16px;
    border: 1px solid #d1d5db;
    background-color: #ffffff;
    color: #374151;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: #f3f4f6;
      border-color: #9ca3af;
    }
  }
`;
// 신고 모달 오버레이
export const reportModalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 100px;
  z-index: 1001;
`;

// 신고 모달 컨텐츠
export const reportModalContent = css`
  background: white;
  border-radius: 12px;
  width: 400px;
  max-width: 90vw;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  animation: slideDown 0.3s ease-out;
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// 신고 모달 헤더
export const reportModalHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px 16px;
  border-bottom: 1px solid #f0f0f0;
  
  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }
`;

// 신고 모달 바디
export const reportModalBody = css`
  padding: 20px 24px 24px;
`;

// 신고 모달 설명
export const reportModalDescription = css`
  margin: 0 0 16px 0;
  color: #666;
  font-size: 14px;
  line-height: 1.4;
`;

// 신고 사유 목록
export const reasonList = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

// 신고 사유 아이템
export const reasonItem = css`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 8px 0;
  
  input[type="radio"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`;

// 신고 사유 텍스트
export const reasonText = css`
  font-size: 14px;
  color: #333;
  line-height: 1.4;
  cursor: pointer;
`;

// 기타 사유 입력창
export const customReasonInput = css`
  width: 100%;
  min-height: 80px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.4;
  resize: vertical;
  margin-bottom: 20px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
`;

// 신고 모달 푸터
export const reportModalFooter = css`
  display: flex;
  justify-content: flex-end;
`;

// 신고 제출 버튼
export const submitReportButton = css`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #c82333;
  }
  
  &:active {
    background-color: #bd2130;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
export const closeButton = css`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #6b7280;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #374151;
  }
`;

export const reportButton = css`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #ff4757;
  padding: 6px 12px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #ff475720;
  }
`;

export const DateSeparator = css`
  text-align: center;
  font-size: 12px;
  color: #888;
  margin: 12px 0;
`;