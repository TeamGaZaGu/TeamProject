import React, { useState } from 'react';
import { IoIosSearch } from "react-icons/io";
/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { reqCategory } from '../../api/searchApi';
import { category } from '../LeftSidebarLayout/styles';

function HeaderLayout(props) {

    /** 지역 함수 */
    const district = ["강서구", "사하구", "해운대구"];
    // const [ districtList, setDistrictList ] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [isDistrictOpen, setIsDistrictOpen] = useState(false);

    const toggleDistrict = () => {
        setIsDistrictOpen((prev) => !prev);
        if (isCategoryOpen) {
            setIsCategoryOpen(false);
        }
    };
    
    const handleDistrictOnChange = (e) => {
        setSelectedDistrict(e.target.value);
        setIsDistrictOpen(false);
    }

    /** 카테고리 함수 */
    const [ categoryList, setCategoryList ] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    const toggleCategory = async () => {
        setIsCategoryOpen((prev) => !prev);
        if (isDistrictOpen) {
            setIsDistrictOpen(false);
        }

        if (categoryList.length === 0) {
            try {
                const response = await reqCategory();
                setCategoryList(response.data);
            } catch (error) {
                console.log(error)
            }
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

    console.log(categoryList);

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
                            {district.map((dist) => (
                                <div key={dist} css={s.dropdownItem}>
                                    <label>
                                        <input
                                            type='radio'
                                            name='dist'
                                            value={dist}
                                            checked={selectedDistrict === dist}
                                            onChange={handleDistrictOnChange}
                                        />
                                        {dist}
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
                            {categoryList.map((category) => (
                                <div key={category} css={s.dropdownItem}>
                                    <label>
                                        <input
                                            type="radio"
                                            name='categ'
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