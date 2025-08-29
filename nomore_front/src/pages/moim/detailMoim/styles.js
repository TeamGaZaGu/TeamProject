import { css } from "@emotion/react";

export const container = css`
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

export const header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #ffffff;
  border-bottom: 1px solid #ffffff;
  position: sticky;
  top: 0;
  z-index: 0;
`;

export const mainLayout = css`
  display: flex;
  border: none;
  width: 100%;
  gap: 2rem;
  margin: 0 auto;
  background-color: #fff;
  overflow-y: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;


export const contentArea = css`
  flex: 1;
  min-width: 0;
`;

export const click = css`
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    padding: 8px;
    color: #333;
    
    &:hover {
        background-color: #f1f3f4;
        border-radius: 50%;
    }
`;

export const headerActions = css`
    display: flex;
    gap: 8px;
`;

export const unClick = css`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  color: #666;
  border-radius: 50%;
  
  &:hover {
      background-color: #f1f3f4;
  }
`;

export const Transaction = css`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  margin-left: 3rem;
  padding: 8px;
  color: #666;
  border-radius: 50%;
  
  &:hover {
      background-color: #f1f3f4;
  }
`;

export const homeLayout = css`
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
`;

// 사용자 액션 컨테이너 (가입/탈퇴 버튼과 신고 버튼을 함께 배치)
export const userActionContainer = css`
    display: flex;
    align-items: center;
    gap: 8px;
`;

// 모임 신고 버튼 (일반 사용자용)
export const reportMoimButton = css`
    background: none;
    border: 1px solid #ff4757;
    color: #ff4757;
    border-radius: 8px;
    padding: 12px;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    min-width: 44px;
    height: 44px;
    
    &:hover {
        background-color: #ff4757;
        color: white;
    }
    
    &:active {
        transform: translateY(1px);
    }
`;


export const rightSidebar = css`
  width: 40rem;
  flex-shrink: 0;
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 20px;
  height: fit-content;
  position: sticky;
  top: 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const sidebarTitle = css`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
`;

export const imageGrid = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

export const imageWrapper = css`
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f8f9fa;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.2s ease;
    cursor: pointer;
  }
  
  img:hover {
    transform: scale(1.05);
  }
`;

export const noImages = css`
  grid-column: 1 / -1;
  text-align: center;
  color: #666;
  font-size: 14px;
  padding: 40px 20px;
`;

// 모임 신고 버튼 (관리자/방장용 - 헤더 우측에 배치)
export const reportMoimButtonAdmin = css`
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    margin-left: 1rem;
    padding: 8px;
    color: #ff4757;
    border-radius: 50%;
    
    &:hover {
        background-color: #ff475720;
    }
`;

// 기존 가입/탈퇴 버튼 스타일 수정 (컨테이너 안에서 사용할 때)
export const joinMoimButtonInline = css`
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px 20px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
    white-space: nowrap;
    
    &:hover {
        background-color: #0056b3;
    }
    
    &:active {
        transform: translateY(1px);
    }
`;

export const exitMoimButtonInline = css`
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px 20px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
    white-space: nowrap;
    
    &:hover {
        background-color: #c82333;
    }
    
    &:active {
        transform: translateY(1px);
    }
`;

export const mainContent = css`
  display: flex;
  flex-direction: column;
  min-height: 799px;
  background: #ffffff;
  border-radius: 12px;
  padding: 0; // 기존 background 제거
`;

export const moimInfo = css`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px 20px 16px;

  & > img {
    width: 64px;
    height: 64px;
    border-radius: 12px;
    object-fit: cover;
  }
`;

export const moimTitle = css`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const moimTextInfo = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const moimMeta = css`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
`;

export const section = css`
  padding: 0 20px 24px;
  border-top: 8px solid #f8f9fa;
  
  &:first-of-type {
      border-top: none;
  }
`;

export const sectionTitle = css`
    font-size: 18px;
    font-weight: 600;
    margin: 20px 0 16px 0;
    color: #1a1a1a;
`;

export const description = css`
  p {
      font-size: 15px;
      line-height: 1.6;
      color: #333;
      margin: 0;
      white-space: pre-wrap;
  }
`;

export const scheduleCard = css`
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

export const scheduleHeader = css`
  display: flex;
  gap: 16px;
  align-items: flex-start;
`;

export const scheduleDate = css`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  min-width: 80px;
`;

export const dateText = css`
  font-size: 14px;
  font-weight: 600;
  color: #666;
`;

export const scheduleInfo = css`
  flex: 1;
`;

export const scheduleName = css`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #1a1a1a;
`;

export const scheduleLocation = css`
  font-size: 14px;
  color: #666;
  margin: 0 0 4px 0;
`;

export const scheduleType = css`
  display: inline-block;
  background-color: #e3f2fd;
  color: #1976d2;
  font-size: 12px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 12px;
`;

export const memberSection = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const memberCardWrapper = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
`;

export const memberInfoSection = css`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  cursor: pointer;
`;

export const kickButton = css`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  margin-left: 12px;
  white-space: nowrap;
  transition: background-color 0.2s ease;

  &:hover {
      background-color: #c82333;
  }

  &:active {
      transform: translateY(1px);
  }
