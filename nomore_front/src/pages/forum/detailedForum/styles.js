import { css } from "styled-components";

export const forumCard = css`
  background: #fff;
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  font-family: "Noto Sans KR", sans-serif;
`;

export const forumHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const left = css`
  display: flex;
  align-items: center;
`;

export const modalProfileImage = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
`;

export const userInfo = css`
  display: flex;
  flex-direction: column;
  height: 40px;
`;

export const h3Tag = css`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: #111827;
`;

export const postMeta = css`
  margin: 2px 0;
  font-size: 12px;
  color: #6b7280;
`;

export const buttonWrapper = css`
  display: flex;
  gap: 8px; 
  margin-top: 8px;
`;

export const actionButton = css`
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;

  &:hover {
    transform: translateY(-1px);
  }
`;

export const editButton = css`
  ${actionButton};
  background-color: #3b82f6; /* 파랑 */
  color: white;

  &:hover {
    background-color: #2563eb;
  }
`;

export const deleteButton = css`
  ${actionButton};
  background-color: #ef4444; /* 빨강 */
  color: white;

  &:hover {
    background-color: #dc2626;
  }
`;

export const forumBody = css`
  margin: 16px 0;
`;

export const forumTitle = css`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
`;

export const forumContent = css`
  font-size: 14px;
  line-height: 1.6;
  color: #374151;
  white-space: pre-line;
`;

export const forumFooter = css`
  display: flex;
  gap: 20px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #f3f4f6;

  p {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #4b5563;
    cursor: pointer;

    svg {
      margin-right: 6px;
      font-size: 18px;
    }
  }
`;

export const likeButton = css`
  color: blue !important;
`;

export const comments = css`
  margin-top: 16px;
  background: #fff; /* 회색 배경 */
  border-radius: 8px;
  padding: 16px;
  min-height: 365px; /* 댓글 박스 높이 확보 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const commentList = css`
  flex: 1;
  margin-bottom: 12px;
  overflow-y: unset; 
`;

export const commentRow = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f3f4f6;
`;

export const commentItem = css`
  display: flex;
  align-items: center;
`;

export const subCommentItem = css`
  display: flex;
  align-items: center;
  margin-left: 5rem;
`;

export const commentProfileImage = css`
  display: flex;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

export const commentBody = css`
  background: white;
  margin-left: 5px;
  border-radius: 8px;
  padding: 1px 30px;
  max-width: 80%;
`;

export const commentAuthor = css`
  font-size: 16px;
  font-weight: 600;
  margin: 2px 0;
  color: #111827;
`;

export const commentText = css`
  font-size: 13px;
  line-height: 1.5;
  margin: 4px 0;
  color: #374151;
`;

export const tagText = css`
  margin-right: 0.5rem;
  color: #3aa3ff;
  cursor: default;
`;

export const recomment = css`
  margin: 6px 0;
  color: #888888;
  cursor: pointer;
`;

export const transactionButton = css`
  display: flex;
  gap: 6px;

  & > button {
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 12px;
    background: #ef4444;
    color: white;
    cursor: pointer;

    &:hover {
      background: #dc2626;
    }
  }
`;

export const subCommentGridContainer = css`
  display: grid;
  grid-template-columns: 6rem 31rem;
  margin-left: 5rem;
  width: 37rem;
`;

export const writeComment = css`
  display: flex;
  align-items: center;
  border-top: 1px solid #e5e7eb;
  padding-top: 8px;
`;

export const input = css`
  flex: 1;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #d1d5db;
  border-radius: 20px;
  outline: none;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`;

export const button = css`
  margin: 0 8px;
  padding: 6px 14px;
  background: #2563eb;
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-radius: 20px;
  border: none;
  cursor: pointer;

  &:hover {
    background: #1d4ed8;
  }
`;

export const loginContainer = css`
  display: flex; 
  flex-direction: column;
  justify-content: center;  
  align-items: center;      
  text-align: center;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
`;

export const loginBox = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  border-radius: 15px;
  background-color: #d66df0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

export const googleLogin = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  color: black;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
  margin-bottom: 10px;
  width: 250px;
  cursor: pointer;

  img {
    width: 20px;
    margin-right: 10px;
  }
`;

export const kakaoLogin = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fee500;
  color: #3c1e1e;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
  width: 250px;
  cursor: pointer;
  
  img {
    width: 20px;
    margin-right: 10px;
  }
`;