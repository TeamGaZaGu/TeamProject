import { css } from '@emotion/react';

export const layout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  min-width: 300px; 
  margin-left: auto;
  margin-right: auto;
  background-color: #fafafa;
  border-radius: 1rem;
  height: 100vh;
  box-sizing: border-box;
`;

export const inputContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 40rem;
  gap: 1.5rem;
  max-height: 60vh;
  padding-bottom: 2rem;
`;

export const inputStyle = css`
  padding: 1rem;
  border-radius: 0.8rem;
  border: 1px solid #dbdbdb;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border: 1px solid #7e57c2;
  }
`;

export const dropdownContainer = css`
  position: relative;
  display: inline-block;
`;

export const dropdownButton = css`
  position: relative;
  padding: 12px 16px;
  background-color: #ffffff;
  border: none;
  border-right: 1px solid #d1d5db;
  width: 100%;
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

export const buttonContainer = css`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 40rem;
`;

export const signupButton = css`
  padding: 1rem 2rem;
  background-color: #7e57c2;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  border-radius: 1rem;
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