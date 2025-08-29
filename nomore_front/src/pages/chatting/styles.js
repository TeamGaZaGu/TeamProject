/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const PageContainer = css`
  display: flex;
  flex: 1;
  height: 80vh;
  width: 100%;
  max-width: 1200px;
  margin: 15px auto 0;
  border: 1px solid #9bbbd4;
  border-radius: 8px;
  overflow: hidden;
  background-color: skyblue;
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
  justify-content: center;
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
  overflow: hidden;
`;

export const MessageList = css`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MyMessageWrapper = css`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
`;

export const OtherMessageWrapper = css`
  display: flex;
  align-items: flex-end;
  margin-bottom: 8px;
`;

export const MyMessageItem = css`
  align-self: flex-end;
  background-color: #fef01b;
  color: black;
  padding: 8px 12px;
  border-radius: 16px;
  max-width: 60%;
  word-break: break-word;

  strong {
    display: none;
  }
`;

export const OtherUserMessage = css`
  align-self: flex-start;
  background-color: #ffffff;
  color: black;
  padding: 8px 12px;
  border-radius: 16px;
  max-width: 60%;
  word-break: break-word;
`;

export const SmallProfileImage = css`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 8px;
`;

export const Timestamp = css`
  font-size: 10px;
  color: #556677;
  margin-left: 4px;
`;

export const InputContainer = css`
  display: flex;
  padding: 8px;
  border-top: 1px solid #ddd;
  gap: 8px;
  background-color: #ffffff;

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