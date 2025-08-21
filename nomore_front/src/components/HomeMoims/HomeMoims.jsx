/** @jsxImportSource @emotion/react */
import * as s from './styles';
import useMoimQuery from '../../queries/useMoimQuery';
import { useNavigate } from 'react-router-dom';
import useCategoryQuery from '../../queries/useCategoryQuery';

function HomeMoims({ category }) {
    const navigate = useNavigate();
    const moimQuery = useMoimQuery({ size: 8, categoryId: category.categoryId });
    const categoryQuery = useCategoryQuery();
    const categoryList = categoryQuery?.data?.data;
    const allMoims = moimQuery?.data?.pages?.map(page => page.data.body.contents).flat() || [];

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

    const handleLoadMore = () => {
        moimQuery.fetchNextPage();
    };

    if (allMoims.length === 0 && !moimQuery.isLoading) {
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
                    const imageUrl = moim.moimImgPath;

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
                                        {category.categoryId === 1 ? (
                                            (() => {
                                                const moimCategory = categoryList.find(cat => cat.categoryId === moim.categoryId);
                                                return moimCategory ? `${moimCategory.categoryEmoji} ${moimCategory.categoryName}` : '카테고리 없음';
                                            })()
                                        ) : (
                                            `${category.categoryEmoji} ${category.categoryName}`
                                        )}
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