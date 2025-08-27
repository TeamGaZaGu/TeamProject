/** @jsxImportSource @emotion/react */
import * as s from './styles';
import React, { useState, useEffect } from 'react';
import useCategoryQuery from '../../queries/useCategoryQuery';
import api, { baseURL } from "../../api/axios";
import usePrincipalQuery from '../../queries/usePrincipalQuery';
import { reqMyMoimList } from '../../api/moimApi';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../api/userApi';

function Mypage(props) {

    const navigate = useNavigate();
    const categoryQuery = useCategoryQuery();
    const categories = categoryQuery?.data?.data || []
    const principalQuery = usePrincipalQuery();
    const user = principalQuery?.data?.data?.user;
    const [ categoryList, setCategoryList ] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const oldCategory = categories.find(prev => prev.categoryId === user.categoryId)

    const [myMoims, setMyMoims] = useState([]);

    console.log(myMoims)

    useEffect(() => {
        if (user?.userId) {
            reqMyMoimList(user.userId)
                .then(res => {
                    setMyMoims(res.data);
                })
                .catch(err => {
                    console.error(err);
                    setMyMoims([]);
                });
        }
    }, [user]);

    const handleToggleCategoryOnClick = () => {
        setIsCategoryOpen((prev) => !prev);
        setCategoryList(categories);
    }

    const handleCategoryOnChange = (e) => {
        setSelectedCategory(e.target.value);
        setIsCategoryOpen(false);
    }
 
    const mypageInputEmpty = {
        nickName: user?.nickName || '',
        introduction: user?.introduction || '',
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

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (profileImagePreview) URL.revokeObjectURL(profileImagePreview);
            setProfileImageFile(file);
            setProfileImagePreview(URL.createObjectURL(file));
        } else {
            setProfileImageFile(null);
            setProfileImagePreview(null);
        }
    };

    useEffect(() => {
        return () => {
            if (profileImagePreview) URL.revokeObjectURL(profileImagePreview);
        };
    }, [profileImagePreview]);

    const handleSaveOnclick = async () => {
        const formData = new FormData();
        const choice = categoryList.find(prev => prev.categoryName === selectedCategory)
        formData.append("nickName", mypageModify.nickName);
        formData.append("introduction", mypageModify.introduction);
        formData.append("categoryId", choice?.categoryId || user.categoryId);
        if (profileImageFile) formData.append("profileImgPath", profileImageFile);

        try {
            await api.put("/api/user/profile", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            await principalQuery.refetch();
            alert("수정 완료!");
        } catch (e) {
            alert("수정 실패!");
        }
    };

    const handleDeleteUserOnClick = async () => {

        const confirmDelete = window.confirm("정말 회원 탈퇴를 진행하시겠습니까?");
        if (!confirmDelete) return;

        try {
            await deleteUser(user.userId);
            localStorage.removeItem("AccessToken");

            await principalQuery.refetch();
            alert("회원 탈퇴가 완료되었습니다.");
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("회원 탈퇴 중 오류가 발생했습니다.");
        }
    };

    const handleMoimOnClick = (moimId) => {
        navigate(`/suggest/description?moimId=${moimId}`);
    };
    
    return (
        <div css={s.mypageLayout}>
            {/* 왼쪽 섹션 - 개인정보 수정 */}
            <div css={s.leftSection}>
                <h1 css={s.pageTitle}>마이페이지</h1>
                
                {/* 프로필 이미지 섹션 */}
                <div css={s.profileSection}>
                    <div css={s.profileImage}>
                        <img 
                            src={profileImagePreview || `${user?.profileImgPath}`}
                            alt="프로필"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                        <div className="placeholder" style={{ display: 'none' }}>👤</div>
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        id="profileImageInput"
                        style={{ display: 'none' }}
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

                {/* 입력 필드 */}
                <div css={s.infoContainer}>
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

                <div css={s.buttonContainer}>
                    <button css={s.saveButton} onClick={handleSaveOnclick}>
                        개인정보수정
                    </button>
                </div>
                <div>
                    <button css={s.dangerButton} onClick={handleDeleteUserOnClick}>
                        회원 탈퇴
                    </button>
                </div>
            </div>

            <div css={s.rightSection}>
                <h2 css={s.moimHeader}>내가 참여한 모임</h2>
                {myMoims.length === 0 ? (
                    <p>참여한 모임이 없습니다.</p>
                ) : (
                    myMoims.map(moim => (
                        <div key={moim.moimId} css={s.moimCard} onClick={() => handleMoimOnClick(moim.moimId)}>
                            <div css={s.moimImageContainer}>
                                {moim.moimImgPath ? (
                                    <img src={moim.moimImgPath} alt={moim.title} css={s.moimImage}/>
                                ) : (
                                    <div css={s.moimDefaultImage}>📭</div>
                                )}
                            </div>
                            <div css={s.moimContent}>
                                <h3>{moim.title}</h3>
                                <p>{moim.discription}</p>
                                <span>👥 {moim.memberCount}/{moim.maxMember}명</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Mypage;
