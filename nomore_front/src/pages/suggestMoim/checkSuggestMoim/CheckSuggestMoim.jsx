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

    const [ page, setPage ] = useState(1);
    const [ moimList, setMoimList ] = useState([]);

    const moimQuery = useMoimQuery({ page, size: 8, categoryId });
    const currentMoims = moimQuery?.data?.data?.body.contents || [];
    const isLast = moimQuery?.data?.data?.body.isLast || false;

    const loaderRef = useRef(null);

    useEffect(() => {
        if (currentMoims.length > 0) {
            if (page === 1) {
                setMoimList(currentMoims);
            } else {
                setMoimList(prev => [...prev, ...currentMoims]);
            }
        }
    }, [currentMoims, page]);

    useEffect(() => {
        if (isLast) return; // 마지막 페이지면 더 안 불러옴

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage(prev => prev + 1);
            }
        }, { 
            rootMargin: "200px",  // 👈 바닥 200px 전에 미리 불러오기
        });

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [isLast]);

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
                        moimList.map((moim) => {
                            const category = categories.find(cat => cat.categoryId === moim.categoryId);
                            const categoryName = category?.categoryName;
                            const categoryEmoji = category?.categoryEmoji;

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
                
                {/* 스크롤 감지용 div */}
                {!isLast && <div ref={loaderRef} style={{ height: "50px" }} />}
            </div>
        );
    }
}

export default CheckSuggestMoim;
