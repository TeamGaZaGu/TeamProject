/** @jsxImportSource @emotion/react */
import * as s from './styles';
import React, { useState } from 'react';
import useCategoryQuery from '../../queries/useCategoryQuery';
import api from "../../api/axios";

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

    const [profileImageFile, setProfileImageFile] = useState(null);

    const handleProfileImageChange = (e) => {
    setProfileImageFile(e.target.files[0]);
    };


    const handleSaveOnclick = async () => {
    const formData = new FormData();
    const choice = categoryList.find(prev => prev.categoryName === selectedCategory)
    console.log(choice)
    formData.append("nickName", mypageModify.nickName);
    formData.append("introduction", mypageModify.introduction);
    formData.append("categoryId", choice.categoryId); 
    if (profileImageFile) {
        formData.append("profileImg", profileImageFile);
    }

    console.log(formData);

    try {
        await api.put("/api/user/profile", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        alert("수정 완료!");
    } catch (e) {
        alert("수정 실패!");
    }
};
    
    return (
        <div css={s.layout}>
            <h1 css={s.pageTitle}>마이페이지</h1>
            
            {/* 프로필 이미지 섹션 */}
            <div css={s.profileSection}>
                <div css={s.profileImage}>
                    <img 
                        src={mypageModify.profileImgPath || "/default-profile.png"} 
                        alt="프로필 이미지" 
                        style={{
                            width: '100%', 
                            height: '100%', 
                            borderRadius: '50%', 
                            objectFit: 'cover'
                        }}
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                    <div style={{
                        display: 'none',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        color: '#666'
                    }}>
                        👤
                    </div>
                </div>
                <input
                    type="file"
                    accept="image/*"
                    name='imgPath'
                    style={{ display: 'none' }}
                    id="profileImageInput"
                    onChange={handleProfileImageChange}
                />
                <label htmlFor="profileImageInput">
                    <button 
                        css={s.profileImageUpload}
                        type="button"
                        onClick={() => document.getElementById('profileImageInput').click()}
                    >
                        이미지 업로드
                    </button>
                </label>
            </div>

            {/* 입력 필드 컨테이너 */}
            <div css={s.infoContainer}>
                {/* 닉네임 */}
                <div css={s.infoItem}>
                    <label css={s.infoLabel}>닉네임</label>
                    <input 
                        css={s.inputStyle}
                        type="text" 
                        name='nickName' 
                        value={mypageModify.nickName} 
                        placeholder="닉네임을 입력해주세요" 
                        onChange={handleMypageModifyOnChange}
                    />
                </div>

                {/* 한줄 소개 */}
                <div css={s.infoItem}>
                    <label css={s.infoLabel}>한줄 소개</label>
                    <input 
                        css={s.inputStyle}
                        type="text" 
                        name='introduction' 
                        value={mypageModify.introduction} 
                        placeholder='자신을 한줄로 소개해보세요' 
                        onChange={handleMypageModifyOnChange} 
                    />
                </div>

                {/* 관심 카테고리 */}
                <div css={s.infoItem}>
                    <label css={s.infoLabel}>관심 카테고리</label>
                    <div css={s.dropdownContainer}>
                        <button css={s.dropdownButton} onClick={handleToggleCategoryOnClick}>
                            {selectedCategory || '관심 카테고리를 선택해주세요'}
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
                </div>
            </div>

            {/* 버튼 컨테이너 */}
            <div css={s.buttonContainer}>
                <button css={s.saveButton} onClick={handleSaveOnclick}>
                    개인정보수정
                </button>
            </div>
        </div>
    );  
}
export default Mypage;