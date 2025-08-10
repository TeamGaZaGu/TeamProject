/** @jsxImportSource @emotion/react */
import * as s from './styles.js';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCategoryQuery from '../../../queries/useCategoryQuery';
import { reqfindSuggestMoim } from '../../../api/moimApi.js';
import usePrincipalQuery from '../../../queries/usePrincipalQuery.jsx';
import { FcGoogle } from 'react-icons/fc';
import { SiKakaotalk } from 'react-icons/si';

function FindSuggestPage(props) {
    const principalQuery = usePrincipalQuery();
    const navigate = useNavigate();
    const [moimList, setMoimList] = useState([]);
    const categoryQuery = useCategoryQuery();
    const categories = categoryQuery?.data?.data || []

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await reqfindSuggestMoim();
                const list = response?.data;
                setMoimList(list);
            } catch (error) {
                console.error('추천 모임 불러오기 실패:', error);
            }
        };
        fetchData();
    }, []);


    const handleCreateMoimOnClick = () => {
        navigate("/suggest/create")
    }

    const handleMoimOnClick = (moimId) => {
        navigate(`/suggest/description?moimId=${moimId}`);
    }

    if(principalQuery.isFetched && principalQuery.isSuccess) {
        return (
            <div>
                <div css={s.layout} onClick={handleCreateMoimOnClick}>
                    <h2>추천모임</h2>
                    <button>모임 만들기</button>
                </div>
               <div css={s.moimContainer}>
                {
                    moimList.map((moim) => {
                        const category = categories.find(cat => cat.categoryId === moim.categoryId);
                        const categoryName = category?.categoryName;
                        const categoryEmoji = category.categoryEmoji
        
                        return (
                            <div key={moim.moimId} css={s.moimCard} onClick={() => handleMoimOnClick(moim.moimId)}>
                                <img src={`http://localhost:8080/image${moim.moimImgPath}`} alt={moim.title} />
                                <h3>{moim.title}</h3>
                                <p>{moim.discription}</p>
                                <div>
                                    <p>👥 {moim.memberCount}명</p>
                                    <p>{categoryEmoji}{categoryName}</p>
                                </div>
                            </div>
                        );
                    })
                }
                </div>
            </div>
        );
    }
    return (
        <div css={s.loginContainer}>
            <h2>로그인이 필요한 페이지입니다</h2>
            <div css={s.loginBox}>
            <button css={s.googleLogin} onClick={() => { window.location.href = "http://localhost:8080/oauth2/authorization/google"; }}>
                <FcGoogle />
                구글 로그인
            </button>
            <button css={s.kakaoLogin} onClick={() => { window.location.href = "http://localhost:8080/oauth2/authorization/kakao"; }}>
               <SiKakaotalk />
                카카오 로그인
            </button>
            </div>
        </div>
    );
}

export default FindSuggestPage;