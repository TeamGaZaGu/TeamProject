import { css } from "@emotion/react";

export const container = css`
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

export const header = css`
    display: flex;
    align-items: center;
    padding: 12px 16px;
    background-color: #ffffff;
    border-bottom: 1px solid #e9ecef;
    position: sticky;
    top: 0;
    z-index: 100;
`;

export const homeButton = css`
    background: none;
    border: none;
    font-size: 24px;
    cursor: poiner;
    padding: 8px;
    color: #333;
    
    &:hover {
        background-color: #f1f3f4;
        border-radiust: 50%;
    }
`;

export const headerActions = css`
    display: flex;
    gap: 8px;
`;

export const headerButton = css`
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    padding: 8px;
    color: #666;
    border-radius: 50%;
    
    &:hover {
        background-color: #f1f3f4;
    }
`;

export const mainContent = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #ffffff;
  min-height: calc(100vh - 140px);
`;

export const moimInfo = css`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px 20px 16px;

  & > img {
    width: 64px;
    height: 64px;
    border-radius: 12px;
    object-fit: cover;
  }
`;

export const moimTitle = css`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const moimTextInfo = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const moimMeta = css`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #666;
`;

export const section = css`
    padding: 0 20px 24px;
    border-top: 8px solid #f8f9fa;
    
    &:first-of-type {
        border-top: none;
    }
`;

export const sectionTitle = css`
    font-size: 18px;
    font-weight: 600;
    margin: 20px 0 16px 0;
    color: #1a1a1a;
`;

export const description = css`
    p {
        font-size: 15px;
        line-height: 1.6;
        color: #333;
        margin: 0;
        white-space: pre-wrap;
    }
`;

export const scheduleCard = css`
    background-color: #ffffff;
    border: 1px solid #e9ecef;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

export const scheduleHeader = css`
    display: flex;
    gap: 16px;
    align-items: flex-start;
`;

export const scheduleDate = css`
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 12px;
    text-align: center;
    min-width: 80px;
`;

export const dateText = css`
    font-size: 14px;
    font-weight: 600;
    color: #666;
`;

export const scheduleInfo = css`
    flex: 1;
`;

export const scheduleName = css`
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 4px 0;
    color: #1a1a1a;
`;

export const scheduleLocation = css`
    font-size: 14px;
    color: #666;
    margin: 0 0 4px 0;
`;

export const scheduleType = css`
    display: inline-block;
    background-color: #e3f2fd;
    color: #1976d2;
    font-size: 12px;
    font-weight: 500;
    padding: 2px 8px;
    border-radius: 12px;
`;

export const memberSection = css`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const memberCard = css`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 0;
`;

export const memberAvatar = css`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
`;

export const memberInfo = css`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

export const memberRole = css`
    font-size: 12px;
    color: #666;
    font-weight: 500;
`;

export const memberName = css`
    font-size: 14px;
    font-weight: 600;
    color: #1a1a1a;
`;

export const bottomActions = css`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #ffffff;
    padding: 16px 20px;
    border-top: 1px solid #e9ecef;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
`;

export const joinButton = css`
    width: 100%;
    max-width: 640px;
    margin: 0 auto;
    display: block;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
    
    &:hover {
        background-color: #0056b3;
    }
    
    &:active {
        transform: translateY(1px);
    }
`;