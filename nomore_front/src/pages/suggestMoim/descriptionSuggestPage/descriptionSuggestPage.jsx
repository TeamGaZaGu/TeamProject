/** @jsxImportSource @emotion/react */
import * as s from './styles.js';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { reqDeleteMoim, reqExitMoim, reqJoinMoim, reqMoimBanUserList, reqMoimUserList, reqSelectMoim } from '../../../api/moimApi';
import useCategoryQuery from '../../../queries/useCategoryQuery.jsx';
import { IoChatbubbleEllipses, IoChatbubbleEllipsesOutline, IoClipboard, IoClipboardOutline, IoClose } from 'react-icons/io5';
import { RiHome7Fill, RiHome7Line } from 'react-icons/ri';
import { FaPen, FaRegComment, FaTrashAlt } from 'react-icons/fa';
import { useQueryClient } from '@tanstack/react-query';
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
    const [searchParam] = useSearchParams();
    const moimId = searchParam.get("moimId");

    // 탭 상태
    const [activeTab, setActiveTab] = useState("home");
    
    // 모임 정보 및 사용자 목록
    const [moim, setMoim] = useState("");
    const [userList, setUserList] = useState([]);
    
    // 모달 상태
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // React Query hooks
    const categoryQuery = useCategoryQuery();
    const categories = categoryQuery?.data?.data || [];
    const getCategory = categories.find(category => category.categoryId === moim.categoryId);
    
    const principalQuery = usePrincipalQuery();
    const userId = principalQuery?.data?.data?.user?.userId;
    const userRole = principalQuery?.data?.data?.user?.userRole;
    
    const userBlockListQuery = useUserBlockListQuery({userId});
    const userBlockList = userBlockListQuery?.data?.data?.body;
    const isBlockedUser = userBlockList?.includes(selectedUser?.userId);

    // 포럼 관련 데이터
    const forumQuery = useForumQuery(moimId);
    const respForums = forumQuery?.data?.data || []; 

    const forumCategoryQuery = useForumCategoryQuery();
    const respForumCategories = forumCategoryQuery?.data?.data || [];
    
    const [forumCategory, setForumCategory] = useState("전체");
    const categoriesWithAll = [{ forumCategoryId: 0, forumCategoryName: '전체' }, ...respForumCategories];

    // 선택된 카테고리에 따른 포럼 필터링
    const filteredForums = forumCategory === "전체"
        ? respForums
        : respForums.filter(forum => forum.forumCategory.forumCategoryName === forumCategory);

    const fetchMoim = async () => {
        try {
            const response = await reqSelectMoim(moimId);
            setMoim(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    // 모임 사용자 목록 조회
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
    }, [moimId]);

    // 모임 가입
    const handleJoinMoim = async () => {
        try {
            // 밴 리스트 체크
            const response = await reqMoimBanUserList(moimId);
            const banList = response?.data;
            
            const isBannedUser = banList?.find(ban => ban.userId === userId);
            
            if (isBannedUser) {
                alert("해당 모임에 가입하실 수 없습니다.");
                return;
            }
            
            await reqJoinMoim(moimId);
            await fetchMoim();
            await fetchMoimUserList();
            alert("모임 가입이 완료되었습니다!");
            
        } catch (error) {
            console.error("가입 처리 중 에러:", error);
            alert("가입 처리 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
    }

    // 모임 탈퇴
    const handleExitMoim = async () => {
        const isConfirmed = window.confirm("이 모임에서 탈퇴하시겠습니까?");

        if (!isConfirmed) return;
        
        if (userId !== moim?.userId) {
            await reqExitMoim(moimId);
            await fetchMoim();
            navigate("/");
        }
    }

    // 모임 수정 페이지로 이동
    const handleNavigateToEdit = () => {
        navigate(`/suggest/modify?moimId=${moimId}`);
    }

    // 모임 삭제
    const handleDeleteMoim = async () => {
        const isConfirmed = window.confirm("정말로 모임을 삭제하시겠습니까?");
        if (!isConfirmed) return;

        try {
            await reqDeleteMoim(moimId);
            queryClient.invalidateQueries(["moimpage"]);
            alert("모임 삭제 완료");
            navigate("/");
        } catch (error) {
            console.error("모임 삭제 실패:", error);
            alert("모임 삭제에 실패했습니다.");
        }
    }

    // 사용자 프로필 모달 열기
    const handleOpenUserModal = (targetUserId) => {
        const user = userList.find(u => u.userId === targetUserId);
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

    // 모달 배경 클릭 시 닫기
    const handleModalBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            handleCloseModal();
        }
    }

    // 사용자 차단/해제 토글
    const handleToggleUserBlock = async (targetUserId, nickName) => {
        const action = isBlockedUser ? '차단해제' : '차단';
        const isConfirmed = window.confirm(`"${nickName}" 님을 ${action}하시겠습니까?`);
        
        if (!isConfirmed) return;

        try {
            if (isBlockedUser) {
                await reqUserUnBlock(targetUserId);
            } else {
                await reqUserBlock(targetUserId);
            }
            
            await queryClient.invalidateQueries(['userBlockList', userId]);

        } catch(error) {
            console.log(`사용자 ${action} 실패:`, error);
            alert(`${action}에 실패했습니다. 다시 시도해주세요.`);
        }
    }

    // 게시글 작성 페이지로 이동
    const handleNavigateToCreateForum = () => {
        navigate(`/forum/create?moimId=${moimId}`);
    }

    // 포럼 상세 페이지로 이동
    const handleNavigateToForumDetail = (forumId) => {
        if (userList.find(user => user.userId === userId)) {
            navigate(`/forum/detail?moimId=${moimId}&forumId=${forumId}`);
        } else {
            toast.error("모임 가입이 필요한 페이지입니다");
        }
    }

    // 현재 사용자가 모임에 가입되어 있는지 확인
    const isUserJoined = userList.find(user => user.userId === userId);

    return (
        <div css={s.container}>
            {/* 탭 헤더 */}
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
                    <button
                        css={activeTab === "chat" ? s.click : s.unClick}
                        onClick={() => setActiveTab("chat")}
                    >
                        {activeTab === "chat" ? <IoChatbubbleEllipses /> : <IoChatbubbleEllipsesOutline />}
                        채팅
                    </button>
                </div>
                
                {/* 액션 버튼들 */}
                <div>
                    {userRole === "ROLE_ADMIN" ? (
                        <>
                            <button css={s.Transaction} onClick={handleNavigateToEdit}><FaPen />수정</button>
                            <button css={s.Transaction} onClick={handleDeleteMoim}><FaTrashAlt />삭제</button>
                        </>
                    ) : userId === moim?.userId ? (
                        // 모임 생성자인 경우
                        <>
                            <button css={s.Transaction} onClick={handleNavigateToEdit}><FaPen />수정</button>
                            <button css={s.Transaction} onClick={handleDeleteMoim}><FaTrashAlt />삭제</button>
                        </>
                    ) : isUserJoined ? (
                        // 가입한 사용자인 경우
                        <button css={s.exitMoimButton} onClick={handleExitMoim}>모임 탈퇴하기</button>
                    ) : (
                        // 미가입 사용자인 경우
                        <button css={s.joinMoimButton} onClick={handleJoinMoim}>모임 가입하기</button>
                    )}
                </div>
            </div>
            
            {/* Home 탭 콘텐츠 */}
            {activeTab === "home" && (
                <div css={s.mainContent}>
                    {/* 모임 기본 정보 */}
                    <div css={s.moimInfo}>
                        <img src={`${moim.moimImgPath}`} alt="모임 썸네일" />
                        <div css={s.moimTextInfo}>
                            <h1 css={s.moimTitle}>{moim.title}</h1>
                            <div css={s.moimMeta}>
                                <span>{getCategory?.categoryEmoji}{getCategory?.categoryName}</span> · 
                                <span>{moim.districtName}</span> · 
                                <span>{moim.memberCount}/{moim.maxMember}</span>
                            </div>
                        </div>
                    </div>

                    {/* 모임 소개 */}
                    <div css={s.section}>
                        <h2 css={s.sectionTitle}>모임 소개</h2>
                        <div css={s.description}>
                            <p>{moim.discription}</p>
                        </div>
                    </div>

                    {/* 모임 멤버 */}
                    <div css={s.section}>
                        <h2 css={s.sectionTitle}>모임 멤버</h2>
                        <div css={s.memberSection}>
                            {userList?.map((user) => {
                                const roleEmoji = user.moimRole === "OWNER" ? "👑" : "👤";
                                const isBlocked = userBlockList?.includes(user.userId);

                                return (
                                    <div key={user.userId} css={s.memberCard} onClick={() => handleOpenUserModal(user.userId)}>
                                        <img
                                            src={`${user.profileImgPath}`}
                                            alt="프로필"
                                            css={s.profileImage}
                                        /> 
                                        <div css={s.defaultAvatar}>{roleEmoji}</div>
                                        <div css={s.memberInfo}>
                                            <span css={s.memberRole}>{user.nickName}</span>
                                            <span css={s.memberName}>{user.introduction}</span>
                                        </div>
                                        {isBlocked && (
                                            <div css={s.blockedUserText}>차단한 유저</div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
            
            {/* 게시판 탭 콘텐츠 */}
            {activeTab === "board" && (
                <div>
                    {/* 카테고리 선택 및 작성 버튼 */}
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
                        {userId !== undefined && (
                            isUserJoined ? (
                                <button css={s.createButton} onClick={handleNavigateToCreateForum}>게시글 작성</button>
                            ) : (
                                <button css={s.createButton} onClick={handleJoinMoim}>모임 가입하기</button>
                            )
                        )}
                    </div>
                    
                    {/* 포럼 목록 */}
                    <div css={s.forumGrid}>
                        {userId === undefined ? (
                            // 비로그인 사용자
                            <div css={s.loginContainer}>
                                <h2>로그인이 필요한 페이지입니다</h2>
                                <div css={s.loginBox}>
                                    <button css={s.googleLogin} onClick={() => { window.location.href = "http://localhost:8080/oauth2/authorization/google"; }}>
                                        <FcGoogle />구글 로그인
                                    </button>
                                    <button css={s.kakaoLogin} onClick={() => { window.location.href = "http://localhost:8080/oauth2/authorization/kakao"; }}>
                                        <SiKakaotalk />카카오 로그인
                                    </button>
                                </div>
                            </div>
                        ) : filteredForums.length === 0 ? (
                            // 게시글이 없는 경우
                            <div css={s.register}>
                                <h3>게시글을 등록해주세요</h3>
                            </div>
                        ) : (
                            // 게시글 목록
                            <div css={s.forumContainer}>
                                {filteredForums?.map((forum) => {
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
                                        <div css={s.forumCard} onClick={() => handleNavigateToForumDetail(forum.forumId)} key={forum.forumId}>
                                            <div css={s.forumHeader}>
                                                <img
                                                    css={s.modalProfileImage}
                                                    src={`${forum.user.profileImgPath}`}
                                                    alt="프로필"
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
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}
            
            {/* 채팅 탭 콘텐츠 */}
            {activeTab === "chat" && 
                moimId ? (
                    <ChattingPage 
                        moimId={Number(moimId)}
                        userId={principalQuery?.data?.data?.user?.nickName}
                    />
                ) : (
                    <div>올바른 채팅방 ID가 필요합니다.</div>

                )}
           
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
                                    src={`${selectedUser.profileImgPath}`}
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
                                        <button onClick={() => handleToggleUserBlock(selectedUser.userId, selectedUser.nickName)}>
                                            {isBlockedUser ? '차단 해제' : '차단하기'}
                                        </button>
                                        {/* 방장이고 자신이 아닌 경우만 강퇴 버튼 표시 */}
                                        {userList.find(u => u.userId === userId)?.moimRole === "OWNER" && 
                                         selectedUser.userId !== userId && (
                                            <button css={s.modalKickButton} onClick={() => {}}>
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
            
            <Toaster />
        </div>
    );
}

export default DescriptionSuggestPage;