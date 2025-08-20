import { css } from "@emotion/react";

export const container = css`
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

export const ChatContainer = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
`;

export const MessageList = css`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

export const MessageItem = css`
  display: inline-block;
  max-width: 70%;
  word-break: break-word;
  padding: 8px 12px;
  border-radius: 16px;
`;

export const MyMessageItem = css`
  ${MessageItem};
  align-self: flex-end; /* 오른쪽 정렬 */
  background-color: #4f92ff;
  color: white;
  border-radius: 16px 16px 0 16px;
`;

export const OtherUserMessage = css`
  ${MessageItem};
  align-self: flex-start; /* 왼쪽 정렬 */
  background-color: #4f93ff;
  color: black;
  border-radius: 16px 16px 16px 0;
`;

export const InputContainer = css`
  display: flex;
  gap: 8px;
  padding: 8px;
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

export const Timestamp = css`
  font-size: 0.9rem;
  color: #000000;
  margin-left: 4px;
`;
