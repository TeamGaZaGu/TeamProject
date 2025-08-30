/** @jsxImportSource @emotion/react */
import * as s from './styles.js';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useCategoryQuery from '../../../queries/useCategoryQuery.jsx';
import usePrincipalQuery from '../../../queries/usePrincipalQuery.jsx';
import useMoimQuery from '../../../queries/useMoimQuery.jsx';
import Oauth2 from '../../../Oauth2/Oauth2.jsx';

function FindMoim() {
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
            if (entries[0].isIntersecting && moimQuery.hasNextPage) {
                moimQuery.fetchNextPage();
            }
        }, { rootMargin: "500px" });

        if (loaderRef.current) observer.observe(loaderRef.current);

        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [loaderRef.current]);

    const handleMoimOnClick = (moimId) => {
        navigate(`/moim/detail?moimId=${moimId}`);
    };

    const handleCreateMoimOnClick = () => {
        navigate("/moim/create");
    };

    if (categoryQuery.isLoading) {
        return <div>카테고리 정보를 불러오는 중...</div>;
    }

    if (principalQuery.isFetched && principalQuery.isSuccess) {
        return (
            <div css={s.containerStyle}>
                {/* 헤더 */}
                <div css={s.layout}>
                    <h2>추천모임</h2>
                    <button css={s.createMoim} onClick={handleCreateMoimOnClick}>모임 만들기</button>
                </div>

                {/* 모임 리스트 */}
                {!allMoims || allMoims.length === 0 ? (
                    <div css={s.noMoimStyle}>
                        <div className="icon">📭</div>
                        <h3>추천 모임이 없습니다.</h3>
                        <p>새로운 모임이 곧 추가될 예정입니다.</p>
                    </div>
                    ) : (
                    <div css={s.moimListStyle}>
                        {allMoims.map((moim) => {
                            const category = categories.find(cat => cat.categoryId === moim.categoryId);
                            const categoryName = category?.categoryName || '카테고리 없음';
                            const categoryEmoji = category?.categoryEmoji || '📂';
                            const isAvailable = moim.memberCount < moim.maxMember;
                            const hasImage = moim.moimImgPath && moim.moimImgPath !== '';
                            const imageUrl = `${moim.moimImgPath}`;

                            return (
                                <div key={moim.moimId} css={s.moimItemFlatStyle} onClick={() => handleMoimOnClick(moim.moimId)}>
                                    {/* 이미지 */}
                                    <div css={s.moimImageContainerStyle}>
                                        {hasImage ? (
                                            <img src={imageUrl} alt={moim.title} css={s.moimImageStyle} />
                                        ) : (
                                            <div css={s.defaultImageStyle}>{moim.title}</div>
                                        )}
                                    </div>

                                    {/* 내용 */}
                                    <div css={s.moimContentStyle}>
                                        <div css={s.moimTitleRowStyle}>
                                            <h3 css={s.moimTitleStyle}>{moim.title}</h3>
                                            <div css={s.statusBadgeStyle} className={isAvailable ? 'available' : 'full'}>
                                                {isAvailable ? '모집중' : '모집완료'}
                                            </div>
                                        </div>
                                        <p css={s.moimDescriptionStyle}>
                                            {moim.discription 
                                                ? (moim.discription.length > 50 
                                                    ? `${moim.discription.substring(0, 50)}...` 
                                                    : moim.discription
                                                )
                                                : '모임에 대한 자세한 설명이 곧 업데이트됩니다.'
                                            }
                                        </p>
                                        <div css={s.moimTagsStyle}>
                                            <span css={s.locationTagStyle}>{moim.districtName}</span>
                                            <span css={s.categoryTagStyle}>{categoryEmoji} {categoryName}</span>
                                            <span css={s.memberCountTagStyle}>👥 {moim.memberCount}/{moim.maxMember}명</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                {!isLast && <div ref={loaderRef} style={{ height: "50px" }} />}
            </div>
        );
    }
    return <div css={s.loginContainer}>
                <h2>로그인이 필요한 페이지입니다</h2>
                <Oauth2 customStyle={s.customLoginStyle} />
            </div>;
}

export default FindMoim;
