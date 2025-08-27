import { css } from '@emotion/react';

export const container = css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background: #f8f9fa;
    min-height: 100vh;
`;

export const header = css`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    gap: 20px;
`;

export const backButton = css`
    background: #6c757d;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    
    &:hover {
        background: #5a6268;
    }
`;

export const pageTitle = css`
    font-size: 28px;
    font-weight: bold;
    color: #333;
    margin: 0;
`;

export const userInfoSection = css`
    background: white;
    border-radius: 8px;
    padding: 30px;
    margin-bottom: 30px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const profileSection = css`
    display: flex;
    gap: 30px;
    align-items: flex-start;
`;

export const profileImage = css`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #e9ecef;
`;

export const userDetails = css`
    flex: 1;
    
    h2 {
        margin: 0 0 15px 0;
        color: #333;
        font-size: 24px;
    }
`;

export const userMeta = css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 15px;
    
    span {
        color: #666;
        font-size: 14px;
    }
`;

export const introduction = css`
    color: #555;
    font-style: italic;
    margin: 0;
    line-height: 1.5;
`;

export const tabContainer = css`
    display: flex;
    background: white;
    border-radius: 8px 8px 0 0;
    margin-bottom: 0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const tabButton = css`
    background: none;
    border: none;
    padding: 15px 25px;
    cursor: pointer;
    font-size: 16px;
    color: #666;
    border-bottom: 3px solid transparent;
    transition: all 0.2s;
    
    &:hover {
        background: #f8f9fa;
        color: #333;
    }
`;

export const activeTab = css`
    color: #007bff !important;
    border-bottom-color: #007bff !important;
    background: #f8f9fa;
`;

export const tabContent = css`
    background: white;
    border-radius: 0 0 8px 8px;
    padding: 30px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    min-height: 400px;
`;

export const infoGrid = css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
`;

export const infoItem = css`
    display: flex;
    flex-direction: column;
    gap: 5px;
    
    label {
        font-weight: bold;
        color: #333;
        font-size: 14px;
    }
    
    span {
        color: #666;
        padding: 8px 0;
        border-bottom: 1px solid #eee;
    }
`;

export const emptyState = css`
    text-align: center;
    color: #666;
    font-size: 18px;
    padding: 60px;
`;

export const moimsGrid = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
`;

export const moimCard = css`
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 20px;
    transition: transform 0.2s, box-shadow 0.2s;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
`;

export const moimImage = css`
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 15px;
`;

export const moimInfo = css`
    h3 {
        margin: 0 0 10px 0;
        color: #333;
        font-size: 18px;
    }
    
    p {
        color: #666;
        margin: 0 0 10px 0;
        line-height: 1.4;
    }
`;

export const moimMeta = css`
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #999;
`;

export const postsList = css`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const postCard = css`
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 20px;
    transition: box-shadow 0.2s, border-color 0.2s;
    cursor: pointer;
    
    &:hover {
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        border-color: #007bff;
    }
`;

export const postHeader = css`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;
    
    h3 {
        margin: 0;
        color: #333;
        font-size: 18px;
        flex: 1;
    }
`;

export const postDate = css`
    color: #999;
    font-size: 12px;
    white-space: nowrap;
    margin-left: 15px;
`;

export const postContent = css`
    color: #666;
    line-height: 1.5;
    margin: 10px 0;
`;

export const postStats = css`
    display: flex;
    gap: 20px;
    font-size: 12px;
    color: #999;
    margin-top: 10px;
`;

export const loadingContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    font-size: 18px;
    color: #666;
`;

export const errorContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    font-size: 18px;
    color: #dc3545;
`;