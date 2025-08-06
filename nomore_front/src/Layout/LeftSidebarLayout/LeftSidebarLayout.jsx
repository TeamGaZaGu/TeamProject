/** @jsxImportSource @emotion/react */
import * as s from './styles';
import React, { useState } from 'react';
import Oauth2 from '../../Oauth2/Oauth2';
import { IoHomeSharp } from 'react-icons/io5';
import { HiUsers } from 'react-icons/hi';
import { BsCalendar2EventFill } from 'react-icons/bs';
import useCategoryQuery from '../../queries/useCategoryQuery';
import { BiRun } from 'react-icons/bi';
import MypageButton from '../Mypage/MypageButton';
import usePrincipalQuery from '../../queries/usePrincipalQuery';

function LeftSidebarLayout(props) {

    const principalQuery = usePrincipalQuery();
    const categoryQuery = useCategoryQuery();
    const categories = categoryQuery.data?.data || [];
    
    const handleCategoryOnChange = async (e) => {
        const findCategory = categories.find(prev => prev.categoryName === e.target.value);
        try {
            const response = await reqSearch(findCategory.categoryId);
            console.log("카테고리 모임 불러오기 성공", response);
        } catch (error) {
            console.error("실패", error);
        }
    }

    console.log(principalQuery.isSuccess)

    return (
        <div css={s.leftSideBar}>
            <div>
                {principalQuery.isFetched && principalQuery.isSuccess ? <MypageButton /> : <Oauth2 />}
            </div>
            <div css={s.sideMenu}>
                <button><IoHomeSharp />홈</button>
                <button><HiUsers />추천모임</button>
                <button><BsCalendar2EventFill />정모일정</button>
            </div>
            <div css={s.category}>
                <h3>카테고리</h3>
                {categories.map((category, index) => (
                <div key={index}>
                    <label>
                        <input
                            type="radio"
                            name="category"
                            value={category.categoryName}
                            onChange={handleCategoryOnChange}
                        />
                        <span>{category.categoryEmoji} {category.categoryName}</span>
                    </label>
                </div>
                ))}
            </div>
        </div>
    );
}

export default LeftSidebarLayout;