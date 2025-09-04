import { css } from '@emotion/react';

export const containerStyle = css`
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 32px 24px 32px 0;
  min-height: 100vh;
  background-color: #fff;
  box-sizing: border-box;
`;

export const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e9ecef;
  
  h2 {
    font-size: 28px;
    font-weight: 800;
    color: #333;
    margin: 0;
  }
  
  .result-count {
    font-size: 16px;
    color: #666;
    font-weight: 500;
  }
`;

export const gridContainerStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  padding: 0;
  list-style: none;
  margin: 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const moimCardStyle = css`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: all 0.25s ease;
  cursor: pointer;
  border: 1px solid #e9ecef;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    border-color: #667eea;
  }
`;

export const imageStyle = css`
  width: 100%;
  height: 180px;
  overflow: hidden;
  background: #f6f7fb;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  img:hover {
    transform: scale(1.05);
  }
`;

export const defaultImageStyle = css`
  width: 100%;
  height: 180px;
  background: linear-gradient(135deg, #667eea 0%, #8093ff 100%);
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

export const contentStyle = css`
  padding: 16px;
`;

export const titleStyle = css`
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

export const descriptionStyle = css`
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  margin: 0 0 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const tagsStyle = css`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
`;

export const locationTagStyle = css`
  background: #f1f3ff;
  color: #4a56c9;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid #e0e5ff;
`;

export const categoryTagStyle = css`
  background: #eefaf3;
  color: #1f9d5b;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid #d7f2e3;
`;

export const memberInfoStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #f1f3f5;
`;

export const memberCountStyle = css`
  font-size: 13px;
  color: #444;
  font-weight: 600;
`;

export const statusBadgeStyle = css`
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

export const noResultStyle = css`
  text-align: center;
  padding: 80px 20px;
  color: #666;
  
  .icon {
    font-size: 64px;
    margin-bottom: 20px;
    opacity: 0.6;
  }
  
  h3 {
    font-size: 24px;
    margin: 0 0 12px 0;
    color: #333;
  }
  
  p {
    font-size: 16px;
    margin: 0;
    line-height: 1.5;
  }
`;