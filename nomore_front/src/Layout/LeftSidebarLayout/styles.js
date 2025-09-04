import { css } from "@emotion/react";

export const leftSideBar = css`
  padding: 2rem 1.6rem;
  border-right: 0.1rem solid #fff;
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

export const loginContainer = css`
  margin: 0 0 2rem 0;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ddd;
`;

export const sideMenu = css`
  display: flex;
  flex-direction: column;
  margin-top: 18px;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ddd;

  button {
    display: flex;
    align-items: center;
    gap: 16px;
    background: none;
    border: none;
    font-size: 16px;
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
  margin-top: 14px;
  margin-left: 5px;
  min-width: 0;
  padding-bottom: 1rem;

  h3 {
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 14px;
    color: #222;
  }

  div {
    margin-bottom: 10px;

    label {
      display: flex;
      align-items: center;
      gap: 16px;
      cursor: pointer;
      color: #555;

      input[type="radio"] {
        cursor: pointer;
        width: 16px;
        height: 16px;
      }

      span {
        color: #888;
        font-size: 16px;
      }

      &:hover {
        color: #0052cc;
      }
    }
  }
`;

export const createMoimContainer = css`
  margin: -1rem 0 2rem 0;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ddd;
`;

export const createMoimButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  background-color: #007bff;
  color: white;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  padding: 14px; 
  border-radius: 8px;
  transition: background-color 0.2s ease;
  margin: 0; 

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    transform: translateY(1px);
  }
`;