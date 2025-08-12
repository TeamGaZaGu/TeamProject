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
  overflow-y: auto;
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

export const imgStyle = css`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const ImgBox = css`
  width: 10rem;
  height: 10rem;
  border: 1px solid #dbdbdb;
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const previewBox = css`
  width: 7rem;
  height: 7rem;
  border: 1px solid #ccc;
  border-radius: 1rem;
  overflow: hidden;
`;

export const previewImg = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const inputStyle = css`
  padding: 1rem;
  border-radius: 1rem;
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
  display: flex; 
  position: relative;
  align-items: flex-start;
  border: 0.1rem solid #dbdbdb;
  border-radius: 1rem;
  gap: 1rem;     
  height: 50%;
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

export const dropdownMenu = css`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #ffffff;
  border: 1px solid #dbdbdb;
  border-top: none;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 20rem;
  z-index: 1000;
   overflow-y: auto;
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