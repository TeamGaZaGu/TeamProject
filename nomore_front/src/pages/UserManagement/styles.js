import { css } from '@emotion/react';

// 메인 컨테이너
export const container = css`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

// 페이지 제목
export const pageTitle = css`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

// 테이블 컨테이너
export const tableContainer = css`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid #e5e7eb;
`;

export const tableWrapper = css`
  overflow-x: auto;
  overflow-y: auto;
  max-height: 70vh;
`;

export const table = css`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
`;

export const tableHead = css`
  background-color: #f8fafc;
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const tableHeader = css`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 2px solid #e5e7eb;
  white-space: nowrap;
`;

export const tableRow = css`
  transition: background-color 0.2s ease;
 
  &:hover {
    background-color: #f9fafb;
  }
 
  &:nth-of-type(even) {
    background-color: #f8fafc;
  }
 
  &:nth-of-type(even):hover {
    background-color: #f3f4f6;
  }
`;

export const tableCell = css`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const profileImage = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e5e7eb;
`;

export const noImage = css`
  color: #9ca3af;
  font-style: italic;
  font-size: 0.8rem;
`;

// 차단 버튼 스타일 추가
export const blockButton = css`
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #dc2626;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.3);
  }

  &:active {
    background-color: #b91c1c;
  }
`;

// 로딩 컨테이너 스타일
export const loadingContainer = css`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
  font-size: 1.1rem;
`;

// 차단해제 버튼 스타일
export const unblockButton = css`
  background-color: #10b981;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #059669;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3);
  }

  &:active {
    background-color: #047857;
  }
`;