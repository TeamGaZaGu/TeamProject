/** @jsxImportSource @emotion/react */
import * as s from './styles.js';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { reqDeleteMoim, reqExitMoim, reqJoinMoim, reqMoimBanUserList, reqMoimUserBan, reqMoimUserList, reqSelectMoim } from '../../../api/moimApi';
import useCategoryQuery from '../../../queries/useCategoryQuery.jsx';
import { IoChatbubbleEllipses, IoChatbubbleEllipsesOutline, IoClipboard, IoClipboardOutline, IoClose } from 'react-icons/io5';
import { RiHome7Fill, RiHome7Line } from 'react-icons/ri';
import { FaPen, FaRegComment, FaTrashAlt } from 'react-icons/fa';
import { useQueryClient } from '@tanstack/react-query';
import { baseURL } from '../../../api/axios.js';
import { reqUserBlock, reqUserUnBlock } from '../../../api/userBlockApi.js';
import usePrincipalQuery from '../../../queries/usePrincipalQuery.jsx';
import useUserBlockListQuery from '../../../queries/useUserBlockListQuery.jsx';
import useForumQuery from '../../../queries/useForumQuery.jsx';
import useForumCategoryQuery from '../../../queries/useForumCategoryQuery.jsx';
import { BiLike } from 'react-icons/bi';
import ChattingPage from '../../chatting/ChattingPage.jsx';
import { FcGoogle } from 'react-icons/fc';
import { SiKakaotalk } from 'react-icons/si';
import toast, { Toaster } from 'react-hot-toast';

