import { css } from '@emotion/react';

export const containerStyle = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
  
  /* 스크롤 영역 내에서 자연스럽게 확장 */
  min-height: 100%;
`;

export const categoryContainerStyle = css`
  margin-bottom: 40px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const categoryHeaderStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e1e5e9;
  
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
`;

export const noMoimStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 16px;
  margin: 20px 0;
  
  .icon {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.6;
  }
  
  h3 {
    margin: 0 0 8px 0;
    font-size: 20px;
    color: #34495e;
    font-weight: 600;
  }
  
  p {
    margin: 0;
    color: #7f8c8d;
    font-size: 16px;
  }
`;

export const gridContainerStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  list-style: none;
  padding: 0;
  margin: 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const moimCardStyle = css`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid #e1e5e9;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    border-color: #3498db;
  }
`;

export const imageStyle = css`
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
  
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
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  padding: 20px;
`;

export const contentStyle = css`
  padding: 24px;
`;

export const titleStyle = css`
  margin: 0 0 12px 0;
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  line-height: 1.4;
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const descriptionStyle = css`
  margin: 0 0 16px 0;
  font-size: 14px;
  color: #7f8c8d;
  line-height: 1.6;
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const tagsStyle = css`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

export const locationTagStyle = css`
  background: #e8f4fd;
  color: #2980b9;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid #d6eaf8;
`;

export const categoryTagStyle = css`
  background: #f0f8f0;
  color: #27ae60;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid #d5f4e6;
`;

export const memberInfoStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #ecf0f1;
`;

export const memberCountStyle = css`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #34495e;
  font-weight: 500;
  
  .current {
    color: #2980b9;
    font-weight: 700;
  }
  
  .total {
    color: #7f8c8d;
  }
`;

export const statusBadgeStyle = css`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  
  &.available {
    background: #d5f4e6;
    color: #27ae60;
    border: 1px solid #a3e9c1;
  }
  
  &.full {
    background: #fadbd8;
    color: #e74c3c;
    border: 1px solid #f1948a;
  }
`;