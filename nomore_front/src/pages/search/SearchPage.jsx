// SearchPage.jsx - 기존 코드에서 최소 수정

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import * as s from './styles';
import useCategoryQuery from '../../queries/useCategoryQuery'; 
import { baseURL } from '../../api/axios';

function SearchPage(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const searchMoim = location.state;
    
    // 카테고리 정보 가져오기 (카테고리 이름 표시용)
    const categoryQuery = useCategoryQuery();
    const categories = categoryQuery?.data?.data || [];
    
    console.log(searchMoim)

    const handleMoimOnClick = (moimId) => {
        navigate(`/suggest/description?moimId=${moimId}`);
    }

    return (
        <div css={s.containerStyle}>
            <div css={s.headerStyle}>
                <h2>검색 결과</h2>
                {searchMoim && searchMoim.length > 0 && (
                    <p className="result-count">총 {searchMoim.length}개의 모임을 찾았습니다</p>
                )}
            </div>

            {!searchMoim || searchMoim.length === 0 ? (
                <div css={s.noResultStyle}>
                    <div className="icon">🔍</div>
                    <h3>검색 결과가 없습니다</h3>
                    <p>다른 검색어나 필터를 사용해보세요.</p>
                </div>
            ) : (
                <ul css={s.gridContainerStyle}>
                    {searchMoim.map((moim) => {
                        // 두 가지 API 응답 구조 모두 지원
                        const memberCount = moim.moimMemberCount || moim.memberCount || 0;
                        const maxMember = moim.moimMaxMember || moim.maxMember || 0;
                        const imagePath = moim.moimImagePath || moim.moimImgPath;
                        const title = moim.moimTitle || moim.title || "제목 없음";
                        const description = moim.moimDiscription || moim.discription;
                        const districtName = moim.districtName || "지역 정보 없음";
                        
                        // 카테고리 정보 처리 (categoryName이 없으면 categoryId로 찾기)
                        let categoryName = moim.categoryName;
                        if (!categoryName && moim.categoryId) {
                            const category = categories.find(cat => cat.categoryId === moim.categoryId);
                            categoryName = category ? `${category.categoryEmoji} ${category.categoryName}` : "카테고리 정보 없음";
                        }
                        
                        const isAvailable = memberCount < maxMember;
                        const hasImage = imagePath && imagePath !== '' && imagePath !== 'null';  // null 체크 추가
                        const imageUrl = hasImage ? `${baseURL}/image${imagePath}` : null;
                        
                        return (
                            <li key={moim.moimId} css={s.moimCardStyle} onClick={() => handleMoimOnClick(moim.moimId)}>
                                {hasImage ? (
                                    <div css={s.imageStyle}>
                                        <img src={imageUrl} alt={title} />
                                    </div>
                                ) : (
                                    <div css={s.defaultImageStyle}>
                                        {title}
                                    </div>
                                )}
                                
                                <div css={s.contentStyle}>
                                    <h3 css={s.titleStyle}>{title}</h3>
                                    
                                    <p css={s.descriptionStyle}>
                                        {description || '모임에 대한 자세한 설명이 곧 업데이트됩니다.'}
                                    </p>
                                    
                                    <div css={s.tagsStyle}>
                                        <span css={s.locationTagStyle}>📍 {districtName}</span>
                                        <span css={s.categoryTagStyle}>{categoryName}</span>  {/* 처리된 카테고리명 사용 */}
                                    </div>
                                    
                                    <div css={s.memberInfoStyle}>
                                        <div css={s.memberCountStyle}>
                                            👥 <span className="current">{memberCount}</span>  {/* 처리된 멤버수 사용 */}
                                            <span> / </span>
                                            <span className="total">{maxMember}명</span>  {/* 처리된 최대멤버수 사용 */}
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

export default SearchPage;