import { css } from "styled-components";

export const layout = css`
    display: flex;
    justify-content: space-between;
`;

export const moimContainer = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

export const moimCard = css`
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  transition: transform 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.4rem;
    color: #555;
    margin: 0.25rem 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;