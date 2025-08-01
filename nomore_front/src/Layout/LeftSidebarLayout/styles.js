import { css } from '@emotion/react';

export const container = css`
  position: fixed;
  left: 0;
  top: 64px;
  width: 240px;
  height: calc(100vh - 64px);
  background: #ffffff;
  border-right: 1px solid #e1e5e9;
  z-index: 900;
`;

export const content = css`
  height: 100%;
  overflow-y: auto;
  padding: 20px 0;
  
  /* 스크롤바 숨기기 */
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const loginButton = css`
  width: calc(100% - 32px);
  margin: 0 16px 24px;
  height: 44px;
  background: #4285f4;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #3367d6;
  }
`;

export const menuSection = css`
  margin-bottom: 32px;
`;

export const menuItem = css`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #f1f3f4;
  }
`;

export const activeMenuItem = css`
  background: #e8f0fe;
  color: #1967d2;
  font-weight: 600;
  
  &:hover {
    background: #e8f0fe;
  }
`;

export const menuIcon = css`
  font-size: 18px;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const menuLabel = css`
  font-size: 14px;
  flex: 1;
`;

export const categorySection = css`
  padding: 0 16px;
`;

export const categoryTitle = css`
  font-size: 16px;
  font-weight: 700;
  color: #202124;
  margin: 0 0 16px 0;
`;

export const categoryList = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const categoryItem = css`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s;
  
  &:hover {
    background: #f1f3f4;
  }
`;

export const categoryIcon = css`
  font-size: 16px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const categoryLabel = css`
  font-size: 13px;
  color: #5f6368;
`;

// 모달 스타일
export const modalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

export const modalContent = css`
  background: white;
  border-radius: 12px;
  width: 400px;
  max-width: 90vw;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

export const modalHeader = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 16px;
  border-bottom: 1px solid #e1e5e9;
  
  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #202124;
  }
`;

export const closeButton = css`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  color: #5f6368;
  
  &:hover {
    background: #f1f3f4;
  }
`;

export const modalBody = css`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const input = css`
  width: 100%;
  height: 44px;
  padding: 0 16px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  
  &:focus {
    border-color: #4285f4;
    box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.1);
  }
  
  &::placeholder {
    color: #9aa0a6;
  }
`;

export const submitButton = css`
  width: 100%;
  height: 44px;
  background: #4285f4;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #3367d6;
  }
`;

export const divider = css`
  text-align: center;
  color: #9aa0a6;
  font-size: 14px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 45%;
    height: 1px;
    background: #e1e5e9;
  }
  
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    width: 45%;
    height: 1px;
    background: #e1e5e9;
  }
`;

export const socialButton = css`
  width: 100%;
  height: 44px;
  background: white;
  color: #202124;
  border: 1px solid #dadce0;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #f8f9fa;
  }
`;