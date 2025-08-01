import React, { useState } from 'react';
import * as s from './styles';

const LeftSidebarLayout = ({ activeMenu, onMenuChange }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const menuItems = [
    { id: 'home', icon: '🏠', label: '홈' },
    { id: 'recommended', icon: '👥', label: '추천모임' },
    { id: 'location', icon: '📍', label: '지역모임' },
    { id: 'my-view', icon: '👁️', label: '내가 본 모임' },
  ];

  const categories = [
    { id: 'all', label: '전체' },
    { id: 'sports', icon: '⚽', label: '운동/스포츠' },
    { id: 'travel', icon: '🗺️', label: '시사/인맥' },
    { id: 'language', icon: '🗣️', label: '외국활/어학' },
    { id: 'hobby', icon: '🎨', label: '아웃도어/여행' },
    { id: 'music', icon: '🎵', label: '음악/악기' },
    { id: 'study', icon: '📚', label: '업종/직무' },
    { id: 'culture', icon: '🎭', label: '문화/공연/축제' },
    { id: 'game', icon: '🎮', label: '게임/오락' },
    { id: 'food', icon: '🍷', label: '공예/만들기' },
    { id: 'tech', icon: '💻', label: '댄스/무용' },
    { id: 'volunteer', icon: '🤝', label: '봉사활동' },
    { id: 'growth', icon: '📈', label: '시사/정치' },
  ];

  return (
    <aside css={s.container}>
      <div css={s.content}>
        {/* 로그인 버튼 */}
        <button 
          css={s.loginButton}
          onClick={() => setIsLoginModalOpen(true)}
        >
          로그인
        </button>

        {/* 메인 메뉴 */}
        <nav css={s.menuSection}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              css={[
                s.menuItem,
                activeMenu === item.id && s.activeMenuItem
              ]}
              onClick={() => onMenuChange(item.id)}
            >
              <span css={s.menuIcon}>{item.icon}</span>
              <span css={s.menuLabel}>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* 카테고리 섹션 */}
        <div css={s.categorySection}>
          <h3 css={s.categoryTitle}>카테고리</h3>
          <nav css={s.categoryList}>
            {categories.map((category) => (
              <button
                key={category.id}
                css={s.categoryItem}
                onClick={() => onMenuChange(`category-${category.id}`)}
              >
                {category.icon && (
                  <span css={s.categoryIcon}>{category.icon}</span>
                )}
                <span css={s.categoryLabel}>{category.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* 로그인 모달 */}
      {isLoginModalOpen && (
        <div css={s.modalOverlay} onClick={() => setIsLoginModalOpen(false)}>
          <div css={s.modalContent} onClick={(e) => e.stopPropagation()}>
            <div css={s.modalHeader}>
              <h2>로그인</h2>
              <button 
                css={s.closeButton}
                onClick={() => setIsLoginModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <div css={s.modalBody}>
              <input 
                css={s.input}
                type="email" 
                placeholder="이메일" 
              />
              <input 
                css={s.input}
                type="password" 
                placeholder="비밀번호" 
              />
              <button css={s.submitButton}>로그인</button>
              <div css={s.divider}>또는</div>
              <button css={s.socialButton}>
                구글로 로그인
              </button>
              <button css={s.socialButton}>
                카카오로 로그인
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default LeftSidebarLayout;