/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import useMoimQuery from '../../queries/useMoimQuery';
import useCategoryQuery from '../../queries/useCategoryQuery';
import * as s from './styles';

function CategoryPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryId = parseInt(searchParams.get("categoryId"));

  const categoryQuery = useCategoryQuery();
  const categoryList = categoryQuery?.data?.data || [];
  const selectCategory = categoryList.find(category => category.categoryId === categoryId);

  const moimQuery = useMoimQuery({ size: 8, categoryId });
  const allMoims = moimQuery?.data?.pages?.map(page => page.data.body.contents).flat() || [];

  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && moimQuery.hasNextPage) {
          moimQuery.fetchNextPage();
        }
      },
      { rootMargin: "500px" }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [moimQuery]);

  const handleMoimOnClick = (moimId) => {
    navigate(`/moim/detail?moimId=${moimId}`);
  };

  const handleImageError = (e, moimTitle) => {
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
        ${moimTitle}
      </div>
    `;
  };

  const getCategoryDisplay = (moim) => {
    if (categoryId === 1) {
      const moimCategory = categoryList.find(cat => cat.categoryId === moim.categoryId);
      return moimCategory ? `${moimCategory.categoryEmoji} ${moimCategory.categoryName}` : '카테고리 없음';
    }
    return `${selectCategory.categoryEmoji} ${selectCategory.categoryName}`;
  };

  const truncateDescription = (description) => {
    if (!description) return '모임에 대한 자세한 설명이 곧 업데이트됩니다.';
    return description.length > 50 ? `${description.substring(0, 50)}...` : description;
  };

  if (categoryQuery.isLoading) {
    return <div>카테고리 정보를 불러오는 중...</div>;
  }

  return (
    <div css={s.containerStyle}>
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

            return (
              <div 
                key={moim.moimId} 
                css={s.moimItemStyle} 
                onClick={() => handleMoimOnClick(moim.moimId)}
              >
                <div css={s.moimImageContainerStyle}>
                  {hasImage ? (
                    <img 
                      src={moim.moimImgPath} 
                      alt={moim.title}
                      css={s.moimImageStyle}
                      onError={(e) => handleImageError(e, moim.title)}
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
                    {truncateDescription(moim.discription)}
                  </p>
                  
                  <div css={s.moimTagsStyle}>
                    <span css={s.locationTagStyle}>{moim.districtName}</span>
                    <span css={s.categoryTagStyle}>
                      {getCategoryDisplay(moim)}
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

      {moimQuery.hasNextPage && (
        <div ref={loaderRef} style={{ height: "50px" }} />
      )}
    </div>
  );
}

export default CategoryPage;