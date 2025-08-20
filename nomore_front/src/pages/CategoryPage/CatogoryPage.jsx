/** @jsxImportSource @emotion/react */
import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import useMoimQuery from '../../queries/useMoimQuery';
import { baseURL } from '../../api/axios';
import * as s from './styles';
import useCategoryQuery from '../../queries/useCategoryQuery';

function CategoryPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryId = parseInt(searchParams.get("categoryId"));

    const categoryQuery = useCategoryQuery();
    const categoryList = categoryQuery?.data?.data || [];

    const [page, setPage] = useState(1);
    const moimQuery = useMoimQuery({ 
        queryKey: ["categoryPageMoims"],
        queryFn: async () => await reqfindAllMoim()
     });
    const allMoims = moimQuery?.data?.data?.body?.contents || 
                     moimQuery?.data?.data || 
                     [];
    const moims = categoryId === 1 
        ? allMoims 
        : allMoims.filter(moim => moim.categoryId === categoryId);

    const selectCategory = categoryList.find(category => category.categoryId === categoryId);

    const moimQuery = useMoimQuery({ size: 8, categoryId });
    const allMoims = moimQuery?.data?.pages?.map(page => page.data.body.contents).flat() || [];
    const isLast = moimQuery?.data?.data?.body.isLast || false;
    console.log("!!");
    console.log(allMoims);

    const loaderRef = useRef(null);

    // 새 데이터가 들어오면 allMoims에 누적
    // useEffect(() => {
    //     if (currentMoims.length > 0) {
    //         if (page === 1) {
    //             setAllMoims(currentMoims);
    //         } else {
    //             setAllMoims(prev => [...prev, ...currentMoims]);
    //         }
    //     }
    // }, [currentMoims]);

    // 무한 스크롤 (IntersectionObserver)
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                if(moimQuery.hasNextPage) {
                    moimQuery.fetchNextPage();
                }
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
    }, [loaderRef.current]);

    const handleMoimOnClick = (moimId) => {
        navigate(`/suggest/description?moimId=${moimId}`);
    };

    if (categoryQuery.isLoading) {
        return <div>카테고리 정보를 불러오는 중...</div>;
    }

    return (
        <div css={s.containerStyle}>
            {!allMoims || allMoims.length === 0 ? (
                <div css={s.noMoimStyle}>
                    <div className="icon">📭</div>
                    <h3>해당 카테고리에 모임이 없습니다.</h3>
                    <p>새로운 모임이 곧 추가될 예정입니다.</p>
                </div>
            ) : (
                <ul css={s.gridContainerStyle}>
                    {allMoims.map((moim) => {
                        const isAvailable = moim.memberCount < moim.maxMember;
                        const hasImage = moim.moimImgPath && moim.moimImgPath !== '';
                        const imageUrl = hasImage ? `${baseURL}/image${moim.moimImgPath}` : null;

                        return (
                            <li key={moim.moimId} css={s.moimCardStyle} onClick={() => handleMoimOnClick(moim.moimId)}>
                                {hasImage ? (
                                    <div css={s.imageStyle}>
                                        <img 
                                            src={imageUrl} 
                                            alt={moim.title}
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.parentElement.innerHTML = `
                                                    <div style="
                                                        width: 100%;
                                                        height: 100%;
                                                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                                        display: flex;
                                                        align-items: center;
                                                        justify-content: center;
                                                        color: white;
                                                        font-size: 18px;
                                                        font-weight: bold;
                                                    ">
                                                        ${moim.title}
                                                    </div>
                                                `;
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div css={s.defaultImageStyle}>
                                        {moim.title}
                                    </div>
                                )}

                                <div css={s.contentStyle}>
                                    <h3 css={s.titleStyle}>{moim.title}</h3>
                                    <p css={s.descriptionStyle}>
                                        {moim.discription || '모임에 대한 자세한 설명이 곧 업데이트됩니다.'}
                                    </p>
                                    <div css={s.tagsStyle}>
                                        <span css={s.locationTagStyle}>{moim.districtName}</span>
                                        <span css={s.categoryTagStyle}>
                                            {selectCategory?.categoryEmoji} {selectCategory?.categoryName}
                                        </span>
                                    </div>
                                    <div css={s.memberInfoStyle}>
                                        <div css={s.memberCountStyle}>
                                            👥 <span className="current">{moim.memberCount}</span>
                                            <span> / </span>
                                            <span className="total">{moim.maxMember}명</span>
                                        </div>
                                        <div css={s.statusBadgeStyle} className={isAvailable ? 'available' : 'full'}>
                                            {isAvailable ? '모집중' : '모집완료'}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}

            {/* 스크롤 감지용 div */}
            {!isLast && <div ref={loaderRef} style={{ height: "50px" }} />}
        </div>
    );
}

export default CategoryPage;
