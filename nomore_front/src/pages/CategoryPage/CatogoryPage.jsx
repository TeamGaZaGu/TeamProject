/** @jsxImportSource @emotion/react */
import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import useMoimQuery from '../../queries/useMoimQuery';
import * as s from './styles';
import useCategoryQuery from '../../queries/useCategoryQuery';

function CategoryPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryId = parseInt(searchParams.get("categoryId"));

    const categoryQuery = useCategoryQuery();
    const categoryList = categoryQuery?.data?.data || [];
    const selectCategory = categoryList.find(category => category.categoryId === categoryId);

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

    console.log(allMoims)
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
                        const imageUrl = `${moim.moimImgPath}`;

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
                                            {categoryId === 1 ? (
                                                (() => {
                                                    const moimCategory = categoryList.find(cat => cat.categoryId === moim.categoryId);
                                                    return moimCategory ? `${moimCategory.categoryEmoji} ${moimCategory.categoryName}` : '카테고리 없음';
                                                })()
                                            ) : (
                                                `${selectCategory.categoryEmoji} ${selectCategory.categoryName}`
                                            )}
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