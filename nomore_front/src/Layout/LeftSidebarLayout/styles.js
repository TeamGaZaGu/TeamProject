import { css } from "@emotion/react";

export const leftSideBar = css`
  padding: 2rem 1.6rem;
  border-right: 1px solid #eee;
  box-sizing: border-box;
  width: 24rem;
  height: 100vh;
  font-size: 1.4rem;
  color: #333;
  overflow-y: auto;
  scrollbar-width: none; 
  background-color: #fff;

  &::-webkit-scrollbar {
    display: none; 
  }
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

export const sideMenu = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 20px;
  min-width: 0;

  button {
    display: flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: none;
    font-size: 14px;
    color: #444;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 6px;
    transition: background-color 0.15s ease;

    &:hover, &:focus {
      background-color: #f0f0f0;
      outline: none;
    }
  }
`;

export const category = css`
  margin-top: 32px;
  min-width: 0;
  h3 {
    font-weight: 700;
    font-size: 15px;
    margin-bottom: 10px;
    color: #222;
  }

  div {
    margin-bottom: 10px;

    label {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      color: #555;

      input[type="radio"] {
        cursor: pointer;
      }

      svg {
        color: #888;
        font-size: 18px;
      }

      &:hover {
        color: #0052cc;
      }
    }
  }
`;