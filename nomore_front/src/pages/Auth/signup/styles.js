import { css } from '@emotion/react';

export const layout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  width: 100%;
  min-height: 100%;
  padding: 6rem 3rem 3rem; /* 상단/좌우 여백 더 크게 */
  box-sizing: border-box;
`;

export const inputContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 48rem; /* 기존보다 더 넓게 */
  gap: 2rem; /* 입력칸 간격 더 넓게 */
  max-height: 70vh;
  padding-bottom: 3rem;
  flex-shrink: 0;
`;

export const inputStyle = css`
  padding: 1.2rem 1.4rem; /* 입력칸 높이/좌우 넓힘 */
  border-radius: 1rem;
  border: 1px solid #dbdbdb;
  font-size: 1.1rem;
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: #aaa;
    font-size: 1rem;
  }

  &:focus {
    outline: none;
    border: 1px solid #7e57c2;
  }
`;

export const dropdownContainer = css`
  position: relative;
  display: inline-block;
  width: 100%;
`;

export const dropdownButton = css`
  position: relative;
  padding: 1.2rem 1.4rem;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 1rem;
  width: 100%;
  font-size: 1.1rem;
  color: #374151;
  cursor: pointer;
  min-width: 160px;
  text-align: left;
  transition: border-color 0.2s ease, background-color 0.2s ease;

  &:hover {
    background-color: #f9fafb;
    border-color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #7e57c2;
  }

  &::after {
    content: '▼';
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
    color: #9ca3af;
  }
`;

export const buttonContainer = css`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 48rem;
`;

export const signupButton = css`
  padding: 1.2rem 2.5rem;
  background-color: #7e57c2;
  color: white;
  font-size: 1.3rem;
  font-weight: 600;
  border: none;
  border-radius: 1.2rem;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #673ab7;
  }

  &:disabled {
    background-color: #d1d5db;
    color: #9ca3af;
    cursor: default;

    &:hover {
      background-color: #d1d5db;
    }
  }
`;

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

export const dropdownItem = css`
  display: flex;
  align-items: center;
  padding: 12px 16px; /* 아이템 크기 키움 */
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
  }

  input[type='radio'] {
    margin-right: 10px;
    accent-color: #2563eb;
  }

  label {
    font-size: 1.05rem;
    color: #374151;
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 100%;
  }
`;
