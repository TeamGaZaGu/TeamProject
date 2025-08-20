import React, { useState, useEffect } from 'react';
import { IoIosSearch } from "react-icons/io";
/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { reqCategory, reqDistrict } from '../../api/searchApi';
import useCategoryQuery from '../../queries/useCategoryQuery';
import { useNavigate } from 'react-router-dom';
import useMoimQuery from '../../queries/useMoimQuery';
import { reqfindAllMoim } from '../../api/moimApi';

function HeaderLayout(props) {
    const navigate = useNavigate();

    const handleLogoOnClick = () => {
        navigate("/");
    }

    const [districtList, setDistrictList] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [isDistrictOpen, setIsDistrictOpen] = useState(false);

    const handleToggleDistrictOnClick = async () => {
        const newDistrictState = !isDistrictOpen;
        setIsDistrictOpen(newDistrictState);
        
        if (isCategoryOpen) {
            setIsCategoryOpen(false);
        }

        if (newDistrictState && districtList.length === 0) {
            try {
                const response = await reqDistrict();
                setDistrictList(response?.data);
            } catch (error) {
                console.log(error);
            }
        }
    };
    
    const handleDistrictOnChange = (e) => {
        setSelectedDistrict(e.target.value);
        const findDistrict = districtList.find(prev => prev.districtName === e.target.value);
        
        // "전체" 지역이거나 districtId가 1인 경우 빈 문자열로 설정
        const districtId = (findDistrict.districtId === 1 || findDistrict.districtName === "전체") ? "" : findDistrict.districtId;
        
        setCombinedSearch(prev => ({
            ...prev,
            districtId: districtId
        }));
        setIsDistrictOpen(false);
    }

    const categoryQuery = useCategoryQuery();
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    useEffect(() => {
        if (categoryQuery?.data?.data) {
            setCategoryList(categoryQuery.data.data);
        }
    }, [categoryQuery?.data]);

    const handleToggleCategoryOnClick = () => {
        const newCategoryState = !isCategoryOpen;
        setIsCategoryOpen(newCategoryState);
        
        if (isDistrictOpen) {
            setIsDistrictOpen(false);
        }
    }

    const handleCategoryOnChange = (e) => {
        setSelectedCategory(e.target.value);
        const findCategory = categoryList.find(prev => prev.categoryName === e.target.value);
        setCombinedSearch(prev => ({
            ...prev,
            categoryId: findCategory?.categoryId || ""
        }));
        setIsCategoryOpen(false);
    }

    const [searchInputValue, setSearchInputValue] = useState("");
    const combinedSearchEmpty = {
        districtId: "",
        categoryId: "",
        keyword: "",
    }

    const [combinedSearch, setCombinedSearch] = useState(combinedSearchEmpty);
    
    const handleSearchInputOnChange = (e) => {
        setSearchInputValue(e.target.value);
        setCombinedSearch(prev => ({
            ...prev,
            keyword: e.target.value,
        }));
    }
    
    const handleSearchInputOnClick = async () => {
    try {
        // console.log("검색 버튼 클릭됨!");
        // console.log("검색 전 combinedSearch 상태:", combinedSearch);
        
        const searchParams = {
            page: 1, 
            size: 8, 
            categoryId: combinedSearch.categoryId || null, 
            districtId: combinedSearch.districtId || null, 
            searchText: combinedSearch.keyword || null
        };
        
        // console.log("실제 전송 파라미터:", searchParams);
        
        const response = await reqfindAllMoim(searchParams);  // reqSearch → reqfindAllMoim
        
        // console.log("검색 응답 전체:", response);
        // console.log("검색 응답 데이터:", response?.data);
        
        const dataToSend = response?.data?.body?.contents || response.data;  
        
        navigate("/searchpage", {state: dataToSend});  
    } catch (error) {
        console.error("검색 실패", error);
    }
}
        
    return (
        <div css={s.headerContainer}>
            {/* 로고 영역 */}
            <div css={s.logoSection}>
                <h1 css={s.logoTitle} onClick={handleLogoOnClick}>MEEU</h1>
                <h4 css={s.logoSubtitle} onClick={handleLogoOnClick}>meet+you</h4>
            </div>

            {/* 컨트롤 영역 */}
            <div css={s.controlSection}>
                {/* 지역 설정 드롭다운 */}
                <div css={s.dropdownContainer}>
                    <button css={s.dropdownButton} onClick={handleToggleDistrictOnClick}>
                        {selectedDistrict || '지역설정'}
                    </button>
                    {isDistrictOpen && (
                        <div css={s.dropdownMenu}>
                            {districtList.map((district, index) => (
                                <div key={index} css={s.dropdownItem}>
                                    <label>
                                        <input
                                            type='radio'
                                            name='district'
                                            value={district.districtName}
                                            checked={selectedDistrict === district.districtName}
                                            onChange={handleDistrictOnChange}
                                        />
                                        {district.districtName}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* 카테고리 설정 드롭다운 */}
                <div css={s.dropdownContainer}>
                    <button css={s.dropdownButton} onClick={handleToggleCategoryOnClick}>
                        {selectedCategory || '카테고리설정'}
                    </button>
                    {isCategoryOpen && (
                        <div css={s.dropdownMenu}>
                            {categoryList.map((category, index) => (
                                <div key={index} css={s.dropdownItem}>
                                    <label>
                                        <input
                                            type="radio"
                                            name='category'
                                            value={category.categoryName}
                                            checked={selectedCategory === category.categoryName}
                                            onChange={handleCategoryOnChange}
                                        />
                                        {category.categoryName}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* 검색창 */}
                <input
                    css={s.searchInput}
                    type="text"
                    placeholder='원하는 모임을 검색해주세요'
                    value={searchInputValue}
                    onChange={handleSearchInputOnChange}
                />

                {/* 검색 버튼 */}
                <button css={s.searchButton} onClick={handleSearchInputOnClick}>
                    <IoIosSearch />
                </button>
            </div>
        </div>
    );
}

export default HeaderLayout;