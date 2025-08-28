/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function MypageButton(props) {
    
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const handleMypageOnClick = () => {
        navigate("/mypage")
    }
    
    const handleLogoutOnClick = async () => {
        const {isConfirmed} = await Swal.fire({
            title: "로그아웃 하시겠습니까?",
            showConfirmButton: true,
            confirmButtonText: "예",
            showCancelButton: true,
            cancelButtonText: "아니오",
        });

        if (isConfirmed) {
            localStorage.removeItem("AccessToken");
            queryClient.setQueryData(["principal"], null)
            await queryClient.invalidateQueries({
                queryKey: ["principal"],
            });
            navigate("/");
        }
    }

    return (
        <div css={s.mypageBox}>
            <button onClick={handleMypageOnClick}>마이페이지</button>
            <button onClick={handleLogoutOnClick}>로그아웃</button>
        </div>
    );
}

export default MypageButton;