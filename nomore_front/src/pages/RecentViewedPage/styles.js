import { css } from '@emotion/react';

export const container = css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 32px 16px;
    min-height: 100vh;
    background-color: #f8fafc;
`;

export const header = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    padding-bottom: 16px;
    border-bottom: 2px solid #e1e5e9;
`;

export const title = css`
    font-size: 28px;
    font-weight: bold;
    color: #2c3e50;
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
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
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

export const moimGrid = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 16px;
    }
`;

export const moimCard = css`
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
    border: 1px solid #e1e5e9;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        border-color: #3498db;
    }
`;

export const imageContainer = css`
    width: 100%;
    height: 180px;
    overflow: hidden;
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
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    padding: 20px;
    line-height: 1.3;
`;

export const moimInfo = css`
    padding: 20px;
`;

export const moimTitle = css`
    font-size: 18px;
    font-weight: bold;
    color: #2c3e50;
    margin: 0 0 8px 0;
    line-height: 1.4;
    
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

export const moimDescription = css`
    font-size: 14px;
    color: #7f8c8d;
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
    margin-bottom: 16px;
    flex-wrap: wrap;
`;

export const locationTag = css`
    background: #e8f4fd;
    color: #2980b9;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
    border: 1px solid #d6eaf8;
`;

export const categoryTag = css`
    background: #f0f8f0;
    color: #27ae60;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
    border: 1px solid #d5f4e6;
`;

export const moimFooter = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 12px;
    border-top: 1px solid #ecf0f1;
`;

export const memberCount = css`
    font-size: 14px;
    color: #34495e;
    font-weight: 500;
`;

export const statusBadge = css`
    padding: 6px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    
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