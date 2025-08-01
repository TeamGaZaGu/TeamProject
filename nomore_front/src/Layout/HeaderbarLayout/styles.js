import { css } from '@emotion/react';

export const container = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: #ffffff;
  border-bottom: 1px solid #e1e5e9;
  z-index: 1000;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const content = css`
  display: flex;
  align-items: center;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  gap: 24px;
`;

export const logo = css`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const logoIcon = css`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #4285f4 0%, #34a853 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 16px;
`;

export const logoText = css`
  font-size: 18px;
  font-weight: 700;
  color: #202124;
`;

export const locationSelector = css`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  cursor: pointer;
  color: #5f6368;
  font-size: 14px;
  min-width: 80px;
  
  &:hover {
    border-color: #4285f4;
  }
`;

export const searchContainer = css`
  flex: 1;
  max-width: 600px;
  position: relative;
  display: flex;
  align-items: center;
`;

export const searchInput = css`
  width: 100%;
  height: 40px;
  padding: 0 48px 0 16px;
  border: 1px solid #dadce0;
  border-radius: 20px;
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

export const searchButton = css`
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #f1f3f4;
  }
`;

export const notificationButton = css`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #f1f3f4;
  }
`;