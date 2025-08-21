/** @jsxImportSource @emotion/react */
import * as s from './styles';
import React, { useState, useEffect } from 'react';
import useCategoryQuery from '../../queries/useCategoryQuery';
import api, { baseURL } from "../../api/axios";
import usePrincipalQuery from '../../queries/usePrincipalQuery';

function Mypage(props) {

    const categoryQuery = useCategoryQuery();
    const categories = categoryQuery?.data?.data || []
    const principalQuery = usePrincipalQuery();
    const user = principalQuery?.data?.data?.user;
    const [ categoryList, setCategoryList ] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const oldCategory = categories.find(prev => prev.categoryId === user.categoryId)

    const handleToggleCategoryOnClick = () => {
        setIsCategoryOpen((prev) => !prev);
        if (isCategoryOpen) {
            setIsCategoryOpen(false);
        }
        setCategoryList(categories)
    }

    const handleCategoryOnChange = (e) => {
        setSelectedCategory(e.target.value);
        setIsCategoryOpen(false);
    }
 
    const mypageInputEmpty = {
        nickName: user.nickName,
        introduction: user.introduction,
    }

    

    const [ mypageModify, setMypageModify ] = useState(mypageInputEmpty);

    const handleMypageModifyOnChange = (e) => {
        setMypageModify(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const [profileImageFile, setProfileImageFile] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState(null);

    // 파일 선택 시 미리보기 URL 생성
    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        console.log('선택된 파일:', file); // 디버깅
        
        if (file) {
            // 이전 미리보기 URL이 있다면 메모리에서 해제
            if (profileImagePreview) {
                URL.revokeObjectURL(profileImagePreview);
            }
            
            // 새 미리보기 URL 생성
            const previewUrl = URL.createObjectURL(file);
            console.log('생성된 미리보기 URL:', previewUrl); // 디버깅
            setProfileImageFile(file);
            setProfileImagePreview(previewUrl);
        } else {
            // 파일이 선택되지 않은 경우 초기화
            console.log('파일 선택 취소됨'); // 디버깅
            setProfileImageFile(null);
            setProfileImagePreview(null);
        }
    };

    // 컴포넌트 언마운트 시 메모리 정리
    useEffect(() => {
        return () => {
            if (profileImagePreview) {
                URL.revokeObjectURL(profileImagePreview);
            }
        };
    }, [profileImagePreview]);

    const handleSaveOnclick = async () => {
        const formData = new FormData();
        const choice = categoryList.find(prev => prev.categoryName === selectedCategory)
        formData.append("nickName", mypageModify.nickName);
        formData.append("introduction", mypageModify.introduction);
        formData.append("categoryId", choice.categoryId);
        if (profileImageFile) {
            formData.append("profileImg", profileImageFile);
        }

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
                        src={profileImagePreview || `${user.profileImgPath}`}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            borderRadius: '0'
                        }}
                        onLoad={(e) => {
                            e.target.style.width = '100%';
                            e.target.style.height = '100%';
                            e.target.style.objectFit = 'cover';
                            e.target.style.display = 'block';
                        }}
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                    <div className="placeholder" style={{
                        display: 'none'
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
                <button 
                    css={s.profileImageUpload}
                    type="button"
                    onClick={() => document.getElementById('profileImageInput').click()}
                >
                    이미지 업로드
                </button>
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
                        onChange={handleMypageModifyOnChange}
                    />
                </div>

                {/* 관심 카테고리 */}
                <div css={s.infoItem}>
                    <label css={s.infoLabel}>관심 카테고리</label>
                    <div css={s.dropdownContainer}>
                        <button css={s.dropdownButton} onClick={handleToggleCategoryOnClick}>
                            {selectedCategory || oldCategory?.categoryName}
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