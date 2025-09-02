/** @jsxImportSource @emotion/react */
import * as s from './styles';
import React, { useState, useEffect } from 'react';
import useCategoryQuery from '../../queries/useCategoryQuery';
import api, { baseURL } from "../../api/axios";
import usePrincipalQuery from '../../queries/usePrincipalQuery';
import { reqCheckUserIsOwner, reqMyMoimList } from '../../api/moimApi';
import { useNavigate } from 'react-router-dom';
import { deleteUser, reqModifyUserBlob } from '../../api/userApi';
import { reqGetForumsWithParams } from '../../api/forumApi';
import { useQueryClient } from '@tanstack/react-query';

function Mypage(props) {

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const categoryQuery = useCategoryQuery();
    const categories = categoryQuery?.data?.data || []
    const principalQuery = usePrincipalQuery();
    const user = principalQuery?.data?.data?.user;
    const [ modifyUser, setModifyUser ] = useState({}); 
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const oldCategory = categories.find(prev => prev.categoryId === user.categoryId)

    const [myMoims, setMyMoims] = useState([]);
    const [myPosts, setMyPosts] = useState([]); // [추가]
    useEffect(() => {( async() => {
        const userImg = await reqModifyUserBlob({url: user.profileImgPath, imageConfigsName: "profile"});
        const fileName = user.profileImgPath.substring(user.profileImgPath.indexOf("_") + 1);
        const getUserImg = {
            ...user,
            profileImgPath: {
                file: new File([userImg.data], fileName, { type: userImg.headers['content-type'] }),
                url: URL.createObjectURL(userImg.data),
            }
        }
        setModifyUser(getUserImg)
    })()}, [])

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

    // 내가 참여한 모임별 게시판을 불러와 "내가 쓴 글"만 모으기 
    useEffect(() => {
        if (user?.userId) {
            api.get(`/api/user/admin/user/${user.userId}/posts`)
                .then(response => {
                    setMyPosts(response.data || []);
                })
                .catch(error => {
                    console.error('내가 쓴 글 조회 실패:', error);
                    setMyPosts([]);
                });
        }
    }, [user?.userId]);

    const handleToggleCategoryOnClick = () => {
        setIsCategoryOpen((prev) => !prev);
        setCategoryList(categories);
    }

    const handleCategoryOnChange = (e) => {
        setSelectedCategory(e.target.value);
        setIsCategoryOpen(false);
    }

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];

        setModifyUser(prev => ({
            ...prev,
            profileImgPath: {
            file,
            url: URL.createObjectURL(file),
            }
        }));
    };

    const handleMypageModifyOnChange = (e) => {
        setModifyUser(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSaveOnclick = async () => {
        const formData = new FormData();
        const choice = categoryList.find(prev => prev.categoryName === selectedCategory)
        formData.append("nickName", modifyUser.nickName);
        formData.append("introduction", modifyUser.introduction);
        formData.append("categoryId", choice?.categoryId || user.categoryId);
        formData.append("profileImgPath", modifyUser.profileImgPath.file)

        try {
            await api.put("/api/user/profile", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            await principalQuery.refetch();
            alert("수정 완료!");
            navigate("/")
        } catch (e) {
            alert("수정 실패!");
        }
    };

    const handleDeleteUserOnClick = async () => {
        try {
            const response = await reqCheckUserIsOwner();
            const hasOwnerMoims = response.data.hasOwnerMoims;
            
            if (hasOwnerMoims) {
                alert("방장으로 있는 모임이 있습니다. 모든 모임의 방장 권한을 넘긴 후 탈퇴해주세요.");
                return;
            }

            const confirmDelete = window.confirm("정말 회원 탈퇴를 진행하시겠습니까?");
            if (!confirmDelete) return;

            await deleteUser(user.userId);
            localStorage.removeItem("AccessToken");
            
            queryClient.invalidateQueries(['moims']);
            queryClient.invalidateQueries(['principal']);

            await principalQuery.refetch();
            alert("회원 탈퇴가 완료되었습니다.");
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("회원 탈퇴 중 오류가 발생했습니다.");
        } 
    };

    const handleMoimOnClick = (moimId) => {
        navigate(`/moim/detail?moimId=${moimId}`);
    };

    const handleMyForumOnClick = (mf) => {
        console.log('클릭한 게시글 데이터:', mf); // 이 로그를  
        const forumId = mf.forumId ?? mf.id ?? mf.postId;
        const moimId = mf.moimId ?? mf.moim?.moimId;
        console.log('forumId:', forumId, 'moimId:', moimId); // 이 로그도 추가
        if (!forumId || !moimId) return;
        navigate(`/forum/detail?moimId=${moimId}&forumId=${forumId}`);
    };

    return (
        <div css={s.mypageLayout}>
            <div css={s.leftSection}>
                <h1 css={s.pageTitle}>마이페이지</h1>
                <div css={s.profileSection}>
                    <div css={s.profileImage}>
                        <img
                            src={`${modifyUser?.profileImgPath?.url}`}
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
                            value={modifyUser.nickName}
                            onChange={handleMypageModifyOnChange}
                        />
                    </div>

                    <div css={s.infoItem}>
                        <label css={s.infoLabel}>한줄 소개</label>
                        <input
                            css={s.inputStyle}
                            type="text"
                            name='introduction'
                            value={modifyUser.introduction}
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

            <div css={s.rightTwoCol}>
                {/* [추가] 패널 1: 내가 참여한 모임 */}
                <section css={s.panel}>
                    <h2 css={s.moimHeader}>내가 참여한 모임</h2>
                    {myMoims.length === 0 ? (
                        <p>참여한 모임이 없습니다.</p>
                    ) : (
                        myMoims.map(moim => (
                            <div key={moim.moimId} css={s.moimCard} onClick={() => handleMoimOnClick(moim.moimId)}>
                                <div css={s.moimImageContainer}>
                                    {moim.moimImgPath ? (
                                        <img
                                            src={moim.moimImgPath}
                                            alt={moim.title}
                                            css={s.moimImage}
                                        />
                                    ) : (
                                        <div css={s.moimDefaultImage}>📭</div>
                                    )}
                                </div>
                                <div css={s.moimContent}>
                                    <h3>{moim.title}</h3>
                                    <p>
                                        {moim.discription 
                                            ? (moim.discription.length > 50 
                                                ? `${moim.discription.substring(0, 50)}...` 
                                                : moim.discription
                                            )
                                            : '모임에 대한 자세한 설명이 곧 업데이트됩니다.'
                                        }
                                    </p>
                                    <span>👥 {moim.memberCount}/{moim.maxMember}명</span>
                                </div>
                            </div>
                        ))
                    )}
                </section>

                {/* [추가] 패널 2: 내가 쓴 글 */}
                <section css={s.panel}>
                    <h2 css={s.moimHeader}>내가 쓴 글</h2>
                    {myPosts.length === 0 ? (
                        <p>작성한 글이 없습니다.</p>
                    ) : (
                        <div css={s.postList}>
                            {myPosts.map((p) => (
                                <div
                                    key={p.forumId ?? p.id ?? p.postId}
                                    className="item"
                                    onClick={() => handleMyForumOnClick(p)}
                                >
                                    <div className="title">{p.forumTitle ?? p.postTitle ?? '(제목 없음)'}</div>
                                    <div className="meta">
                                        <span>
                                            📅 {new Date(p.createdAt ?? p.regDate ?? p.created_at ?? Date.now())
                                                .toLocaleDateString()}
                                        </span>
                                        {p.moimTitle && <span>🏷 {p.moimTitle}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

export default Mypage;
