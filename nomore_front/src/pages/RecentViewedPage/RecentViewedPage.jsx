/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecentlyViewed, clearRecentlyViewed } from '../../utils/recentViewedUtils';
import * as s from './styles';

function RecentViewedPage() {
    const navigate = useNavigate();
    const [recentlyViewed, setRecentlyViewed] = useState([]);

    useEffect(() => {
        setRecentlyViewed(getRecentlyViewed());
    }, []);

    const handleMoimOnClick = (moimId) => {
        navigate(`/moim/detail?moimId=${moimId}`);
    };

    const handleClearAll = () => {
        if (confirm('최근 본 모임을 모두 삭제하시겠습니까?')) {
            clearRecentlyViewed();
            setRecentlyViewed([]);
        }
    };

    if (recentlyViewed.length === 0) {
        return (
            <div css={s.container}>
                <div css={s.header}>
                    <h1 css={s.title}>최근 본 모임</h1>
                </div>
                <div css={s.emptyState}>
                    <div css={s.emptyIcon}>📭</div>
                    <h3>최근 본 모임이 없습니다</h3>
                    <p>모임을 둘러보고 관심있는 모임을 확인해보세요!</p>
                </div>
            </div>
        );
    }

    return (
        <div css={s.container}>
            <div css={s.header}>
                <h1 css={s.title}>최근 본 모임</h1>
                <div css={s.headerActions}>
                    <span css={s.count}>총 {recentlyViewed.length}개</span>
                    <button css={s.clearButton} onClick={handleClearAll}>
                        전체 삭제
                    </button>
                </div>
            </div>

            <div css={s.moimGrid}>
                {recentlyViewed.map((moim) => {
                    const isAvailable = moim.memberCount < moim.maxMember;
                    const hasImage = moim.moimImgPath && moim.moimImgPath !== '';

                    return (
                        <div
                            key={moim.moimId}
                            css={s.moimCard}
                            onClick={() => handleMoimOnClick(moim.moimId)}
                        >
                            <div css={s.imageContainer}>
                                {hasImage ? (
                                    <img 
                                        src={moim.moimImgPath} 
                                        alt={moim.title}
                                        css={s.moimImage}
                                    />
                                ) : (
                                    <div css={s.defaultImage}>
                                        {moim.title}
                                    </div>
                                )}
                            </div>

                            <div css={s.moimInfo}>
                                <h3 css={s.moimTitle}>{moim.title}</h3>
                                <p css={s.moimDescription}>{moim.discription}</p>
                                
                                <div css={s.tags}>
                                    <span css={s.locationTag}>
                                        📍 {moim.districtName}
                                    </span>
                                    <span css={s.categoryTag}>
                                        {moim.categoryEmoji} {moim.categoryName}
                                    </span>
                                </div>

                                <div css={s.moimFooter}>
                                    <div css={s.memberCount}>
                                        👥 {moim.memberCount}/{moim.maxMember}명
                                    </div>
                                    <div css={`${s.statusBadge} ${isAvailable ? 'available' : 'full'}`}>
                                        {isAvailable ? '모집중' : '모집완료'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default RecentViewedPage;