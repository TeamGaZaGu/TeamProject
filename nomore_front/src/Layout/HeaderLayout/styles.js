import { css } from '@emotion/react';

export const headerContainer = css`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  background-color: #ffffff;
  border-bottom: 1px solid #eeeded;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  height: 40px;
`;

export const logoSection = css`
  display: flex;
  align-items: center;
  gap: 2px;
  
  &:hover {
    cursor: pointer;
  }
`;

export const logoImage = css`
  height: 60px;
  width: auto;
  object-fit: contain;
  margin-left: -35px;
  margin-right: -25px;
`;

export const logoTextContainer = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const logoTitle = css`
  font-size: 26px;
  font-weight: bold;
  color: #ff5fd7;
  margin: 0;
  line-height: 1;
`;

export const controlSection = css`
  display: flex;
  align-items: center;
  gap: 0;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  background-color: #ffffff;
  flex: 1;
  max-width: 1100px;
  margin: 0 auto;
  overflow: visible;
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
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  min-width: 120px;
  width: 140px;
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
  border: 1px solid #d1d5db;
  border-top: none;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 140px;
  max-height: 200px;
  overflow-y: auto;
  background-color: #fff;

  &::-webkit-scrollbar {
    display: none;
  }
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

export const searchButton = css`
  padding: 12px 16px;
  background-color: #ffffff;
  border: none;
  color: #6b7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  border-radius: 0 11px 11px 0;
  height: 4.56rem;
  
  &:hover {
    background-color: #f9fafb;
    color: #374151;
  }
  
  svg {
    font-size: 20px;
  }
`;