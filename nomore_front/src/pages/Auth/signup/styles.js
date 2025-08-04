import { css } from '@emotion/react';

export const layout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
  padding: 2rem;
  width: 100%;
  background-color: #fafafa;
  border-radius: 1rem;
  height: 100vh;
`;

export const inputContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 40rem;
  gap: 1.5rem;
  max-height: 60vh;
  padding-bottom: 2rem;
`;

export const inputStyle = css`
  padding: 1rem;
  border-radius: 0.8rem;
  border: 1px solid #dbdbdb;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border: 1px solid #7e57c2;
  }
`;

export const categoryContainer = css`
  margin-top: 2rem;
  width: 100%;
  max-width: 40rem;
`;

export const categoryTitle = css`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

export const buttonContainer = css`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 40rem;
`;

export const signupButton = css`
  padding: 1rem 2rem;
  background-color: #7e57c2;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #673ab7;
  }
`;