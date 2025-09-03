import { css } from "@emotion/react";

export const containerStyle = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
  flex-shrink: 0;
  overflow: auto;
  scrollbar-width: none;
  background-color: #fff;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const headerStyle = css`
  flex-shrink: 0;
  background-color: #fff;
`;

export const body = css`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

export const sidebarStyle = css`
  overflow-y: auto; 
  
   scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none; 
  }
`;

export const main = css`
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none; 
  }
`;