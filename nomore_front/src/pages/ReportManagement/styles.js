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

// 테이블 스크롤 영역
export const tableWrapper = css`
  overflow-x: auto;
  overflow-y: auto;
  max-height: 70vh;
`;

// 테이블 기본 스타일
export const table = css`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
`;

// 테이블 헤더
export const tableHead = css`
  background-color: #f8fafc;
  position: sticky;
  top: 0;
  z-index: 10;
`;

// 헤더 셀
export const tableHeader = css`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 2px solid #e5e7eb;
  white-space: nowrap;
`;

// 테이블 행
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

// 테이블 셀
export const tableCell = css`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// 로딩 컨테이너
export const loadingContainer = css`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
  font-size: 1.1rem;
`;

export const processButton = css`
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2563eb;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }

  &:active {
    background-color: #1d4ed8;
  }
`;

