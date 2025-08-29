import { css } from "@emotion/react";

export const forumCard = css`
  background: #fff;
  padding: 16px;
  min-height: 100vh;
  border-bottom: 1px solid #e5e7eb;
  font-family: "Noto Sans KR", sans-serif;
`;

export const forumHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const left = css`
  display: flex;
  align-items: center;
`;

export const modalProfileImage = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
`;

export const userInfo = css`
  display: flex;
  flex-direction: column;
  height: 40px;
`;

export const h3Tag = css`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: #111827;
`;

export const postMeta = css`
  margin: 2px 0;
  font-size: 12px;
  color: #6b7280;
`;

export const buttonWrapper = css`
  display: flex;
  gap: 8px; 
  margin-top: 8px;
`;

export const actionButton = css`
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;

  &:hover {
    transform: translateY(-1px);
  }
`;

export const editButton = css`
  ${actionButton};
  background-color: #3b82f6;
  color: white;

  &:hover {
    background-color: #2563eb;
  }
`;

export const deleteButton = css`
  ${actionButton};
  background-color: #ef4444;
  color: white;

  &:hover {
    background-color: #dc2626;
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

export const forumBody = css`
  margin: 16px 0;
`;

export const forumTitle = css`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
`;

export const forumContent = css`
  font-size: 14px;
  line-height: 1.6;
  color: #374151;
  white-space: pre-line;
`;

export const forumFooter = css`
  display: flex;
  gap: 20px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #f3f4f6;

  p {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #4b5563;
    cursor: pointer;

    svg {
      margin-right: 6px;
      font-size: 18px;
    }
  }
`;

export const comments = css`
  margin-top: 16px;
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  min-height: 365px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const commentList = css`
  flex: 1;
  margin-bottom: 12px;
  overflow-y: unset; 
`;

export const commentRow = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f3f4f6;
`;

export const commentItem = css`
  display: flex;
  align-items: center;
`;

export const subCommentItem = css`
  display: flex;
  align-items: center;
  margin-left: 5rem;
`;

export const commentProfileImage = css`
  display: flex;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const commentBody = css`
  background: white;
  margin-left: 5px;
  border-radius: 8px;
  padding: 1px 30px;
  max-width: 80%;
`;

export const commentAuthor = css`
  font-size: 16px;
  font-weight: 600;
  margin: 2px 0;
  color: #111827;
  transition: color 0.2s ease;

  &:hover {
    color: #3b82f6;
  }
`;

export const commentText = css`
  font-size: 13px;
  line-height: 1.5;
  margin: 4px 0;
  color: #374151;
`;

export const commentActions = css`
  display: flex;
  gap: 12px;
  margin: 6px 0;
`;

export const tagText = css`
  margin-right: 0.5rem;
  color: #3aa3ff;
  cursor: default;
`;

export const recomment = css`
  margin: 0;
  color: #888888;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    color: #666666;
  }
`;

export const reportComment = css`
  margin: 0;
  color: #ff4757;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    color: #ff3838;
  }
`;

export const transactionButton = css`
  display: flex;
  gap: 6px;

  & > button {
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 12px;
    background: #ef4444;
    color: white;
    cursor: pointer;

    &:hover {
      background: #dc2626;
    }
  }
`;

export const writeComment = css`
  display: flex;
  align-items: center;
  border-top: 1px solid #e5e7eb;
  padding-top: 8px;
`;

export const input = css`
  flex: 1;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #d1d5db;
  border-radius: 20px;
  outline: none;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`;

export const button = css`
  margin: 0 8px;
  padding: 6px 14px;
  background: #2563eb;
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-radius: 20px;
  border: none;
  cursor: pointer;

  &:hover {
    background: #1d4ed8;
  }
`;

export const loginContainer = css`
  display: flex; 
  flex-direction: column;
  justify-content: center;  
  align-items: center;      
  text-align: center;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  min-height: 60vh;
  padding: 40px;
  background-color: #f9f9f9;
`;

export const loginBox = css`
  display: inline-block;
  padding: 30px;
  border-radius: 15px;
  background-color: #7a51c2;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

export const googleLogin = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  color: black;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
  margin-bottom: 10px;
  width: 250px;
  cursor: pointer;

  img {
    width: 20px;
    margin-right: 10px;
  }
`;

export const kakaoLogin = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fee500;
  color: #3c1e1e;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
  width: 250px;
  cursor: pointer;
  
  img {
    width: 20px;
    margin-right: 10px;
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

// 사용자 프로필 모달 관련 스타일
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