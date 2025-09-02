import { css } from '@emotion/react';

export const container = css`
  width: 100%;
  max-width: none;
  margin: 0;
  /* 오른쪽 여백만 살짝: 화면에 붙는 느낌 해소 */
  padding: 32px 24px 32px 0; /* top right bottom left */
  /* 또는 padding-inline-end: 24px; 로 써도 동일 */
  min-height: 100vh;
  background-color: #fff; /* 홈과 동일 */
  box-sizing: border-box;
`;

export const header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e9ecef; /* 홈 보더 */
`;

export const title = css`
  font-size: 28px;
  font-weight: 800;
  color: #333; /* 홈 텍스트 컬러 */
  margin: 0;
`;

export const headerActions = css`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const count = css`
  font-size: 16px;
  color: #666;
  font-weight: 500;
`;

export const clearButton = css`
  padding: 8px 16px;
  background-color: #ff6b6b;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #ff5252;
  }
`;

export const emptyState = css`
  text-align: center;
  padding: 80px 20px;
  color: #666;
`;

export const emptyIcon = css`
  font-size: 64px;
  margin-bottom: 20px;
  opacity: 0.6;
`;

/* 그리드는 기존 안정적인 방식 그대로 */
export const moimGrid = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const moimCard = css`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06); /* 홈 톤 */
  overflow: hidden;
  transition: all 0.25s ease;
  cursor: pointer;
  border: 1px solid #e9ecef; /* 홈 보더 */

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    border-color: #667eea; /* 홈 포인트 컬러 */
  }
`;

export const imageContainer = css`
  width: 100%;
  height: 180px;
  overflow: hidden;
  background: #f6f7fb; /* 비는 영역 부드럽게 */
`;

export const moimImage = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const defaultImage = css`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #8093ff 100%); /* 홈 계열 */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  padding: 20px;
  line-height: 1.3;
`;

export const moimInfo = css`
  padding: 16px;
`;

export const moimTitle = css`
  font-size: 16px;
  font-weight: 700;
  color: #333;
  margin: 0 0 8px 0;
  line-height: 1.4;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const moimDescription = css`
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  margin: 0 0 12px 0;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const tags = css`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
`;

export const locationTag = css`
  background: #f1f3ff;         /* 홈 포인트 계열 */
  color: #4a56c9;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid #e0e5ff;
`;

export const categoryTag = css`
  background: #eefaf3;
  color: #1f9d5b;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid #d7f2e3;
`;

export const moimFooter = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #f1f3f5;
`;

export const memberCount = css`
  font-size: 13px;
  color: #444;
  font-weight: 600;
`;

export const statusBadge = css`
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;

  &.available {
    background: #eafaf1;
    color: #1f9d5b;
    border: 1px solid #c9f0db;
  }

  &.full {
    background: #fdeeee;
    color: #e74c3c;
    border: 1px solid #f6c9c6;
  }
`;
