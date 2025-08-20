import { css } from "styled-components";

export const layout = css`
    display: flex;
    margin: 5rem 5rem 0;
    justify-content: space-between;
    align-items: center;
`;

export const createMoim = css`
  margin-left: auto;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  font-size: 14px;
  font-weight: 500;
  border-radius: 10px;
  height: 50px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #0056b3;
  }
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

export const loginContainer = css`
  display: flex; 
  flex-direction: column;
  justify-content: center;  
  align-items: center;      
  text-align: center;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
`;

export const loginBox = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  border-radius: 15px;
  background-color: #7a51c2;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

export const googleLogin = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  color: black;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
  margin-bottom: 10px;
  width: 250px;
  cursor: pointer;

  img {
    width: 20px;
    margin-right: 10px;
  }
`;

export const kakaoLogin = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fee500;
  color: #3c1e1e;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
  width: 250px;
  cursor: pointer;
  
  img {
    width: 20px;
    margin-right: 10px;
  }
`;