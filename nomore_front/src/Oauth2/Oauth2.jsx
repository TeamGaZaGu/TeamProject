/** @jsxImportSource @emotion/react */
import { useQueryClient } from '@tanstack/react-query';
import * as s from './styles';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { SiKakaotalk } from 'react-icons/si';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { reqFindUser } from '../api/authApi';

function Oauth2(props) {
    const [ searchParams ] = useSearchParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const handleGoogleOnCLick = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google"
        const findUser = reqFindUser();
        if (!!findUser) {
            const accessToken = searchParams.get("accessToken");
            localStorage.setItem("AccessToken", `Bearer ${accessToken}`)
            queryClient.invalidateQueries({
                queryKey: ["principal"]
            }).then(() => {
                navigate("/")
            })
        } else {
            navigate("/auth/signup")
        }
    }
    
    const handleKakaoOnClick = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/kakao"
        const findUser = reqFindUser();
        if (!!findUser) {
            const accessToken = searchParams.get("accessToken");
            localStorage.setItem("AccessToken", `Bearer ${accessToken}`)
            queryClient.invalidateQueries({
                queryKey: ["principal"]
            }).then(() => {
                navigate("/")
            })
        } else {
            navigate("/auth/signup")
        }
    }
    
    return (
        <div css={s.loginContainer}>
            <button onClick={handleGoogleOnCLick}><FcGoogle />구글 로그인</button>
            <button onClick={handleKakaoOnClick}><SiKakaotalk />카카오 로그인</button>
        </div>
    );
}

export default Oauth2;