// styles.ts
import { css } from "@emotion/react";

// 전체 레이아웃
export const layout = css`
  max-width: 1000px;
  margin: 60px auto;
  padding: 40px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;

  h1 {
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 2rem;
    color: #111827;
  }
`;

export const inputContainer = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const imgStyle = css`
  display: flex;
  justify-content: center;
`;

export const ImgBox = css`
  width: 140px;
  height: 140px;
  border-radius: 10px;
  background-color: #f3f4f6;
  overflow: hidden;
  border: 1px solid #d1d5db;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const titleInput = css`
  width: 100%;
  padding: 12px 16px;
  font-size: 15px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  box-sizing: border-box;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);
  }
`;

export const discription = css`
  width: 100%;
  padding: 12px 16px;
  font-size: 15px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  box-sizing: border-box;
  resize: vertical;
  min-height: 100px;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);
  }
`;

export const contentTextarea = css`
  width: 100%;
  min-height: 400px;
  padding: 12px 16px;
  font-size: 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  resize: vertical;
  font-family: inherit;
  color: #111827;
  box-sizing: border-box;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.3);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const dropdownContainer = css`
  display: flex; 
  position: relative;
  align-items: flex-start;
  border-radius: 1rem;
  gap: 1rem;     
  height: 50%;
`;


export const dropdownButton = css`
  flex: 1;
  min-width: 130px;
  margin-right: 1rem;
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: #ffffff;
  font-size: 14px;
  color: #374151;
  text-align: left;
  position: relative;
  cursor: pointer;

  &:hover {
    background-color: #f9fafb;
  }

  &::after {
    content: "▾";
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 10px;
    color: #9ca3af;
  }
`;

export const dropdownMenu = css`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 100%;
  max-height: 240px;
  overflow-y: auto;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  z-index: 10;
`;

export const dropdownItem = css`
  padding: 10px 14px;
  cursor: pointer;

  label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    cursor: pointer;
    color: #374151;
  }

  input[type="radio"] {
    accent-color: #2563eb;
  }

  &:hover {
    background-color: #f3f4f6;
  }
`;

export const button = css`
  width: 100%;
  padding: 14px 0;
  margin-top: 32px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: #ffffff;
  background-color: #2563eb;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1e40af;
  }
`;