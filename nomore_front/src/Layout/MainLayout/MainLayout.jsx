import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as s from './styles';
import LeftSidebarLayout from '../LeftSidebarLayout/LeftSidebarLayout';
import HeaderBarLayout from '../HeaderbarLayout/HeaderbarLayout';
import Home from '../../pages/home/Home';

const MainLayout = () => {
  const [activeMenu, setActiveMenu] = useState('home');

  const handleMenuChange = (menuId) => {
    setActiveMenu(menuId);
  };

  return (
    <BrowserRouter>
      <div css={s.layoutContainer}>
        {/* 헤더 */}
        <HeaderBarLayout />
        
        {/* 사이드바 */}
        <LeftSidebarLayout 
          activeMenu={activeMenu} 
          onMenuChange={handleMenuChange} 
        />
        
        {/* 메인 콘텐츠 */}
        <main css={s.mainContent}>
          <div css={s.contentWrapper}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/recommended" element={<div>추천모임 페이지</div>} />
              <Route path="/location" element={<div>지역모임 페이지</div>} />
              <Route path="/my-view" element={<div>내가 본 모임 페이지</div>} />
              <Route path="/category-:categoryId" element={<div>카테고리 페이지</div>} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default MainLayout;