import { css } from '@emotion/react';

export const layoutContainer = css`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
`;

export const mainContent = css`
  margin-left: 240px;
  margin-top: 64px;
  flex: 1;
  overflow-y: auto;
  padding: 0;
`;

export const contentWrapper = css`
  min-height: calc(100vh - 64px);
  background: #f8f9fa;
`;