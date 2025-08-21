/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const PageContainer = css`
  display: flex;
  height: 85vh;
  width: 80%;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
`;

export const UserListContainer = css`
  width: 200px;
  background-color: #f9f9f9;
  border-right: 1px solid #ddd;
  overflow-y: auto;
  padding: 16px;
`;

export const UserItem = css`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
`;

export const UserProfileImage = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserDetails = css`
  display: flex;
  flex-direction: column;
`;

export const RoleTag = css`
  font-size: 12px;
  color: #555;
`;

export const ChatContainer = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const MessageList = css`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MyMessageItem = css`
  align-self: flex-end;
  background-color: #4f93ff;
  color: white;
  padding: 8px 12px;
  border-radius: 16px;
  max-width: 60%;
  word-break: break-word;
`;

export const OtherUserMessage = css`
  align-self: flex-start;
  background-color: #f1f1f1;
  color: black;
  padding: 8px 12px;
  border-radius: 16px;
  max-width: 60%;
  word-break: break-word;
`;

export const Timestamp = css`
  font-size: 10px;
  color: #888;
  margin-left: 4px;
`;

export const InputContainer = css`
  display: flex;
  padding: 8px;
  border-top: 1px solid #ddd;
  gap: 8px;
  input {
    flex: 1;
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid #ddd;
  }
  button {
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    background-color: #4f93ff;
    color: white;
    cursor: pointer;
  }
`;

