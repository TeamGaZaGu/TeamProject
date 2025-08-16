/** @jsxImportSource @emotion/react */
import * as s from './styles.js';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { reqDeleteMoim, reqJoinMoim, reqMoimUserList, reqSelectMoim } from '../../../api/moimApi';
import useCategoryQuery from '../../../queries/useCategoryQuery.jsx';
import { IoClipboard, IoClipboardOutline, IoClose } from 'react-icons/io5';
import { RiHome7Fill, RiHome7Line } from 'react-icons/ri';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { useQueryClient } from '@tanstack/react-query';
import { baseURL } from '../../../api/axios.js';
import { reqUserBlock } from '../../../api/userBlockApi.js';
import usePrincipalQuery from '../../../queries/usePrincipalQuery.jsx';
import useUserBlockListQuery from '../../../queries/useUserBlockListQuery.jsx';

// ✅ 추가된 import
import {
    useGetBlockedUsersQuery,
    useBlockUserMutation,
    useUnblockUserMutation,
} from "../../../queries/useUserBlockQuery";
import {
    useGetMoimBannedUsersQuery,
    useMoimBanUserMutation,
    useMoimUnbanUserMutation,
} from "../../../queries/useMoimBanQuery";

function DescriptionSuggestPage(props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [searchParam] = useSearchParams();
    const moimId = searchParam.get("moimId")

    const [activeTab, setActiveTab] = useState("home");

    const [moim, setMoim] = useState("");
    const [userList, setUserList] = useState([]);

    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const categoryQuery = useCategoryQuery();
    const categories = categoryQuery?.data?.data || [];
    const getCategory = categories.find(category => category.categoryId === moim.categoryId)

    const principalQuery = usePrincipalQuery();
    const userBlockListQuery = useUserBlockListQuery();

    const { data: blockedUserIds = [] } = useGetBlockedUsersQuery();
    const blockUserMutation = useBlockUserMutation();
    const unblockUserMutation = useUnblockUserMutation();

    const { data: bannedUserIds = [] } = useGetMoimBannedUsersQuery(moimId);
    const banUserMutation = useMoimBanUserMutation();
    const unbanUserMutation = useMoimUnbanUserMutation();

    useEffect(() => {
        const fetchMoim = async () => {
            try {
                const response = await reqSelectMoim(moimId);
                setMoim(response.data);
            } catch (err) {
                setError("모임 정보를 불러오는 데 실패했습니다.");
                console.error(err);
            }
        };

        const fetchMoimUserList = async () => {
            try {
                const response = await reqMoimUserList(moimId);
                setUserList(response?.data);
            } catch (error) {
                console.log(error);
            }
        }

        if (moimId) {
            fetchMoim();
            fetchMoimUserList();
        }
    }, []);

    const handleJoinMoimOnClick = () => {
        reqJoinMoim(moimId)
    }

    const handleModifyOnClick = () => {
        navigate(`/suggest/modify?moimId=${moimId}`)
    }

    const handleDeleteOnClick = async () => {
        await reqDeleteMoim(moimId)
        queryClient.invalidateQueries(["moimpage"])
        alert("모임 삭제 성공")
        await navigate("/")
    }

    // 유저 정보 모달 열기
    const handleUserInformationOnClick = (userId) => {
        const user = userList.find(u => u.userId === userId);
        if (user) {
            setSelectedUser(user);
            setIsModalOpen(true);
        }
    }

    // 모달 닫기
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    }

    // 모달 바깥 영역 클릭 시 닫기
    const handleModalBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            handleCloseModal();
        }
    }

    const handleUserBlockOnClick = async (userId, nickName) => {
        const isConfirmed = window.confirm(`"${nickName}" 님을 차단하시겠습니까?`);
        if (!isConfirmed) return;

        try {
            await reqUserBlock(userId);
        } catch (error) {
            console.log('사용자 차단 실패:', error);
        }
    }

    return (
        <div css={s.container}>
            <div css={s.header}>
                <div>
                    <button
                        css={activeTab === "home" ? s.click : s.unClick}
                        onClick={() => setActiveTab("home")}
                    >
                        {activeTab === "home" ? <RiHome7Fill /> : <RiHome7Line />}
                        Home
                    </button>
                    <button
                        css={activeTab === "board" ? s.click : s.unClick}
                        onClick={() => setActiveTab("board")}
                    >
                        {activeTab === "board" ? <IoClipboard /> : <IoClipboardOutline />}
                        게시판
                    </button>
                </div>
                <div>
                    <button css={s.Transaction} onClick={handleModifyOnClick}><FaPen />수정</button>
                    <button css={s.Transaction} onClick={handleDeleteOnClick}><FaTrashAlt />삭제</button>
                </div>
            </div>

            {activeTab === "home" && (
                <div css={s.mainContent}>
                    <div css={s.moimInfo}>
                        <img src={`http://localhost:8080/image${moim.moimImgPath}`} alt="모임 썸네일" />
                        <div css={s.moimTextInfo}>
                            <h1 css={s.moimTitle}>{moim.title}</h1>
                            <div css={s.moimMeta}>
                                <span>{getCategory?.categoryEmoji}{getCategory?.categoryName}</span> · <span>{moim.districtName}</span> · <span>{moim.memberCount}/{moim.maxMember}</span>
                            </div>
                        </div>
                    </div>

                    <div css={s.section}>
                        <h2 css={s.sectionTitle}>모임 소개</h2>
                        <div css={s.description}>
                            <p>{moim.discription}</p>
                        </div>
                    </div>

                    <div css={s.section}>
                        <h2 css={s.sectionTitle}>모임 멤버</h2>
                        <div css={s.memberSection}>
                            {userList?.map((user) => {
                                const roleEmoji = user.moimRole === "OWNER" ? "👑" : "👤";
                                return (
                                    <button key={user.userId} css={s.memberCard} onClick={() => handleUserInformationOnClick(user.userId)}>
                                        <img
                                            src={`${baseURL}/image${user.profileImgPath}`}
                                            alt="프로필"
                                            css={s.profileImage}
                                        />
                                        <div css={s.defaultAvatar}>{roleEmoji}</div>
                                        <div css={s.memberInfo}>
                                            <span css={s.memberRole}>{user.nickName}</span>
                                            <span css={s.memberName}>{user.introduction}</span>
                                        </div>
                                    </button>
                                )
                            })
                            }
                        </div>
                    </div>
                </div>
            )}
            {activeTab === "board" && (
                <div>
                    <button onClick={() => navigate(`/forum/create?moimId=${moimId}`)}>게시글 작성</button>
                </div>
            )}

            <div css={s.bottomActions}>
                <button css={s.joinButton} onClick={handleJoinMoimOnClick}>
                    모임 가입하기
                </button>
            </div>

            {/* 유저 상세 정보 모달 */}
            {isModalOpen && selectedUser && (
                <div css={s.modalOverlay} onClick={handleModalBackdropClick}>
                    <div css={s.modalContent}>
                        <div css={s.modalHeader}>
                            <h3>멤버 프로필</h3>
                            <button css={s.closeButton} onClick={handleCloseModal}>
                                <IoClose />
                            </button>
                        </div>
                        <div css={s.modalBody}>
                            <div css={s.userProfile}>
                                <img
                                    src={`${baseURL}/image${selectedUser.profileImgPath}`}
                                    alt="프로필"
                                    css={s.modalProfileImage}
                                />
                                <div css={s.userDetails}>
                                    <div css={s.userNameRow}>
                                        <h4>{selectedUser.nickName}</h4>
                                        <div>{selectedUser.birthDate}</div>
                                        <span css={s.roleTag}>
                                            {selectedUser.moimRole === "OWNER" ? "👑 방장" : "👤 멤버"}
                                        </span>
                                    </div>
                                    <div css={s.userCategory}>
                                        {categoryQuery?.data?.data?.find(category => category.categoryId === selectedUser.categoryId)?.categoryEmoji}
                                        {categoryQuery?.data?.data?.find(category => category.categoryId === selectedUser.categoryId)?.categoryName}
                                    </div>
                                    {selectedUser.introduction && (
                                        <p css={s.userIntroduction}>{selectedUser.introduction}</p>
                                    )}
                                    <button onClick={() => handleUserBlockOnClick(selectedUser.userId, selectedUser.nickName)}>차단하기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DescriptionSuggestPage;
