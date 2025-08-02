import { css } from "@emotion/react";

export const root = css`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const header = css`
  display: flex;
  align-items: center;
  border: 0.1rem solid #dbdbdb;
  margin-bottom: 1rem;
  width: 100%;
  height: 6rem;
  background-color: #fafafa;
`;

export const logo = css`
  margin-left: 3rem;
  & > h1 {
    margin: 0;
  }

  & > h4 {
    display: flex;
    justify-content: center;
    margin: 0;
  }
`;

export const searchContainer = css`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  height: 4.1rem;
  
  & > button {
    border-radius: 1rem;
  }

  & > input {
    padding: 1rem;
    border-radius: 1rem;
    margin-left: 1.2rem;
    box-sizing: border-box;
    width: 59rem;
    height: 3.6rem;
  }
`;

export const body = css`
  display: flex;
  flex-grow: 1; 
`;

export const leftSideBar = css`
  margin-left: 1rem;
  padding: 2rem;
  border: 0.1rem solid #dbdbdb;
  border-radius: 1rem;
  height: 100%;
  width: 20rem;
  background-color: #fafafa;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

export const loginContainer = css`
  height: auto;
  padding: 1.5rem;
  border-radius: 1rem;
  background: linear-gradient(to bottom right, #7e57c2, #673ab7);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: white;

  & > h2 {
    margin: 0;
    font-size: 1.6rem;
  }

  & > button {
    width: 16rem;
    height: 3.5rem;
    border: none;
    border-radius: 0.8rem;
    font-size: 1.5rem;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    font-weight: 600;
  }

  & > button:nth-of-type(1) {
    background-color: white;
    color: black;
  }

  & > button:nth-of-type(2) {
    background-color: #fee500;
    color: #000000;
  }
`;

export const sideMenu = css`
  display: flex;
  margin-top: 2rem;
  flex-direction: column;
  gap: 1rem;

  & > button {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.8rem;
    border: none;
    background-color: #fafafa;
    border-radius: 0.8rem;
    font-size: 1.4rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #fafafa;
    }

    & > svg {
      font-size: 1.8rem;
    }
  }
`;

export const sideCategory = css`
  
  & > button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.1rem solid #fafafa;
    margin: 1rem 0;
    gap: 0.9rem; 
    width: 100%;
    font-size: 1.7rem;
    font-weight: 400;
    background-color: #fafafa;
    cursor: pointer;
  }
`;

export const content = css`
  display: flex;
  flex-grow: 1;
  background-color: lightblue;
`;

export const radioLabel = css`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  cursor: pointer;

  input[type="radio"] {
    margin-right: 8px;
  }

  &:hover {
    color: #4e89ff;
  }
`;

export const radioInput = css`
  accent-color: #4e89ff;
`;