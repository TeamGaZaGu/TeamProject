/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { FcGoogle } from 'react-icons/fc';
import { SiKakaotalk } from 'react-icons/si';
import { baseURL } from '../api/axios';

function Oauth2({ customStyle }) {


    const handleGoogleOnClick = () => {
        window.location.href = `${baseURL}/oauth2/authorization/google`;
    };

    const handleKakaoOnClick = () => {
        window.location.href = `${baseURL}/oauth2/authorization/kakao`;
    };

    return (
        <div css={customStyle || s.loginContainer}>
            <button onClick={handleGoogleOnClick}><FcGoogle />구글 로그인</button>
            <button onClick={handleKakaoOnClick}><SiKakaotalk />카카오 로그인</button>
        </div>
    );
}

export default Oauth2;