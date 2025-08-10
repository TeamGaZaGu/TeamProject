import { css } from "@emotion/react";

export const containerStyle = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

export const headerStyle = css`
  flex-shrink: 0; /* 헤더 크기 고정 */
`;

export const body = css`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

export const sidebarStyle = css`
  flex-shrink: 0; /* 사이드바 크기 고정 */
  overflow-y: auto; /* 사이드바 독립 스크롤 */
  
  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
    
    &:hover {
      background: #a8a8a8;
    }
  }
`;

export const main = css`
  flex: 1;
  overflow-y: auto; /* 메인 영역 독립 스크롤 */
  
  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
    
    &:hover {
      background: #a8a8a8;
    }
  }
`;