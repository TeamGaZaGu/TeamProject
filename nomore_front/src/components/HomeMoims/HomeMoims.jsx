import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from './styles';
import useMoimQuery from '../../queries/useMoimQuery';
import { baseURL } from '../../api/axios';
import { useNavigate } from 'react-router-dom';

function HomeMoims({ category }) {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const moimQuery = useMoimQuery({ page, size: 8, categoryId: category.categoryId });
    const moims = moimQuery?.data?.data?.body.contents || [];

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
    if (moims.length === 0) {
        return null;
    }

    return (
        <div css={s.categoryContainerStyle}>
            <div css={s.categoryHeaderStyle}>
                <span>{category.categoryEmoji}</span>
                <span>{category.categoryName}</span>
            </div>
            
            <ul css={s.gridContainerStyle}>
                {moims.map((moim) => {
                    const isAvailable = moim.memberCount < moim.maxMember;
                    const hasImage = moim.moimImgPath && moim.moimImgPath !== '';
                    const imageUrl = hasImage ? `${baseURL}/image${moim.moimImgPath}` : null;

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
                                        {category.categoryEmoji} {category.categoryName}
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
        </div>
    );
}

export default HomeMoims;