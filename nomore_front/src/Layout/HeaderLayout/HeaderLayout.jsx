import React, { useState } from 'react';
import { IoIosSearch } from "react-icons/io";
/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { reqCategory, reqDistrict } from '../../api/searchApi';
import { category } from '../LeftSidebarLayout/styles';
import useCategoryQuery from '../../queries/useCategoryQuery';

function HeaderLayout(props) {

    /** 지역 함수 */
    const [ districtList, setDistrictList ] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [isDistrictOpen, setIsDistrictOpen] = useState(false);

    const toggleDistrict = async () => {
        setIsDistrictOpen((prev) => !prev);
        if (isCategoryOpen) {
            setIsCategoryOpen(false);
        }

        if (districtList.length === 0) {
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
        setIsDistrictOpen(false);
    }

    /** 카테고리 함수 */
    const categoryQuery = useCategoryQuery();
    const [ categoryList, setCategoryList ] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    const toggleCategory = () => {
        setIsCategoryOpen((prev) => !prev);
        if (isDistrictOpen) {
            setIsDistrictOpen(false);
        }

        if (categoryList.length === 0) {
            const response = categoryQuery;
            setCategoryList(response?.data?.data);
        }
    }

    const handleCategoryOnChange = (e) => {
        setSelectedCategory(e.target.value);
        setIsCategoryOpen(false);
    }

    /** 검색 함수 */
    const [ searchInputValue, setSearchInputValue ] = useState("");
    
    const handleSearchInputOnChange = (e) => {
        setSearchInputValue(e.target.value);
    }

    const handleSearchInputOnClick = () => {

    }

    return (
        <div css={s.headerContainer}>
            {/* 로고 영역 */}
            <div css={s.logoSection}>
                <h1 css={s.logoTitle}>MEEU</h1>
                <h4 css={s.logoSubtitle}>meet+you</h4>
            </div>

            {/* 컨트롤 영역 */}
            <div css={s.controlSection}>
                {/* 지역 설정 드롭다운 */}
                <div css={s.dropdownContainer}>
                    <button css={s.dropdownButton} onClick={toggleDistrict}>
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
                    <button css={s.dropdownButton} onClick={toggleCategory}>
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