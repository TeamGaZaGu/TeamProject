/** @jsxImportSource @emotion/react */
import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
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
            {/* 카테고리 헤더 */}
            <div css={s.categoryHeaderStyle}>
                <span css={s.categoryIconStyle}>
                    {selectCategory?.categoryEmoji || '📂'}
                </span>
                <span css={s.categoryNameStyle}>
                    {selectCategory?.categoryName || '전체'}
                </span>
            </div>

            {!allMoims || allMoims.length === 0 ? (
                <div css={s.noMoimStyle}>
                    <div className="icon">📭</div>
                    <h3>해당 카테고리에 모임이 없습니다.</h3>
                    <p>새로운 모임이 곧 추가될 예정입니다.</p>
                </div>
            ) : (
                <div css={s.moimListStyle}>
                    {allMoims.map((moim) => {
                        const isAvailable = moim.memberCount < moim.maxMember;
                        const hasImage = moim.moimImgPath && moim.moimImgPath !== '';
                        const imageUrl = `${moim.moimImgPath}`;

                        return (
                            <div key={moim.moimId} css={s.moimItemStyle} onClick={() => handleMoimOnClick(moim.moimId)}>
                                <div css={s.moimImageContainerStyle}>
                                    {hasImage ? (
                                        <img 
                                            src={imageUrl} 
                                            alt={moim.title}
                                            css={s.moimImageStyle}
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
                                                        font-size: 14px;
                                                        font-weight: bold;
                                                        text-align: center;
                                                        padding: 8px;
                                                        border-radius: 8px;
                                                    ">
                                                        ${moim.title}
                                                    </div>
                                                `;
                                            }}
                                        />
                                    ) : (
                                        <div css={s.defaultImageStyle}>
                                            {moim.title}
                                        </div>
                                    )}
                                </div>

                                <div css={s.moimContentStyle}>
                                    <div css={s.moimTitleRowStyle}>
                                        <h3 css={s.moimTitleStyle}>{moim.title}</h3>
                                        <div css={s.statusBadgeStyle} className={isAvailable ? 'available' : 'full'}>
                                            {isAvailable ? '모집중' : '모집완료'}
                                        </div>
                                    </div>
                                    
                                    <p css={s.moimDescriptionStyle}>
                                        {moim.discription || '모임에 대한 자세한 설명이 곧 업데이트됩니다.'}
                                    </p>
                                    
                                    <div css={s.moimTagsStyle}>
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
                                        <span css={s.memberCountTagStyle}>
                                            👥 {moim.memberCount}/{moim.maxMember}명
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* 스크롤 감지용 div */}
            {!isLast && <div ref={loaderRef} style={{ height: "50px" }} />}
        </div>
    );
}

export default CategoryPage;