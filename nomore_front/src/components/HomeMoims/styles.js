import { css } from '@emotion/react';

// 카테고리 컨테이너 - 배경색 제거하여 통일감 조성
export const categoryContainerStyle = css`
  margin-bottom: 32px;
  /* background 제거로 페이지 통일감 향상 */
`;

// 카테고리 헤더 - 왼쪽 끝까지 사용
export const categoryHeaderStyle = css`
  font-size: 24px;
  font-weight: 700;
  color: #333333;
  margin-bottom: 20px;
  padding: 0; /* 패딩 완전 제거 */
  display: flex;
  align-items: center;
  gap: 8px;
  
  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 16px;
  }
`;

// styles.js에 추가할 스타일들

export const countStyle = css`
    color: #666;
    font-size: 14px;
    margin-left: 8px;
`;

export const loadMoreContainerStyle = css`
    display: flex;
    justify-content: center;
    margin-top: 30px;
    padding: 20px 0;
`;

export const loadMoreButtonStyle = css`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 25px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
    }

    &:active:not(:disabled) {
        transform: translateY(0);
    }
`;

export const spinnerStyle = css`
    animation: spin 1s linear infinite;
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;

export const arrowStyle = css`
    font-size: 12px;
    transition: transform 0.3s ease;
`;

// 그리드 컨테이너 - 한 줄에 4개씩, 화면 전체 활용
export const gridContainerStyle = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 한 줄에 정확히 4개 */
  gap: 20px;
  padding: 0; /* 패딩 완전 제거로 화면 끝까지 사용 */
  list-style: none;
  margin: 0;
  width: 100%;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr); /* 중간 화면에서는 3개 */
    gap: 16px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 모바일에서는 2개 */
    gap: 14px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* 작은 모바일에서는 1개 */
    gap: 12px;
  }
`;

// 모임 카드 - 세로형 레이아웃으로 복귀, 더 넓게 사용
export const moimCardStyle = css`
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column; /* 다시 세로형으로 */
  height: 360px; /* 적당한 높이 */
  width: 100%; /* 그리드 셀 전체 사용 */
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    border-color: #e0e0e0;
  }
`;

// 이미지 컨테이너 - 세로형 레이아웃용
export const imageStyle = css`
  width: 100%;
  height: 140px; /* 적당한 이미지 높이 */
  overflow: hidden;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

// 기본 이미지 - 높이 조정
export const defaultImageStyle = css`
  width: 100%;
  height: 140px; /* 높이 줄여서 콘텐츠 공간 확보 */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  padding: 16px;
  line-height: 1.3;
  flex-shrink: 0;
`;

// 콘텐츠 영역 - 세로형 레이아웃 최적화
export const contentStyle = css`
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1; /* 남은 공간 모두 사용 */
  justify-content: space-between;
`;

// 제목 - 더 넓은 공간 활용
export const titleStyle = css`
  font-size: 16px;
  font-weight: 700;
  color: #333333;
  margin: 0 0 8px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: auto; /* 고정 높이 제거로 유연성 확보 */
  min-height: 44px;
`;

// 설명 - 더 많은 내용 표시
export const descriptionStyle = css`
  font-size: 13px;
  color: #666666;
  line-height: 1.5;
  margin: 0 0 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 3줄로 늘려서 더 많은 내용 표시 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: auto; /* 고정 높이 제거 */
  min-height: 54px; /* 최소 높이만 설정 */
`;

// 태그들 - 레이아웃 개선
export const tagsStyle = css`
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
  flex-wrap: wrap;
  min-height: 26px; /* 최소 높이로 변경 */
`;

// 지역 태그
export const locationTagStyle = css`
  background: #f0f7ff;
  color: #1976d2;
  font-size: 11px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 12px;
  border: 1px solid #e3f2fd;
  white-space: nowrap;
  flex-shrink: 0;
`;

// 카테고리 태그
export const categoryTagStyle = css`
  background: #fff3e0;
  color: #f57c00;
  font-size: 11px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 12px;
  border: 1px solid #ffe0b2;
  white-space: nowrap;
  flex-shrink: 0;
`;

// 멤버 정보
export const memberInfoStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  height: 28px;
`;

// 멤버 수
export const memberCountStyle = css`
  font-size: 13px;
  color: #666666;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  
  .current {
    color: #333333;
    font-weight: 700;
  }
  
  .total {
    color: #666666;
  }
`;

// 상태 뱃지
export const statusBadgeStyle = css`
  font-size: 11px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
  white-space: nowrap;
  
  &.available {
    background: #e8f5e8;
    color: #2e7d32;
    border: 1px solid #c8e6c9;
  }
  
  &.full {
    background: #ffebee;
    color: #d32f2f;
    border: 1px solid #ffcdd2;
  }
`;