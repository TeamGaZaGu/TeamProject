/** @jsxImportSource @emotion/react */
import * as s from './styles';
import React, { useEffect, useState } from 'react';
import Oauth2 from '../../Oauth2/Oauth2';
import { IoHomeSharp } from 'react-icons/io5';
import { HiUsers } from 'react-icons/hi';
import { BsCalendar2EventFill } from 'react-icons/bs';
import useCategoryQuery from '../../queries/useCategoryQuery';
import { BiRun } from 'react-icons/bi';
import MypageButton from '../Mypage/MypageButton';
import usePrincipalQuery from '../../queries/usePrincipalQuery';
import { useNavigate } from 'react-router-dom';
import { FaUserSlash } from 'react-icons/fa';
import { reqAllUser } from '../../api/userApi';
import { reqReport } from '../../api/reportApi';
import { MdReport } from 'react-icons/md';

function LeftSidebarLayout(props) {
    const navigate = useNavigate();
    const principalQuery = usePrincipalQuery();
    const categoryQuery = useCategoryQuery();
    const categories = categoryQuery.data?.data || [];
    const userRole = principalQuery?.data?.data?.user?.userRole;
    
    const handleHometOnClick = () => {
        navigate("/")
    }

    const handleSuggestOnClick = () => {
        navigate("/suggest/find")
    }

    const handleCategoryOnClick = (categoryId) => {
        navigate(`/category?categoryId=${categoryId}`);
    }

    const handleUserManagementOnClick =  async () => {
        const response =  await reqAllUser();
        navigate(`/userManagement`, {state: response?.data});
    }
    
    const handleReportManagementOnClick =  async () => {
        const response =  await reqReport();
        // console.log(response?.data?.body);
        navigate(`/reportManagement`, {state: response?.data?.body});
    }

    return (
        <div css={s.leftSideBar}>
            <div css={s.loginContainer}>
                <div>
                    {principalQuery.isFetched && principalQuery.isSuccess ? <MypageButton /> : <Oauth2 />}
                </div>
            </div>
            <div css={s.sideMenu}>
                <button onClick={handleHometOnClick}><IoHomeSharp />홈</button>
                <button onClick={handleSuggestOnClick}><HiUsers />추천모임</button>
                {
                    userRole === "ROLE_ADMIN" && (
                        <>
                            <button onClick={handleUserManagementOnClick}><FaUserSlash />유저관리</button>
                            <button onClick={handleReportManagementOnClick}><MdReport />신고관리</button>
                        </>
                    )
                }
            </div>
            <div css={s.category}>
                <h3>카테고리</h3>
                {categories.map((category) => (
                <div key={category.categoryId} onClick={() => handleCategoryOnClick(category.categoryId)}>
                    <label>
                        <input
                            type="radio"
                            name="category"
                            value={category.categoryName}
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