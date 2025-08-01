import React from 'react';
import * as s from './styles';

const HeaderBarLayout = () => {
  return (
    <header css={s.container}>
      <div css={s.content}>
        {/* 로고 */}
        <div css={s.logo}>
          <div css={s.logoIcon}>소</div>
          <span css={s.logoText}>소모임</span>
        </div>

        {/* 지역 선택 드롭다운 */}
        <div css={s.locationSelector}>
          <span>창원시</span>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M6 8L0 0H12L6 8Z" fill="#666"/>
          </svg>
        </div>

        {/* 검색창 */}
        <div css={s.searchContainer}>
          <input
            css={s.searchInput}
            type="text"
            placeholder="모임 이름 또는 태그검색"
          />
          <button css={s.searchButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                stroke="#666"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* 알림 아이콘 */}
        <button css={s.notificationButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
              stroke="#666"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default HeaderBarLayout;