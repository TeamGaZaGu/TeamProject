<<<<<<< HEAD
import React from 'react';

function Mypage(props) {

    const profileItems = [
        { id: '' }
    ]    
=======
/** @jsxImportSource @emotion/react */
import * as s from './styles';
import React, { useState } from 'react';
import useCategoryQuery from '../../queries/useCategoryQuery';

function Mypage(props) {

    const categoryQuery = useCategoryQuery();
    const [ categoryList, setCategoryList ] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    const handleToggleCategoryOnClick = () => {
        setIsCategoryOpen((prev) => !prev);
        if (isCategoryOpen) {
            setIsCategoryOpen(false);
        }
        const response = categoryQuery;
        setCategoryList(response?.data?.data);

        setMypageModify(prev => ({
            ...prev,
            category: selectedCategory,
        }))
    }

    const handleCategoryOnChange = (e) => {
        setSelectedCategory(e.target.value);
        setIsCategoryOpen(false);
    }
 
    const mypageInputEmpty = {
        profileImgPath: "",
        nickName: "",
        introduction: "",
        category: "",
    }

    const [ mypageModify, setMypageModify ] = useState(mypageInputEmpty);

    const handleMypageModifyOnChange = (e) => {
        setMypageModify(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    console.log(mypageModify)
>>>>>>> 53-mypage-각-기능들-구현

    return (
        <div>
            <h1>마이페이지</h1>
            <div>
<<<<<<< HEAD
                <input type="text" name='nickName'placeholder="닉네임" />
            </div>
=======
                <h3>프로필 이미지</h3>
                <img alt="미리보기" width="120" />
                <input
                    type="file"
                    accept="image/*"
                    name='imgPath'
                />
                <button>이미지 업로드</button>
            </div>
            <div>
                <input type="text" name='nickName' value={mypageModify.nickName} placeholder="닉네임" onChange={handleMypageModifyOnChange}/>
            </div>
            <div>
                <input type="text" name='introduction' value={mypageModify.introduction} placeholder='한줄 소개' onChange={handleMypageModifyOnChange} />
            </div>
            <div css={s.dropdownContainer}>
                <button css={s.dropdownButton} onClick={handleToggleCategoryOnClick}>
                    {selectedCategory || '관심 카테고리'}
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
>>>>>>> 53-mypage-각-기능들-구현
            <button>개인정보수정</button>
        </div>
    );  
}

export default Mypage;