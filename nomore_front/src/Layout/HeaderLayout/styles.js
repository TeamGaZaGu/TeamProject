import { css } from '@emotion/react';

// 전체 헤더 컨테이너
export const headerContainer = css`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  gap: 40px;
`;

// 로고 영역
export const logoSection = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  &:hover {
    cursor: pointer;
  }
`;

export const logoTitle = css`
  font-size: 32px;
  font-weight: bold;
  color: #2563eb;
  margin: 0;
  line-height: 1;
`;

export const logoSubtitle = css`
  font-size: 12px;
  color: #6b7280;
  margin: 2px 0 0 0;
  line-height: 1;
`;

// 중앙 컨트롤 영역 - overflow: hidden 제거!
export const controlSection = css`
  display: flex;
  align-items: center;
  gap: 0;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  background-color: #ffffff;
  flex: 1;
  max-width: 800px;
  margin: 0 auto;
  /* overflow: hidden; <- 이 줄을 제거하거나 주석 처리 */
  overflow: visible; /* 또는 명시적으로 visible로 설정 */
`;

// 드롭다운 컨테이너
export const dropdownContainer = css`
  position: relative;
  display: inline-block;
`;

// 드롭다운 버튼 스타일
export const dropdownButton = css`
  position: relative;
  padding: 12px 16px;
  background-color: #ffffff;
  border: none;
  border-right: 1px solid #d1d5db;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  min-width: 120px;
  text-align: left;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f9fafb;
  }
  
  &:last-of-type {
    border-right: none;
  }
  
  &::after {
    content: '▼';
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 10px;
    color: #9ca3af;
  }
`;

// 드롭다운 메뉴
export const dropdownMenu = css`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-top: none;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 200px; /* 최대 높이 설정 */
  overflow-y: auto; /* 내용이 많을 때 스크롤 */
`;

// 드롭다운 아이템
export const dropdownItem = css`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f3f4f6;
  }
  
  input[type="radio"] {
    margin-right: 8px;
    accent-color: #2563eb;
  }
  
  label {
    font-size: 14px;
    color: #374151;
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 100%;
  }
`;

// 검색 입력창
export const searchInput = css`
  padding: 12px 16px;
  border: none;
  font-size: 14px;
  color: #374151;
  background-color: #ffffff;
  flex: 1;
  min-width: 400px;
  outline: none;
  
  &::placeholder {
    color: #9ca3af;
  }
`;

// 검색 버튼
export const searchButton = css`
  padding: 12px 16px;
  background-color: #2563eb;
  border: none;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  border-radius: 0 11px 11px 0;
  height: 4.56rem;
  
  &:hover {
    background-color: #1d4ed8;
  }
  
  svg {
    font-size: 18px;
  }
`;