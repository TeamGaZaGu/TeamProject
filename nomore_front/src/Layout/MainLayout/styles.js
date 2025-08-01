import { css } from "@emotion/react";

export const root = css`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const header = css`
  width: 100%;
  height: 7rem;
  background-color: #3f6583;
`;

export const body = css`
  display: flex;
  flex: 1; /* header 제외한 남은 공간 채우기 */
`;

export const leftSideBar = css`
  width: 22rem; /* 원하는 만큼 줄이기 가능 */
  background-color: green;
`;

export const content = css`
  flex: 1;
  background-color: lightblue;
`;