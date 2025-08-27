import { css } from "@emotion/react";

export const container = css`
    min-height: 100vh;
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
    z-index: 100;
`;

export const click = css`
    background: none;
    border: none;
    font-size: 24px;
    cursor: poiner;
    padding: 8px;
    color: #333;
    
    &:hover {
        background-color: #f1f3f4;
        border-radiust: 50%;
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

export const mainContent = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #ffffff;
  min-height: calc(100vh - 140px);
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
    width: 100%;
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
    font-size: 12px;
    color: #666;
    font-weight: 500;
`;

export const memberName = css`
    font-size: 14px;
    font-weight: 600;
    color: #1a1a1a;
`;


export const forumCategoryContainer = css`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 1rem;
  padding: 12px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
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
  -webkit-line-clamp: 2;   // 최대 줄 수 2줄
  -webkit-box-orient: vertical; //	줄바꿈 기준을 수직으로 설정
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