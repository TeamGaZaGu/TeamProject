import { css } from '@emotion/react';

// 메인 컨테이너
export const containerStyle = css`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f8fafc;
  min-height: 100vh;
`;

// 헤더 영역
export const headerStyle = css`
  margin-bottom: 32px;
  
  h2 {
    font-size: 28px;
    font-weight: bold;
    color: #1e293b;
    margin: 0 0 8px 0;
  }
  
  .result-count {
    font-size: 16px;
    color: #64748b;
  }
`;

// 그리드 컨테이너
export const gridContainerStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  padding: 0;
  list-style: none;
  margin: 0;
`;

// 모임 카드
export const moimCardStyle = css`
  background-color: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    border-color: #3b82f6;
  }
`;

// 이미지 영역
export const imageStyle = css`
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

// 기본 배경 (이미지가 없을 때) - 새로 추가
export const defaultImageStyle = css`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  font-weight: bold;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="80" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="60" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  }
`;


// 콘텐츠 영역
export const contentStyle = css`
  padding: 20px;
`;

// 제목
export const titleStyle = css`
  font-size: 20px;
  font-weight: bold;
  color: #1e293b;
  margin: 0 0 12px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

// 설명
export const descriptionStyle = css`
  font-size: 14px;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

// 태그 컨테이너
export const tagsStyle = css`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

// 기본 태그
export const tagStyle = css`
  background-color: #f1f5f9;
  color: #475569;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
`;

// 지역 태그
export const locationTagStyle = css`
  ${tagStyle};
  background-color: #dbeafe;
  color: #1d4ed8;
`;

// 카테고리 태그
export const categoryTagStyle = css`
  ${tagStyle};
  background-color: #fef3c7;
  color: #d97706;
`;

// 멤버 정보
export const memberInfoStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
`;

// 멤버 수
export const memberCountStyle = css`
  font-size: 14px;
  color: #374151;
  
  .current {
    font-weight: bold;
    color: #3b82f6;
  }
  
  .total {
    color: #6b7280;
  }
`;

// 상태 배지
export const statusBadgeStyle = css`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  
  &.available {
    background-color: #dcfce7;
    color: #166534;
  }
  
  &.full {
    background-color: #fef2f2;
    color: #dc2626;
  }
`;

// 결과 없음 스타일
export const noResultStyle = css`
  text-align: center;
  padding: 80px 20px;
  color: #64748b;
  
  .icon {
    font-size: 64px;
    margin-bottom: 24px;
    opacity: 0.5;
  }
  
  h3 {
    font-size: 24px;
    margin: 0 0 12px 0;
    color: #374151;
  }
  
  p {
    font-size: 16px;
    margin: 0;
    line-height: 1.5;
  }
`;