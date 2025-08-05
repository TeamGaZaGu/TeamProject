/** @jsxImportSource @emotion/react */
import * as s from './styles';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { SiKakaotalk } from 'react-icons/si';

function Oauth2(props) {

    const handleGoogleOnCLick = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google"
    }

    const handleKakaoOnClick = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/kakao"
    }

    return (
        <div css={s.loginContainer}>
            <button onClick={handleGoogleOnCLick}><FcGoogle />구글 로그인</button>
            <button onClick={handleKakaoOnClick}><SiKakaotalk />카카오 로그인</button>
        </div>
    );
}

export default Oauth2;