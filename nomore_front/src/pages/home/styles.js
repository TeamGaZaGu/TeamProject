import { css } from '@emotion/react';

// 메인 컨테이너
export const containerStyle = css`
  min-height: 100vh;
  background: #fff;
  padding: 24px 0;
  
  @media (max-width: 768px) {
    padding: 16px 0;
  }
`;

// 헤더 영역 (필요시 사용)
export const headerStyle = css`
  background: #ffffff;
  padding: 20px 0;
  border-bottom: 1px solid #e9ecef;
  margin-bottom: 32px;
  
  h1 {
    text-align: center;
    font-size: 32px;
    font-weight: 800;
    color: #333333;
    margin: 0;
    
    @media (max-width: 768px) {
      font-size: 24px;
    }
  }
`;

// 콘텐츠 래퍼
export const contentWrapperStyle = css`
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

// 로딩 스타일
export const loadingStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  
  div {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// 빈 상태 메시지
export const emptyStateStyle = css`
  text-align: center;
  padding: 80px 20px;
  color: #666666;
  
  h3 {
    font-size: 20px;
    margin-bottom: 8px;
    color: #333333;
  }
  
  p {
    font-size: 16px;
    margin: 0;
  }
`;

export const countStyle = css`
    color: #666;
    font-size: 14px;
    margin-left: 8px;
    font-weight: 400;
`;