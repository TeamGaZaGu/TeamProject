/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { baseURL } from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import useCategoryQuery from '../../queries/useCategoryQuery';
import { reqfindAllMoim } from '../../api/moimApi';
import { useQuery } from '@tanstack/react-query';

function HomeMoims({ category }) {
    const navigate = useNavigate();
    
    // 직접 reqfindAllMoim 호출 (파라미터 없이)
    const moimQuery = useQuery({
        queryKey: ["homePageMoims"],
        queryFn: async () => await reqfindAllMoim(), // 파라미터 없이 호출
    });
    
    const allMoims = moimQuery?.data?.data?.body?.contents || 
                     moimQuery?.data?.data || 
                     [];
    
    // 카테고리별 필터링
    const moims = category.categoryId === 1 
        ? allMoims // 전체 카테고리면 모든 모임
        : allMoims.filter(moim => moim.categoryId === category.categoryId); // 특정 카테고리만

    console.log(`${category.categoryName} 카테고리 모임:`, moims);
    console.log("전체 모임 데이터:", allMoims);

    const categoryQuery = useCategoryQuery();
    const allCategories = categoryQuery?.data?.data || [];

    const handleMoimOnClick = (moimId) => {
        navigate(`/suggest/description?moimId=${moimId}`);
    };

    const handleImageError = (e, moim) => {
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
                font-weight: 600;
                text-align: center;
                padding: 20px;
                line-height: 1.3;
            ">
                ${moim.title}
            </div>
        `;
    };

    // 모임이 없으면 렌더링하지 않음
    if (!moims || moims.length === 0) {
        return null;
    }

    return (
        <div css={s.categoryContainerStyle}>
            <div css={s.categoryHeaderStyle}>
                <span>{category.categoryEmoji}</span>
                <span>{category.categoryName}</span>
            </div>
            
            <ul css={s.gridContainerStyle}>
                {allMoims.map((moim) => {
                    const isAvailable = moim.memberCount < moim.maxMember;
                    const hasImage = moim.moimImgPath && moim.moimImgPath !== '';
                    const imageUrl = hasImage ? `${baseURL}/image${moim.moimImgPath}` : null;

                    const moimCategory = allCategories.find(cat => cat.categoryId === moim.categoryId);
                    const displayCategory = category.categoryId === 1 ? moimCategory : category;

                    return (
                        <li 
                            key={moim.moimId} 
                            css={s.moimCardStyle} 
                            onClick={() => handleMoimOnClick(moim.moimId)}
                        >
                            {hasImage ? (
                                <div css={s.imageStyle}>
                                    <img
                                        src={imageUrl}
                                        alt={moim.title}
                                        onError={(e) => handleImageError(e, moim)}
                                        loading="lazy"
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
                                    <span css={s.locationTagStyle}>
                                        📍 {moim.districtName}
                                    </span>
                                    <span css={s.categoryTagStyle}>
                                        {displayCategory?.categoryEmoji} {displayCategory?.categoryName}
                                    </span>
                                </div>

                                <div css={s.memberInfoStyle}>
                                    <div css={s.memberCountStyle}>
                                        👥 
                                        <span className="current">{moim.memberCount}</span>
                                        <span> / </span>
                                        <span className="total">{moim.maxMember}명</span>
                                    </div>

                                    <div 
                                        css={s.statusBadgeStyle} 
                                        className={isAvailable ? 'available' : 'full'}
                                    >
                                        {isAvailable ? '모집중' : '모집완료'}
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>

            {moimQuery.hasNextPage && (
                <div css={s.loadMoreContainerStyle}>
                    <button 
                        css={s.loadMoreButtonStyle}
                        onClick={handleLoadMore}
                        disabled={moimQuery.isLoading}
                    >
                        {moimQuery.isLoading ? (
                            <>
                                <span css={s.spinnerStyle}>⏳</span>
                                불러오는 중...
                            </>
                        ) : (
                            <>
                                모임 더보기
                                <span css={s.arrowStyle}>▼</span>
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}

export default HomeMoims;