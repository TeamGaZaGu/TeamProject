import { css } from "@emotion/react";

export const container = css`
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;
export const ChatContainer = css`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const MessageList = css`
  flex: 1;
  overflow-y: auto;
`;

export const MessageItem = css`
  padding: 4px 8px;
`;


export const InputContainer = css`
  display: flex;
  gap: 8px;
  padding: 8px;
`;
