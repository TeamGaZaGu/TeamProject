/** @jsxImportSource @emotion/react */
import * as s from './styles';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Oauth2 from '../../Oauth2/Oauth2';
import MypageButton from '../Mypage/MypageButton';
import usePrincipalQuery from '../../queries/usePrincipalQuery';
import { reqAllUser } from '../../api/userApi';
import { reqReport } from '../../api/reportApi';
import { IoHomeSharp } from 'react-icons/io5';
import { HiUsers } from 'react-icons/hi';
import { FaUserSlash } from 'react-icons/fa';
import { MdReport } from 'react-icons/md';
import useCategoryQuery from '../../queries/useCategoryQuery';
import { BsClockHistory } from 'react-icons/bs';

function LeftSidebarLayout() {
    const navigate = useNavigate();
    const principalQuery = usePrincipalQuery();
    const categoryQuery = useCategoryQuery();
    const categories = categoryQuery.data?.data || [];
    const userRole = principalQuery?.data?.data?.user?.userRole;

    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleHomeOnClick = () => {
        setSelectedCategory(null);
        navigate("/");
    };

    const handleSuggestOnClick = () => {
        setSelectedCategory(null);
        navigate("/moim/find");
    };

    const handleCategoryOnClick = (categoryId) => {
        setSelectedCategory(categoryId);
        navigate(`/category?categoryId=${categoryId}`);
    };

    const handleUserManagementOnClick = async () => {
        const response = await reqAllUser();
        navigate(`/userManagement`, { state: response?.data });
    };

    const handleReportManagementOnClick = async () => {
        const response = await reqReport();
        navigate(`/reportManagement`, { state: response?.data?.body });
    };

    const handleRecentViewedOnClick = () => {
        navigate("/recent-viewed")
    }

    return (
        <div css={s.leftSideBar}>
            <div css={s.loginContainer}>
                {principalQuery.isFetched && principalQuery.isSuccess ? <MypageButton /> : <Oauth2 />}
            </div>
            <div css={s.sideMenu}>
                <button onClick={handleHomeOnClick}><IoHomeSharp />홈</button>
                <button onClick={handleSuggestOnClick}><HiUsers />추천모임</button>
                <button onClick={handleRecentViewedOnClick}><BsClockHistory />최근 본 모임</button>
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
                                checked={selectedCategory === category.categoryId}
                                readOnly
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