`;

export const blockedUserText = css`
  font-size: 12px;
  color: #666;
  margin-left: auto;
  padding-right: 8px;
`;

export const memberCard = css`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  cursor: pointer;
`;

export const profileImage = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e5e7eb;
`;

export const defaultAvatar = css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
`;

export const memberInfo = css`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const memberRole = css`
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
`;

export const memberName = css`
  font-size: 12px;
  color: #666;
  font-weight: 500;
`;

export const categoryAndForumsWrapper = css`
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

export const topBar = css`
  display: flex;
  align-items: center;
  margin-right: 2rem;
  gap: 12px;
  padding-bottom: 12px;
  flex-shrink: 0;
  overflow-x: auto;
`;

export const forums = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-bottom: 1rem;
  padding: 12px 20px;
  background-color: #ffffff;
  overflow-x: auto;
`;

export const categoryButton = (isActive) => css`
  padding: 8px 16px;
  border: 1px solid ${isActive ? '#38bdf8' : '#d1d5db'};
  background-color: ${isActive ? '#e0f2fe' : '#ffffff'};
  color: ${isActive ? '#0284c7' : '#374151'};
  font-size: 14px;
  font-weight: 500;
  border-radius: 20px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${isActive ? '#bae6fd' : '#f3f4f6'};
  }
`;

export const createButton = css`
  margin-left: auto;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  font-size: 14px;
  font-weight: 500;
  border-radius: 20px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #0056b3;
  }
`;

export const register = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;  
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #333; 
`;

export const forumGrid = css`
  margin: 0 1rem;
`;

export const loginContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: 40px;
  background-color: #f9f9f9;
`;

export const customLoginStyle = css`
  background: linear-gradient(to bottom right, #7e57c2, #673ab7);
  border: 1px solid #e0e0e0;
  padding: 2rem;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

   & > button {
    width: 260px;
    height: 48px;
    font-size: 15px;
    border-radius: 10px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
  }

  & > button:nth-of-type(1) {
    background-color: #ffffff;
    color: #000000;
    border: 1px solid #dcdcdc;

    &:hover {
      background-color: #f1f1f1;
    }
  }

  & > button:nth-of-type(2) {
    background-color: #fee500;
    color: #000000;

    &:hover {
      background-color: #ffeb3b;
    }
  }
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

export const forumContainer = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

export const forumCard = css`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  height: 25rem;
  cursor: pointer;
`;

export const forumHeader = css`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

export const userInfo = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 6rem;
`;

export const userName = css`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

export const h3Tag = css`
  margin: 7px 0;
`;

export const postMeta = css`
  font-size: 13px;
  color: #6b7280;
  margin-top: 2px;
`;

export const forumBody = css`
  padding: 8px 0;
`;

export const forumTitle = css`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 4px;
  color: #1a1a1a;
`;

export const forumContent = css`
  display: -webkit-box;
  font-size: 14px;
  line-height: 1.4;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const forumFooter = css`
  display: flex;
  gap: 16px;
  margin-top: 12px;
  font-size: 14px;
  color: #4b5563;

  svg {
    vertical-align: middle;
    margin-right: 4px;
  }
`;

export const loadMoreContainerStyle = css`
    display: flex;
    justify-content: center;
    margin-top: 30px;
    padding: 20px 0;
`;

export const loadMoreButtonStyle = css`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 25px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
    }

    &:active:not(:disabled) {
        transform: translateY(0);
    }
`;

export const spinnerStyle = css`
    animation: spin 1s linear infinite;
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;

export const arrowStyle = css`
    font-size: 12px;
    transition: transform 0.3s ease;
`;

export const bottomActions = css`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #ffffff;
    padding: 16px 20px;
    border-top: 1px solid #e9ecef;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
`;

export const joinMoimButton = css`
    width: 100%;
    max-width: 640px;
    margin: 0 auto;
    display: block;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
    
    &:hover {
        background-color: #0056b3;
    }
    
    &:active {
        transform: translateY(1px);
    }
`;

export const exitMoimButton = css`
    width: 100%;
    max-width: 640px;
    margin: 0 auto;
    display: block;
    background-color: #d80c2e;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
    
    &:hover {
        background-color: #b30000;
    }
    
    &:active {
        transform: translateY(1px);
    }
`;

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

export const modalBody = css`
  padding: 20px;
`;

export const userProfile = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const modalProfileImage = css`
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

export const roleTag = css`
  background-color: #f3f4f6;
  color: #374151;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`;

export const userCategory = css`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  text-align: center;
`;

export const userIntroduction = css`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  padding: 12px;
  background-color: #f9fafb;
  border-radius: 8px;
`;

export const modalButtonContainer = css`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  justify-content: center;
`;

export const modalKickButton = css`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #c82333;
  }

  &:active {
    transform: translateY(1px);
  }
`;

// 권한 이양 버튼 (추가된 스타일)
export const transferOwnershipButton = css`
  background-color: #fbbf24;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f59e0b;
  }

  &:active {
    transform: translateY(1px);
  }
`;

// 모달 헤더 버튼 컨테이너
export const modalHeaderButtons = css`
  display: flex;
  gap: 8px;
  align-items: center;
`;

// 신고 버튼
export const reportButton = css`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #ff4757;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  
  &:hover {
    background-color: #ff475720;
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