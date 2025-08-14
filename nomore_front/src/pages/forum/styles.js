import { css } from "styled-components";

export const layout = css`
  max-width: 1024px;
  margin: 0 auto;
  padding: 24px;
  background-color: white;

  h1 {
    font-size: 24px;
    font-weight: bold;
    color: #111827;
    margin-bottom: 8px;
  }

  p {
    color: #6b7280;
    margin-bottom: 32px;
  }
`;

export const category = css`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  p {
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    margin: 0;
    margin-right: 4px;
  }

  span {
    color: #ef4444;
    font-weight: bold;
  }
`;

export const selectBox = css`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  font-size: 14px;
  margin-bottom: 24px;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }

  option {
    padding: 8px;
  }
`;

export const title = css`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  p {
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    margin: 0;
    margin-right: 4px;
  }

  span {
    color: #ef4444;
    font-weight: bold;
  }
`;

export const titleInput = css`
  width: 100%;
  padding: 8px 12px;
  box-sizing: border-box;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  font-size: 14px;
  margin-bottom: 24px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const content = css`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  p {
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    margin: 0;
    margin-right: 4px;
  }

  span {
    color: #ef4444;
    font-weight: bold;
  }
`;

export const contentTextarea = css`
  width: 100%;
  padding: 8px 12px;
  box-sizing: border-box;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  font-size: 14px;
  resize: vertical;
  min-height: 200px;
  font-family: inherit;
  margin-bottom: 24px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const imgbox = css`
  margin-bottom: 24px;

  &:hover:not(:disabled) {
      color: #374151;
      border-color: #9ca3af;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    span {
      margin-top: 4px;
    }
`;

export const imgCounter = css`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;

export const imgContainer = css`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-start;
`;

export const uploadButton = css`
  width: 100px;
  height: 100px;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
  background: none;
  font-size: 12px;
`;

export const previewImg = css`
  position: relative;

  &:hover > button {
    opacity: 1;
  }

  & > img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #d1d5db;
  }

  & > button {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 24px;
    height: 24px;
    background-color: #ef4444;
    color: white;
    border-radius: 50%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s ease;

    &:hover {
      background-color: #dc2626;
    }
  }
`;

export const errorMessage = css`
  font-size: 14px;
  color: #ef4444;
  margin-top: 8px;
`;

export const submitContainer = css`
  display: flex;
  justify-content: flex-end;
  padding-top: 24px;
  margin-top: 24px;
  border-top: 1px solid #e5e7eb;
`;

export const submitButton = css`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 24px;
  background-color: #3b82f6;
  color: white;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2563eb;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;
