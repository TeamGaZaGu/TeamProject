import { css } from '@emotion/react';

export const containerStyle = css`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const gridContainerStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const moimCardStyle = css`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid #e5e7eb;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
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
  padding: 20px;
`;

export const titleStyle = css`
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 12px 0;
  line-height: 1.4;
`;

export const descriptionStyle = css`
  color: #6b7280;
  font-size: 14px;
  line-height: 1.6;
  margin: 0 0 16px 0;
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
  background-color: #dbeafe;
  color: #1e40af;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
`;

export const categoryTagStyle = css`
  background-color: #f3e8ff;
  color: #7c3aed;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
`;

export const memberInfoStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const memberCountStyle = css`
  font-size: 14px;
  color: #4b5563;
  display: flex;
  align-items: center;
  gap: 4px;

  .current {
    font-weight: 600;
    color: #1f2937;
  }

  .total {
    color: #6b7280;
  }
`;

export const statusBadgeStyle = css`
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;

  &.available {
    background-color: #d1fae5;
    color: #065f46;
  }

  &.full {
    background-color: #fee2e2;
    color: #991b1b;
  }
`;

export const noMoimStyle = css`
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;

  .icon {
    font-size: 48px;
    margin-bottom: 16px;
  }

  h3 {
    font-size: 20px;
    font-weight: 600;
    color: #374151;
    margin: 0 0 8px 0;
  }

  p {
    font-size: 14px;
    margin: 0;
    color: #9ca3af;
  }
`;