function DescriptionSuggestPage(props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [ searchParam ] = useSearchParams();
    const moimId = parseInt(searchParam.get("moimId"));

    const [activeTab, setActiveTab] = useState("home");

    const [ moim, setMoim ] = useState("");
    const [ userList, setUserList ] = useState([]);
    
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const categoryQuery = useCategoryQuery();
    const categories = categoryQuery?.data?.data || [];
    const getCategory = categories.find(category => category.categoryId === moim.categoryId);
    
    const principalQuery = usePrincipalQuery();
    const userId = principalQuery?.data?.data?.user?.userId;
    const userBlockListQuery = useUserBlockListQuery({userId});
    const userBlockList = userBlockListQuery?.data?.data?.body;

    const isBlockedUser = userBlockList?.includes(selectedUser?.userId)

    const forumQuery = useForumQuery({ size: 10, moimId });
    const allForums = forumQuery?.data?.pages?.map(page => page.data.body.contents).flat() || [];
    console.log("-------------------")
    console.log(allForums)

    const forumCategoryQuery = useForumCategoryQuery();
    const respForumCategories = forumCategoryQuery?.data?.data || [];
    
    const [ forumCategory, setForumCategory ] = useState("전체");
    const categoriesWithAll = [{ forumCategoryId: 0, forumCategoryName: '전체' }, ...respForumCategories];

    const filteredForums = forumCategory === "전체"
        ? allForums
        : allForums.filter(forum => forum.forumCategory.forumCategoryName === forumCategory);

    const fetchMoim = async () => {
        try {
            const response = await reqSelectMoim(moimId);
            setMoim(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchMoimUserList = async () => {
        try {
            const response = await reqMoimUserList(moimId);
            setUserList(response?.data);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {

        if (moimId) {
            fetchMoim();
            fetchMoimUserList();
        }
    }, []);

    // 모임 가입 후 즉시 반영되도록 수정
    const handleJoinMoimOnClick = async () => {
        try {
            const response = await reqMoimBanUserList(moimId);
            const banList = response?.data;
            
            const isBannedUser = banList?.find(ban => ban.userId === userId);
            
            if (isBannedUser) {
                alert("해당 모임에 가입하실 수 없습니다.");
                return;
            }
            
            const joinResponse = await reqJoinMoim(moimId);
            
            // 가입 후 즉시 데이터 새로고침
            await fetchMoim();
            await fetchMoimUserList();
            
            // 관련 쿼리들 무효화
            queryClient.invalidateQueries(['moim', moimId]);
            queryClient.invalidateQueries(['moimUserList', moimId]);
            
            alert("모임 가입이 완료되었습니다!");
            
        } catch (error) {
            console.error("가입 처리 중 에러:", error);
            alert("가입 처리 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
    }

    // 모임 탈퇴 후 즉시 반영되도록 수정
    const handleExitMoimOnClick = async () => {
        const isConfirmed = window.confirm("이 모임에서 탈퇴하시겠습니까?")

        if (!isConfirmed) {
            return;
        }
        if (userId !== moim?.userId) {
            try {
                await reqExitMoim(moimId);
                
                // 탈퇴 후 즉시 데이터 새로고침
                await fetchMoim();
                await fetchMoimUserList();
                
                // 관련 쿼리들 무효화
                queryClient.invalidateQueries(['moim', moimId]);
                queryClient.invalidateQueries(['moimUserList', moimId]);
                
                navigate("/");
                
            } catch (error) {
                console.error("탈퇴 처리 중 에러:", error);
                alert("탈퇴 처리 중 문제가 발생했습니다.");
            }
        }
    }

    const handleModifyOnClick = () => {
        navigate(`/suggest/modify?moimId=${moimId}`)
    }

    // 모임 삭제 후 즉시 반영되도록 수정
    const handleDeleteMoimOnClick = async () => {
        const isConfirmed = window.confirm("모임을 삭제하시겠습니까?");
        
        if (!isConfirmed) {
            return;
        }
        
        try {
            await reqDeleteMoim(moimId);
            
            // 모임 관련 모든 쿼리 무효화
            queryClient.invalidateQueries(["moimpage"]);
            queryClient.invalidateQueries(['moim']);
            queryClient.invalidateQueries(['forums']);
            
            alert("모임 삭제 성공");
            await navigate("/");
            
        } catch (error) {
            console.error("모임 삭제 실패:", error);
            alert("모임 삭제에 실패했습니다.");
        }
    }

    const handleUserInformationOnClick = (userId) => {
        const user = userList.find(u => u.userId === userId);
        if (user) {
            setSelectedUser(user);
            setIsModalOpen(true);
        }
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    }

    const handleModalBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            handleCloseModal();
        }
    }

    // 사용자 차단/해제 후 즉시 반영되도록 수정
    const handleUserBlockOnClick = async (userId, nickName) => {
        
        const action = isBlockedUser ? '차단해제' : '차단';
        
        const isConfirmed = window.confirm(`"${nickName}" 님을 ${action}하시겠습니까?`);
        
        if (!isConfirmed) {
            return;
            
        }

        try {
            if (isBlockedUser) {
                await reqUserUnBlock(userId);
            } else {
                await reqUserBlock(userId);
            }
            
            // 차단 목록 쿼리 즉시 무효화
            await queryClient.invalidateQueries(['userBlockList', userId]);
            
            alert(`${nickName}님을 ${action}했습니다.`);
            
            // 모달 닫기 (차단 상태 변경 반영)
            handleCloseModal();

        } catch(error) {
            console.log(`사용자 ${action} 실패:`, error);
            alert(`${action}에 실패했습니다. 다시 시도해주세요.`);
        }
    }

    const handleKickUserOnClick = async (userId, nickName) => {
        const isConfirmed = window.confirm(`"${nickName}" 님을 강퇴하시겠습니까?`);
        
        if (!isConfirmed) {
            return;
        }

        try {
            console.log(`${nickName} 강퇴 처리`);
            alert(`${nickName}님을 강퇴했습니다.`);
            handleCloseModal();
        } catch(error) {
            console.log('강퇴 실패:', error);
            alert('강퇴에 실패했습니다. 다시 시도해주세요.');
        }
    }

    // 게시글 작성 페이지로 이동 (작성 완료 후 돌아올 때 새 게시글 반영됨)
    const handleWriteForumOnClick = () => {
         navigate(`/forum/create?moimId=${moimId}`)
    }

    const handleJoinForumOnClick = (forumId) => {
        userList.find(user => user.userId === userId) ?
        navigate(`/forum/detail?moimId=${moimId}&forumId=${forumId}`)
        :
        toast.error("모임 가입이 필요한 페이지입니다")
    }

    const handleLoadMore = () => {
        forumQuery.fetchNextPage();
    }

    // 탭 전환 시 데이터 새로고침 (게시글 작성 후 돌아왔을 때 반영)
    useEffect(() => {
        if (activeTab === "board") {
            // 게시판 탭으로 전환될 때 포럼 쿼리 새로고침
            queryClient.invalidateQueries(['forums', moimId]);
        }
    }, [activeTab, queryClient, moimId]);

    return (
        <div css={s.container}>
            <div css={s.header}>
                <div>
                    <button 
                        css={activeTab === "home" ? s.click : s.unClick}
                        onClick={() => setActiveTab("home")}
                    >
                        {
                            activeTab === "home" ?
                            <RiHome7Fill />
                            :
                            <RiHome7Line />
                        }
                        Home
                    </button>
                    <button
                        css={activeTab === "board" ? s.click : s.unClick}
                        onClick={() => setActiveTab("board")}
                    >
                        {
                            activeTab === "board" ?
                            <IoClipboard />
                            :
                            <IoClipboardOutline />
                        }
                        게시판
                    </button>
                    <button
                        css={activeTab === "chat" ? s.click : s.unClick}
                        onClick={() => setActiveTab("chat")}
                    >
                        {
                            activeTab === "chat" ?
                            <IoChatbubbleEllipses />
                            :
                            <IoChatbubbleEllipsesOutline />
                        }
                        채팅
                    </button>
                </div>
                <div>
                        {
                        userId !== moim?.userId ?
                            userList.find(user => user.userId === userId) ? (
                                <button css={s.exitMoimButton} onClick={handleExitMoimOnClick}>모임 탈퇴하기</button>
                            ) : (
                                <button css={s.joinMoimButton} onClick={handleJoinMoimOnClick}>모임 가입하기</button>
                            )
                            :
                            <>
                                <button css={s.Transaction} onClick={handleModifyOnClick}><FaPen />수정</button>
                                <button css={s.Transaction} onClick={handleDeleteMoimOnClick}><FaTrashAlt />삭제</button>
                            </>
                        }
                </div>
            </div>
            
            {activeTab === "home" && (
                <div css={s.mainContent}>
                    <div css={s.moimInfo}>
                        <img src={`${baseURL}/image${moim.moimImgPath}`} alt="모임 썸네일" />
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
                            {
                                userList?.map((user) => {
                                    const roleEmoji = user.moimRole === "OWNER" ? "👑" : "👤";
                                    const isBlocked = userBlockList?.includes(user.userId);

                                    if (isBlocked) {
                                        return (
                                            <div key={user.userId} css={s.memberCard} onClick={() => handleUserInformationOnClick(user.userId)}>
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
                                                <div css={s.blockedUserText}>
                                                    차단한 유저
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div key={user.userId} css={s.memberCard} onClick={() => handleUserInformationOnClick(user.userId)}>
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
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            )}
            {activeTab === "board" && (
                <div>
                    <div css={s.forumCategoryContainer}>
                        {categoriesWithAll.map((category) => (
                            <button
                                key={category.forumCategoryId}
                                onClick={() => setForumCategory(category.forumCategoryName)}
                                css={s.categoryButton(forumCategory === category.forumCategoryName)}
                            >
                                {category.forumCategoryName}
                            </button>
                        ))}
                        {
                            userId !== undefined ? 
                                userList.find(user => user.userId === userId) ? (
                                    <button css={s.createButton} onClick={handleWriteForumOnClick}>게시글 작성</button>
                                ) : (
                                    <button css={s.createButton} onClick={handleJoinMoimOnClick}>모임 가입하기</button>
                                )
                                :
                                 <></>
                        }
                    </div>
                    <div css={s.forumGrid}>
                        {
                            userId === undefined ? 
                            <div css={s.loginContainer}>
                                <h2>로그인이 필요한 페이지입니다</h2>
                                <div css={s.loginBox}>
                                <button css={s.googleLogin} onClick={() => { window.location.href = "http://localhost:8080/oauth2/authorization/google"; }}>
                                    <FcGoogle />
                                    구글 로그인
                                </button>
                                <button css={s.kakaoLogin} onClick={() => { window.location.href = "http://localhost:8080/oauth2/authorization/kakao"; }}>
                                    <SiKakaotalk />
                                    카카오 로그인
                                </button>
                                </div>
                            </div>
                            :
                            filteredForums.length === 0 ? (
                                <div css={s.register}>
                                    <h3>게시글을 등록해주세요</h3>
                                </div>
                            ) 
                        :
                        <div css={s.forumContainer}>
                            {
                                filteredForums?.map((forum) => {
                                    const date = new Date(forum.forumCreatedAt);
                                    const formatted = new Intl.DateTimeFormat('ko-KR', {
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true,
                                        timeZone: 'Asia/Seoul'
                                    }).format(date);
        
                                    return (
                                        <div css={s.forumCard} onClick={() => handleJoinForumOnClick(forum.forumId)} key={forum.forumId}>
                                            <Toaster />
                                            <div css={s.forumHeader}>
                                                <img
                                                    css={s.modalProfileImage}
                                                    src={`${baseURL}/image${forum.user.profileImgPath}`}
                                                    alt=""
                                                />
                                                <div css={s.userInfo}>
                                                    <h3 css={s.h3Tag}>{forum.user.nickName}</h3>
                                                    <p css={s.postMeta}>
                                                        {forum.forumCategory.forumCategoryName} · {formatted}
                                                    </p>
                                                </div>
                                            </div>
                                            <div css={s.forumBody}>
                                                <h2 css={s.forumTitle}>{forum.forumTitle}</h2>
                                                <p css={s.forumContent}>{forum.forumContent}</p>
                                            </div>
                                            <div css={s.forumFooter}>
                                                <p><BiLike /> {forum.likeCount}</p>
                                                <p><FaRegComment /> {forum.commentCount}</p>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                            {forumQuery.hasNextPage && (
                                <div css={s.loadMoreContainerStyle}>
                                    <button 
                                        css={s.loadMoreButtonStyle}
                                        onClick={handleLoadMore}
                                        disabled={forumQuery.isLoading}
                                    >
                                        {forumQuery.isLoading ? (
                                            <>
                                                <span css={s.spinnerStyle}>⏳</span>
                                                불러오는 중...
                                            </>
                                        ) : (
                                            <>
                                                게시글 더보기
                                                <span css={s.arrowStyle}>▼</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                        }
                    </div>
                </div>
            )}
            {activeTab === "chat" && <ChattingPage moimId={moimId} />}
            
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
                                        {categoryQuery?.data?.data
                                        ?.find(category => category.categoryId === selectedUser.categoryId)
                                        ?.categoryEmoji}
                                        {categoryQuery?.data?.data
                                        ?.find(category => category.categoryId === selectedUser.categoryId)
                                        ?.categoryName}
                                    </div>
                                    {selectedUser.introduction && (
                                        <p css={s.userIntroduction}>{selectedUser.introduction}</p>
                                    )}
                                    <div css={s.modalButtonContainer}>
                                        {isBlockedUser ? (
                                            <button onClick={() => handleUserBlockOnClick(selectedUser.userId, selectedUser.nickName)}>
                                                차단 해제
                                            </button>
                                        ) : (
                                            <button onClick={() => handleUserBlockOnClick(selectedUser.userId, selectedUser.nickName)}>
                                                차단하기
                                            </button>
                                        )}
                                        {/* 강퇴 버튼 - 방장이고 자신이 아닌 경우만 표시 */}
                                        {userList.find(u => u.userId === userId)?.moimRole === "OWNER" && 
                                         selectedUser.userId !== userId && (
                                            <button css={s.modalKickButton} onClick={() => handleKickUserOnClick(selectedUser.userId, selectedUser.nickName)}>
                                                강퇴하기
                                            </button>
                                        )}
                                    </div>
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
                                                