import { css } from '@emotion/react';

export const containerStyle = css`
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: #f8fafc;
  min-height: 100vh;
`;

export const categoryHeaderStyle = css`
  background: white;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const categoryIconStyle = css`
  font-size: 24px;
`;

export const categoryNameStyle = css`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
`;

export const moimListStyle = css`
  padding: 0;
`;

export const moimItemStyle = css`
  display: flex;
  padding: 24px;
  background: white;
  border-bottom: 1px solid #f1f5f9;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f8fafc;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
    gap: 16px;
  }
`;

export const moimImageContainerStyle = css`
  flex-shrink: 0;
  width: 220px;
  height: 120px;
  margin-right: 20px;
  overflow: hidden;
  border-radius: 8px;

  @media (max-width: 768px) {
    width: 100%;
    height: 160px;
    margin-right: 0;
  }
`;

export const moimImageStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const defaultImageStyle = css`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  padding: 8px;
  border-radius: 8px;
`;

export const moimContentStyle = css`
  flex: 1;
  min-width: 0;
`;

export const moimTitleRowStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
  gap: 12px;
`;

export const moimTitleStyle = css`
  font-size: 17px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  line-height: 1.4;
  flex: 1;
`;

export const moimDescriptionStyle = css`
  color: #6b7280;
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const moimTagsStyle = css`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`;

export const locationTagStyle = css`
  background-color: #dbeafe;
  color: #1e40af;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`;

export const categoryTagStyle = css`
  background-color: #f3e8ff;
  color: #7c3aed;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`;

export const memberCountTagStyle = css`
  color: #6b7280;
  font-size: 12px;
  font-weight: 500;
`;

export const statusBadgeStyle = css`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;

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
  background: white;

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