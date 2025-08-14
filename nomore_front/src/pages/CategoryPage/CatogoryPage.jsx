/** @jsxImportSource @emotion/react */
import { useNavigate, useSearchParams } from 'react-router-dom';
import React from 'react';
import useMoimQuery from '../../queries/useMoimQuery';
import { baseURL } from '../../api/axios';
import * as s from './styles';
import useCategoryQuery from '../../queries/useCategoryQuery';
import { category } from '../../Layout/LeftSidebarLayout/styles';

function CatogoryPage(props) {

    const navigate = useNavigate();
    const [ searchParam ] = useSearchParams();
    const categoryId = parseInt(searchParam.get("categoryId")); // 숫자로 변환
    const categoryQuery = useCategoryQuery();
    const categoryList = categoryQuery?.data?.data;
    const selectCategory = categoryList.find(category => category.categoryId === categoryId);
    const moimQuery = useMoimQuery();
    const moimList = moimQuery?.data?.data;
    
    // find → filter로 변경하고 타입 비교 주의
    let categoryMoim = moimList?.filter(moim => moim.categoryId === categoryId);

    if (categoryId === 1) {
        categoryMoim = moimList;
    }
    
    console.log('categoryId from URL:', categoryId);
    console.log('filtered moims:', categoryMoim);

    const handleMoimOnClick = (moimId) => {
        navigate(`/suggest/description?moimId=${moimId}`);
    }

    return (
        <div css={s.containerStyle}>
            {!categoryMoim || categoryMoim.length === 0 ? (
                <div css={s.noMoimStyle}>
                    <div className="icon">📭</div>
                    <h3>해당 카테고리에 모임이 없습니다.</h3>
                    <p>새로운 모임이 곧 추가될 예정입니다.</p>
                </div>
            ) : (
                <ul css={s.gridContainerStyle}>
                    {categoryMoim.map((moim) => {
                        const isAvailable = moim.memberCount < moim.maxMember;
                        const hasImage = moim.moimImgPath && moim.moimImgPath !== '';
                        const imageUrl = hasImage ? `${baseURL}/image${moim.moimImgPath}` : null;
                        console.log('individual moim:', moim);
                        
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
                                        <span css={s.categoryTagStyle}>{selectCategory.categoryEmoji} {selectCategory.categoryName}</span>
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
        </div>
    );
}

export default CatogoryPage;