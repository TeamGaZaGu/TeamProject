import { css } from "@emotion/react";

// 드롭다운 컨테이너
export const dropdownContainer = css`
  position: relative;
  display: inline-block;
`;

// 드롭다운 버튼 스타일
export const dropdownButton = css`
  position: relative;
  padding: 12px 16px;
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

// 드롭다운 메뉴 - z-index 증가
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