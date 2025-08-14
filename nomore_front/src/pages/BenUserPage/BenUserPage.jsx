/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

const container = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: #f3f4f6;
    position: relative;
`;

const box = css`
    text-align: center;
`;

const subTitle = css`
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: 4rem;
`;

const homeButton = css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border: 0.1rem solid #dbdbdb;
    border-radius: 0.8rem;
    padding: 1rem 1.5rem;
    width: fit-content;
    background-color: white;
    text-decoration: none;
    color: #222222;
    font-size: 1.6rem;
    font-weight: 500;

    &:hover {
        background-color: #fafafa;
    }

    &:active {
        background-color: #eeeeee;
    }
`;

function BenUserPage(props) {
    return (
        <div css={container}>
            <div css={box}>
                <h2 css={subTitle}>이용이 제한된 사용자입니다.</h2>
                <Link css={homeButton}>고객센터 문의하기</Link>
            </div>
        </div>
    );
}

export default BenUserPage;