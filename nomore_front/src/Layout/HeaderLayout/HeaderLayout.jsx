import React, { useState, useEffect } from 'react';
import { IoIosSearch } from "react-icons/io";
/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { reqDistrict } from '../../api/searchApi';
import useCategoryQuery from '../../queries/useCategoryQuery';
import { useNavigate } from 'react-router-dom';
import MEEULogo from '../../MEEU.png';

function HeaderLayout(props) {
    const navigate = useNavigate();

    const combinedSearchEmpty = {
        districtId: "",
        categoryId: "",
        keyword: "",
    }
    const [combinedSearch, setCombinedSearch] = useState(combinedSearchEmpty);
    const [searchInputValue, setSearchInputValue] = useState("");

    const [districtList, setDistrictList] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [isDistrictOpen, setIsDistrictOpen] = useState(false);

    const categoryQuery = useCategoryQuery();
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    const handleLogoOnClick = () => {
        setCombinedSearch(combinedSearchEmpty);
        setSearchInputValue("");
        setSelectedDistrict('');
        setSelectedCategory('');
        setIsDistrictOpen(false);
        setIsCategoryOpen(false);
        navigate("/");
    }

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
        
        const districtId = (findDistrict.districtId === 1 || findDistrict.districtName === "전체") 
            ? null : findDistrict.districtId;
            
        setCombinedSearch(prev => ({
            ...prev,
            districtId: districtId
        }));
        setIsDistrictOpen(false);
    }

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
        
        const categoryId = (findCategory.categoryId === 1 || findCategory.categoryName === "전체") 
            ? null : findCategory.categoryId;
            
        setCombinedSearch(prev => ({
            ...prev,
            categoryId: categoryId
        }));
        setIsCategoryOpen(false);
    }

    const handleSearchInputOnChange = (e) => {
        setSearchInputValue(e.target.value);
        setCombinedSearch(prev => ({
            ...prev,
            keyword: e.target.value,
        }));
    }

    const handleSearchInputOnClick = async () => {
        try {
            navigate("/searchpage", {
                state: {
                    categoryId: combinedSearch.categoryId || null,
                    districtId: combinedSearch.districtId || null,
                    searchText: combinedSearch.keyword || null
                }
            });
        } catch (error) {
            console.error("검색 실패", error);
        }
    }

    const handleSearchInputOnKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleSearchInputOnClick();
        }
    }
    
    return (
        <div css={s.headerContainer}>
            <div css={s.logoSection} onClick={handleLogoOnClick}>
                <img src={MEEULogo} alt="MEEU Logo" css={s.logoImage} />
                <div css={s.logoTextContainer}>
                    <h1 css={s.logoTitle}>MEEU</h1>
                </div>
            </div>

            <div css={s.controlSection}>
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

                <input
                    css={s.searchInput}
                    type="text"
                    placeholder='원하는 모임을 검색해주세요'
                    value={searchInputValue}
                    onChange={handleSearchInputOnChange}
                    onKeyDown={handleSearchInputOnKeyDown}
                />

                <button css={s.searchButton} onClick={handleSearchInputOnClick}>
                    <IoIosSearch />
                </button>
            </div>
        </div>
    );
}

export default HeaderLayout;