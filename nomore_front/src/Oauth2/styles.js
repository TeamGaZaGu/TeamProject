import { css } from "@emotion/react";

export const loginContainer = css`
  width: 17rem;
  height: auto;
  padding: 1.5rem;
  border-radius: 1rem;
  background: linear-gradient(to bottom right, #7e57c2, #673ab7);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: white;

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