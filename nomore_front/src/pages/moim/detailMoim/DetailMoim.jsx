    /** @jsxImportSource @emotion/react */
    import * as s from './styles.js';
    import React, { useEffect, useState } from 'react';
    import { useNavigate, useSearchParams } from 'react-router-dom';
    import { reqDeleteMoim, reqExitMoim, reqJoinMoim, reqMoimBanUserList, reqMoimUserList, reqSelectMoim } from '../../../api/moimApi.js';
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
    import { MdReport } from 'react-icons/md';
    import { submitReport } from '../../../api/reportApi.js';
    import { saveRecentlyViewed } from '../../../utils/recentViewedUtils';
    import Oauth2 from '../../../Oauth2/Oauth2.jsx';

    function DetailMoim(props) {
        const navigate = useNavigate();
        const queryClient = useQueryClient();
        const [searchParam] = useSearchParams();
        const moimId = parseInt(searchParam.get("moimId"));

        // 탭 상태
        const [activeTab, setActiveTab] = useState("home");
        
        // 모임 정보 및 사용자 목록
        const [moim, setMoim] = useState("");
        const [userList, setUserList] = useState([]);
        
        // 모달 상태
        const [selectedUser, setSelectedUser] = useState(null);
        const [isModalOpen, setIsModalOpen] = useState(false);
        
        // 신고 모달 상태
        const [isReportModalOpen, setIsReportModalOpen] = useState(false);
        const [selectedReason, setSelectedReason] = useState('');
        const [customReason, setCustomReason] = useState('');
        const [reportTarget, setReportTarget] = useState(null);

        // React Query hooks
        const principalQuery = usePrincipalQuery();
        const userId = principalQuery?.data?.data?.user?.userId;
        const userRole = principalQuery?.data?.data?.user?.userRole;
        const moimRole = userList.find(user => user.userId === userId)?.moimRole;

        const categoryQuery = useCategoryQuery();
        const categories = categoryQuery?.data?.data || [];
        const getCategory = categories.find(category => category.categoryId === moim.categoryId);
        
        const userBlockListQuery = useUserBlockListQuery({userId});
        const userBlockList = userBlockListQuery?.data?.data?.body;
        const isBlockedUser = userBlockList?.includes(selectedUser?.userId);

        const forumQuery = useForumQuery({ size: 10, moimId });
        const allForums = forumQuery?.data?.pages?.map(page => page.data.body.contents).flat() || [];
        const allImages = allForums.flatMap(forum => forum.forumImgList || []);

        const forumCategoryQuery = useForumCategoryQuery();
        const respForumCategories = forumCategoryQuery?.data?.data || [];
        
        const [forumCategory, setForumCategory] = useState("전체");
        const categoriesWithAll = [{ forumCategoryId: 0, forumCategoryName: '전체' }, ...respForumCategories];

        // 신고 사유 옵션
        const reportReasons = [
            '스팸 / 광고성 활동',
            '욕설 / 비방 / 혐오 발언',
            '음란물 / 불건전한 내용',
            '사기 / 도용 / 사칭',
            '불법 행위 (범죄, 불법거래 등)',
            '기타'
        ];

        // 선택된 카테고리에 따른 포럼 필터링
        const filteredForums = forumCategory === "전체"
            ? allForums
            : allForums.filter(forum => forum.forumCategory.forumCategoryName === forumCategory);

        // 현재 사용자가 모임에 가입되어 있는지 확인
        const isUserJoined = userList.find(user => user.userId === userId);

        // 모임 정보 조회
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

        // 모임 가입
        const handleJoinMoimOnClick = async () => {
            try {
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
                
                queryClient.invalidateQueries(['moim', moimId]);
                queryClient.invalidateQueries(['moimUserList', moimId]);
                
                alert("모임 가입이 완료되었습니다!");
                
            } catch (error) {
                console.error("가입 처리 중 에러:", error);
                alert("가입 처리 중 문제가 발생했습니다. 다시 시도해주세요.");
            }
        }

        // 모임 탈퇴
        const handleExitMoimOnClick = async () => {
            const isConfirmed = window.confirm("이 모임에서 탈퇴하시겠습니까?");

            if (!isConfirmed) return;
            
            if (userId !== moim?.userId) {
                try {
                    await reqExitMoim(moimId);
                    await fetchMoim();
                    await fetchMoimUserList();
                    
                    queryClient.invalidateQueries(['moim', moimId]);
                    queryClient.invalidateQueries(['moimUserList', moimId]);
                    
                    navigate("/");
                    
                } catch (error) {
                    console.error("탈퇴 처리 중 에러:", error);
                    alert("탈퇴 처리 중 문제가 발생했습니다.");
                }
            }
        }

        // 모임 수정 페이지로 이동
        const handleNavigateToEdit = () => {
            navigate(`/moim/modify?moimId=${moimId}`);
        }

        // 모임 삭제
        const handleDeleteMoimOnClick = async () => {
            const isConfirmed = window.confirm("모임을 삭제하시겠습니까?");
            
            if (!isConfirmed) return;
            
            try {
                await reqDeleteMoim(moimId);
                
                queryClient.invalidateQueries(["moimpage"]);
                queryClient.invalidateQueries(['moim']);
                queryClient.invalidateQueries(['forums']);
                
                alert("모임 삭제 성공");
                navigate("/");
            } catch (error) {
                console.error("모임 삭제 실패:", error);
                alert("모임 삭제에 실패했습니다.");
            }
        }

        // 권한 이양 함수
        const handleTransferOwner = async (targetUser) => {
            const isConfirmed = window.confirm(
                `"${targetUser.nickName}"님에게 모임장 권한을 넘기시겠습니까?\n권한을 넘기면 되돌릴 수 없습니다.`
            );
            
            if (!isConfirmed) return;

            try {
                const response = await fetch(`http://localhost:8080/api/moim/transfer-ownership/${moimId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        newOwnerId: targetUser.userId,
                        currentUserId: userId 
                    })
                });

                if (response.ok) {
                    alert('권한이 성공적으로 이양되었습니다.');
                    await fetchMoimUserList();
                    await fetchMoim();
                    handleCloseModal();
                } else {
                    const errorText = await response.text();
                    alert(errorText);
                }
            } catch (error) {
                console.error('권한 이양 실패:', error);
                alert('권한 이양에 실패했습니다.');
            }
        };

        // 사용자 프로필 모달 열기
        const handleMemberClick = (targetUserId) => {
            const user = userList.find(u => u.userId === targetUserId);
            if (user) {
                setSelectedUser(user);
                setIsModalOpen(true);
            }
        };

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

        // 모임 신고 버튼 핸들러
        const handleReportMoimOnClick = () => {
            setReportTarget("moim");
            setIsReportModalOpen(true);
        };

        // 유저 신고 버튼 핸들러
        const handleReportOnClick = () => {
            setReportTarget("user");
            setIsReportModalOpen(true);
        };

        // 신고 모달 닫기
        const handleCloseReportModal = () => {
            setIsReportModalOpen(false);
            setSelectedReason('');
            setCustomReason('');
            setReportTarget(null);
        }

        // 신고 사유 선택
        const handleReasonChange = (reason) => {
            setSelectedReason(reason);
            if (reason !== '기타') {
                setCustomReason('');
            }
        }

        // 신고 제출
        const handleSubmitReport = async () => {
            if (!selectedReason) {
                alert('신고 사유를 선택해주세요.');
                return;
            }

            if (selectedReason === '기타' && !customReason.trim()) {
                alert('기타 사유를 입력해주세요.');
                return;
            }

            try {
                const reportData = {
                    userId: userId,
                    targetType: reportTarget === "user" ? 1 : 2,
                    targetId: reportTarget === "user" ? selectedUser.userId : moim.moimId,
                    reason: selectedReason === '기타' ? customReason : selectedReason
                };

                await submitReport(reportData);
                
                toast.success('신고가 접수되었습니다');
                handleCloseReportModal();
                
            } catch (error) {
                console.error('신고 제출 실패:', error);
                toast.error('신고 제출에 실패했습니다.');
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
                
                alert(`${nickName}님을 ${action}했습니다.`);
                handleCloseModal();

            } catch(error) {
                console.log(`사용자 ${action} 실패:`, error);
                alert(`${action}에 실패했습니다. 다시 시도해주세요.`);
            }
        }

        // 게시글 작성 페이지로 이동
        const handleNavigateToCreateForum = () => {
            navigate(`/forum/create?moimId=${moimId}`);
        }

        console.log("userList",userList)
        // 포럼 상세 페이지로 이동
        const handleNavigateToForumDetail = (forumId) => {
            if (userRole === "ROLE_ADMIN" || userList.find(user => user.userId === userId)) {
                navigate(`/forum/detail?moimId=${moimId}&forumId=${forumId}`);
            } else {
                toast.error("모임 가입이 필요한 페이지입니다");
            }
        }

        // 더보기 버튼 핸들러
        const handleLoadMore = () => {
            forumQuery.fetchNextPage();
        }

        // 초기 데이터 로드
        useEffect(() => {
            if (moimId) {
                fetchMoim();
                fetchMoimUserList();
            }
        }, [moimId]);

        // 탭 전환 시 데이터 새로고침
        useEffect(() => {
            if (activeTab === "board") {
                queryClient.invalidateQueries(['forums', moimId]);
            }
        }, [activeTab, queryClient, moimId]);

        useEffect(() => {
            if (moim && getCategory && moim.moimId) {
                const moimData = {
                    moimId: moim.moimId,
                    title: moim.title,
                    moimImgPath: moim.moimImgPath,
                    discription: moim.discription,
                    categoryId: moim.categoryId,
                    categoryName: getCategory.categoryName,
                    categoryEmoji: getCategory.categoryEmoji,
                    districtName: moim.districtName,
                    memberCount: moim.memberCount,
                    maxMember: moim.maxMember
                };
                
                saveRecentlyViewed(moimData);
            }
        }, [moim, getCategory]);

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
                    <div css={s.headerActions}>
                        {userRole === "ROLE_ADMIN" ? (
                            <>
                                <button css={s.Transaction} onClick={handleNavigateToEdit}><FaPen />수정</button>
                                <button css={s.Transaction} onClick={handleDeleteMoimOnClick}><FaTrashAlt />삭제</button>
                            </>
                        ) : moimRole === "OWNER" ? (
                            <>
                                <button css={s.Transaction} onClick={handleNavigateToEdit}><FaPen />수정</button>
                                <button css={s.Transaction} onClick={handleDeleteMoimOnClick}><FaTrashAlt />삭제</button>
                            </>
                        ) : (
                            <div css={s.userActionContainer}>
                                {userId !== undefined ? (
                                    <>
                                        {isUserJoined ? (
                                            <button css={s.exitMoimButtonInline} onClick={handleExitMoimOnClick}>
                                                모임 탈퇴하기
                                            </button>
                                        ) : (
                                            <button css={s.joinMoimButtonInline} onClick={handleJoinMoimOnClick}>
                                                모임 가입하기
                                            </button>
                                        )}
                                        <button css={s.reportMoimButton} onClick={handleReportMoimOnClick}>
                                            <MdReport />
                                        </button>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div css={s.mainLayout}>

                    <div css={s.contentArea}> 
                        {/* Home 탭 콘텐츠 */}
                        {activeTab === "home" && (
                            <div css={s.mainContent}>
                                <div css={s.moimInfo}>
                                    <img src={`${moim.moimImgPath}`} alt="모임 썸네일" />
                                    <div css={s.moimTextInfo}>
                                        <h1 css={s.moimTitle}>
                                            {moim.title}
                                        </h1>
                                        <div css={s.moimMeta}>
                                            <span>{getCategory?.categoryEmoji}{getCategory?.categoryName}</span> · 
                                            <span>{moim.districtName}</span> · 
                                            <span>{moim.memberCount}/{moim.maxMember}</span>
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
                                        {userList
                                            ?.sort((a, b) => {
                                                // 방장을 맨 앞으로 정렬
                                                if (a.moimRole === "OWNER" && b.moimRole !== "OWNER") return -1;
                                                if (a.moimRole !== "OWNER" && b.moimRole === "OWNER") return 1;
                                                // 방장이 아닌 경우 기본 순서 유지 (userId 기준 정렬 등 원하는 기준으로 변경 가능)
                                                return a.userId - b.userId;
                                            })
                                            ?.map((user) => {
                                                const roleEmoji = user.moimRole === "OWNER" ? "👑" : "👤";
                                                const isBlocked = userBlockList?.includes(user.userId);

                                                return (
                                                    <div 
                                                        key={user.userId} 
                                                        css={s.memberCard} 
                                                        onClick={() => handleMemberClick(user.userId)}
                                                    >
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
                        <div css={s.mainContent}>
                            <div css={s.categoryAndForumsWrapper}>

                            {/* 상단 카테고리 버튼 + 작성/가입 버튼 */}
                            <div css={s.topBar}>
                                <div css={s.forums}>
                                {categoriesWithAll.map((category) => (
                                    <button
                                    key={category.forumCategoryId}
                                    onClick={() => setForumCategory(category.forumCategoryName)}
                                    css={s.categoryButton(forumCategory === category.forumCategoryName)}
                                    >
                                    {category.forumCategoryName}
                                    </button>
                                ))}
                                </div>

                                {userId !== undefined && (
                                    userRole === "ROLE_ADMIN" ? (
                                        <button css={s.createButton} onClick={handleNavigateToCreateForum}>
                                            게시글 작성
                                        </button>
                                    ) : (
                                        isUserJoined ? (
                                            <button css={s.createButton} onClick={handleNavigateToCreateForum}>게시글 작성</button>
                                        ) : (
                                            <button css={s.createButton} onClick={handleJoinMoimOnClick}>모임 가입하기</button>
                                        )
                                    )
                                )}
                            </div>

                            {/* 게시글 영역 */}
                            <div css={s.forumGrid}>
                                {userId === undefined ? (
                                <div css={s.loginContainer}>
                                    <h2>로그인이 필요한 페이지입니다</h2>
                                    <Oauth2 customStyle={s.customLoginStyle} />
                                </div>
                                ) : filteredForums.length === 0 ? (
                                <div css={s.register}>
                                    <h3>게시글을 등록해주세요</h3>
                                </div>
                                ) : (
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
                                )}
                            </div>

                            </div>
                        </div>
                        )}
                        {/* 채팅 탭 콘텐츠 */}
                        {activeTab === "chat" && (
                            userId === undefined ? (
                                <div css={s.loginContainer}>
                                    <h2>로그인이 필요한 페이지입니다</h2>
                                    <Oauth2 customStyle={s.customLoginStyle} />
                                </div>
                                )   :
                            (moimId ? (
                                userList.find(user => user.userId === userId) ? (
                                    <ChattingPage 
                                        moimId={Number(moimId)}
                                        userId={principalQuery?.data?.data?.user?.nickName}
                                    />
                                ) : (
                                    <div css={s.loginContainer}>
                                        <h2>모임 가입이 필요한 페이지입니다</h2>
                                        <button css={s.joinMoimButton} onClick={handleJoinMoimOnClick}>
                                            모임 가입하기
                                        </button>
                                    </div>
                                )
                            ) : (
                                <div>올바른 채팅방 ID가 필요합니다.</div>
                            )
                        ))}
                    </div>
                    <div css={s.rightSidebar}>
                        <div css={s.sidebarTitle}>모임 사진</div>
                        <div css={s.imageGrid}>
                            {allImages.length > 0 ? (
                                allImages.slice(0, 12).map((img) => (
                                    <div css={s.imageWrapper} key={img.forumImgId}>
                                        <img src={img.path} alt="forum image" />
                                    </div>
                                ))
                            ) : (
                                <div css={s.noImages}>등록된 이미지가 없습니다</div>
                            )}
                        </div>
                    </div>
                </div>
                {/* 사용자 프로필 모달 */}
                {isModalOpen && selectedUser && (
                    <div css={s.modalOverlay} onClick={handleModalBackdropClick}>
                        <div css={s.modalContent}>
                            <div css={s.modalHeader}>
                                <h3>멤버 프로필</h3>
                                <div css={s.modalHeaderButtons}>
                                    <button css={s.reportButton} onClick={handleReportOnClick}>
                                        <MdReport />
                                    </button>
                                    <button css={s.closeButton} onClick={handleCloseModal}>
                                        <IoClose />
                                    </button>
                                </div>
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
                                            {selectedUser.userId !== userId && (
                                                <button 
                                                css={isBlockedUser ? s.unblockButton : s.blockButton} 
                                                onClick={() => handleToggleUserBlock(selectedUser.userId, selectedUser.nickName)}
                                                >
                                                    {isBlockedUser ? '차단 해제' : '차단하기'}
                                                </button>
                                            )}
                                            
                                            {(() => {
                                                const currentUserInMoim = userList.find(u => u.userId === userId);
                                                const isCurrentUserOwner = currentUserInMoim?.moimRole === "OWNER";
                                                
                                                return isCurrentUserOwner && selectedUser.moimRole === "MEMBER" && selectedUser.userId !== userId && (
                                                    <button css={s.transferOwnershipButton} onClick={() => handleTransferOwner(selectedUser)}>
                                                        👑 모임장 권한 넘기기
                                                    </button>
                                                );
                                            })()}
                                            
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

                {/* 신고 모달 */}
                {isReportModalOpen && (
                    <div css={s.reportModalOverlay} onClick={(e) => e.target === e.currentTarget && handleCloseReportModal()}>
                        <div css={s.reportModalContent}>
                            <div css={s.reportModalHeader}>
                                <h3>{reportTarget === "user" ? "사용자 신고" : "모임 신고"}</h3>
                                <button css={s.closeButton} onClick={handleCloseReportModal}>
                                    <IoClose />
                                </button>
                            </div>
                            <div css={s.reportModalBody}>
                                <p css={s.reportModalDescription}>신고 사유를 선택해주세요:</p>
                                <div css={s.reasonList}>
                                    {reportReasons.map((reason, index) => (
                                        <label key={index} css={s.reasonItem}>
                                            <input
                                                type="radio"
                                                name="reportReason"
                                                value={reason}
                                                checked={selectedReason === reason}
                                                onChange={() => handleReasonChange(reason)}
                                            />
                                            <span css={s.reasonText}>{reason}</span>
                                        </label>
                                    ))}
                                </div>
                                {selectedReason === '기타' && (
                                    <textarea
                                        css={s.customReasonInput}
                                        placeholder="기타 사유를 입력해주세요..."
                                        value={customReason}
                                        onChange={(e) => setCustomReason(e.target.value)}
                                        maxLength={200}
                                    />
                                )}
                                <div css={s.reportModalFooter}>
                                    <button css={s.submitReportButton} onClick={handleSubmitReport}>
                                        신고하기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                <Toaster />
            </div>
        );
    }

    export default DetailMoim;