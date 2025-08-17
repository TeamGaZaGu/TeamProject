import { css } from "@emotion/react";

export const memberSection = css`
    margin-top: 2rem;
    padding: 1.5rem;
    background-color: #ffffff;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
`;

export const sectionTitle = css`
    font-size: 1.5rem;
    font-weight: bold;
    color: #1e293b;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #3b82f6;
`;

export const memberGrid = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
`;

export const memberCard = css`
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: #f8fafc;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    transition: all 0.2s ease;

    &:hover {
        background-color: #f1f5f9;
        border-color: #3b82f6;
        transform: translateY(-1px);
    }
`;

export const memberAvatar = css`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 0.75rem;
    flex-shrink: 0;
    position: relative;
`;

// 프로필 이미지
export const profileImage = css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
`;

export const defaultAvatar = css`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
`;

export const memberInfo = css`
    flex: 1;
    min-width: 0;
`;

export const memberName = css`
    font-size: 1rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const memberRole = css`
    font-size: 0.875rem;
    font-weight: 500;
    color: #3b82f6;
    margin-bottom: 0.25rem;
`;

export const memberIntro = css`
    font-size: 0.75rem;
    color: #64748b;
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const loadingText = css`
    text-align: center;
    color: #64748b;
    font-size: 0.875rem;
    padding: 2rem;
`;

export const errorText = css`
    text-align: center;
    color: #dc2626;
    font-size: 0.875rem;
    padding: 2rem;
    background-color: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 8px;
`;
