/** @jsxImportSource @emotion/react */
import * as s from './styles.js';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCategoryQuery from '../../../queries/useCategoryQuery.jsx';
import { reqfindSuggestMoim } from '../../../api/moimApi.js';
import usePrincipalQuery from '../../../queries/usePrincipalQuery.jsx';
import { FcGoogle } from 'react-icons/fc';
import { SiKakaotalk } from 'react-icons/si';
import useMoimQuery from '../../../queries/useMoimQuery.jsx';

function CheckSuggestMoim(props) {
    const navigate = useNavigate();
    const principalQuery = usePrincipalQuery();
    const categoryId = principalQuery?.data?.data?.user?.categoryId;
    
    const categoryQuery = useCategoryQuery();
    const categories = categoryQuery?.data?.data || [];

    const moimQuery = useMoimQuery({ size: 8, categoryId });
    const allMoims = moimQuery?.data?.pages?.map(page => page.data.body.contents).flat() || [];
    const isLast = moimQuery?.data?.data?.body.isLast || false;

    const loaderRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                if(moimQuery.hasNextPage) {
                    moimQuery.fetchNextPage();
                }
            }
        }, { 
            rootMargin: "500px",
        });

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [loaderRef.current]);

    const handleMoimOnClick = (moimId) => {
        navigate(`/suggest/description?moimId=${moimId}`);
    };

    if (categoryQuery.isLoading) {
        return <div>카테고리 정보를 불러오는 중...</div>;
    }

    const handleCreateMoimOnClick = () => {
        navigate("/suggest/create");
    };

    if(principalQuery.isFetched && principalQuery.isSuccess) {
        return (
            <div>
                <div css={s.layout}>
                    <h2>추천모임</h2>
                    <button css={s.createMoim} onClick={handleCreateMoimOnClick}>모임 만들기</button>
                </div>
                <div css={s.moimContainer}>
                    {
                        allMoims.map((moim) => {
                            const category = categories.find(cat => cat.categoryId === moim.categoryId);
                            const categoryName = category?.categoryName;
                            const categoryEmoji = category?.categoryEmoji;

                            return (
                                <div key={moim.moimId} css={s.moimCard} onClick={() => handleMoimOnClick(moim.moimId)}>
                                    <img src={`${moim.moimImgPath}`} alt={moim.title} />
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
                
                {/* 스크롤 감지용 div */}
                {!isLast && <div ref={loaderRef} style={{ height: "50px" }} />}
            </div>
        );
    }
}

export default CheckSuggestMoim;
