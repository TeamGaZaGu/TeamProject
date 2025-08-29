import { css } from '@emotion/react';

export const categoryContainerStyle = css`
  margin-bottom: 32px;
`;

export const categoryHeaderStyle = css`
  font-size: 24px;
  font-weight: 700;
  color: #333333;
  margin-bottom: 20px;
  padding: 0; 
  display: flex;
  align-items: center;
  gap: 8px;
  
  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 16px;
  }
`;

export const gridContainerStyle = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 0;
  list-style: none;
  margin: 0;
  width: 100%;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const moimCardStyle = css`
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  height: 320px;
  width: 100%;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    border-color: #e0e0e0;
  }
`;

export const imageStyle = css`
  width: 100%;
  height: 140px;
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

export const defaultImageStyle = css`
  width: 100%;
  height: 140px;
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

export const contentStyle = css`
  padding: 12px;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`;

export const titleStyle = css`
  font-size: 15px;
  font-weight: 700;
  color: #333333;
  margin: 0 0 6px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 38px;
`;

export const descriptionStyle = css`
  font-size: 12px;
  color: #666666;
  line-height: 1.4;
  margin: 0 0 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 36px;
`;

export const tagsStyle = css`
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
  flex-wrap: wrap;
  min-height: 26px;
`;

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

export const memberInfoStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  height: 28px;
`;

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
  background: #ffffff;
  color: #333333;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    border-color: #333333;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background: #f8f9fa;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    color: #999999;
    border-color: #e0e0e0;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    background: #f0f0f0;
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