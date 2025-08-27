/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { reqUserDetail, reqUserMoims, reqUserPosts } from '../../api/userApi';
import usePrincipalQuery from '../../queries/usePrincipalQuery';
import * as s from './styles';

function UserDetailPage() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [userMoims, setUserMoims] = useState([]);
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('info');

    const principalQuery = usePrincipalQuery();
    const currentUserRole = principalQuery?.data?.data?.user?.userRole;

    const handleMoimClick = (moimId) => {
        navigate(`/suggest/description?moimId=${moimId}`);
    };

    const handlePostClick = (forumId, moimId) => {
        navigate(`/forum/detail?moimId=${moimId}&forumId=${forumId}`);
    };

    // 관리자 권한 확인
    useEffect(() => {
        if (currentUserRole && currentUserRole !== 'ROLE_ADMIN') {
            alert('접근 권한이 없습니다.');
            navigate('/');
            return;
        }
    }, [currentUserRole, navigate]);

    // 유저 정보 및 데이터 로드
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                
                // 유저 기본 정보
                const userResponse = await reqUserDetail(userId);
                setUser(userResponse.data);

                // 유저가 가입한 모임들
                const moimsResponse = await reqUserMoims(userId);
                setUserMoims(moimsResponse.data);

                // 유저가 작성한 게시글들
                const postsResponse = await reqUserPosts(userId);
                setUserPosts(postsResponse.data);

            } catch (error) {
                console.error('사용자 정보 로드 실패:', error);
                alert('사용자 정보를 불러오는데 실패했습니다.');
                navigate('/userManagement');
            } finally {
                setLoading(false);
            }
        };

        if (userId && currentUserRole === 'ROLE_ADMIN') {
            fetchUserData();
        }
    }, [userId, currentUserRole, navigate]);

    if (loading) {
        return (
            <div css={s.container}>
                <div css={s.loadingContainer}>로딩 중...</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div css={s.container}>
                <div css={s.errorContainer}>사용자 정보를 찾을 수 없습니다.</div>
            </div>
        );
    }

    return (
        <div css={s.container}>
            <div css={s.header}>
                <button css={s.backButton} onClick={() => navigate('/userManagement')}>
                    ← 유저 관리로 돌아가기
                </button>
                <h1 css={s.pageTitle}>사용자 상세 정보</h1>
            </div>

            {/* 유저 기본 정보 */}
            <div css={s.userInfoSection}>
                <div css={s.profileSection}>
                    <img 
                        src={user.profileImgPath || '/default-profile.png'} 
                        alt="프로필" 
                        css={s.profileImage}
                    />
                    <div css={s.userDetails}>
                        <h2>{user.fullName} ({user.nickName})</h2>
                        <div css={s.userMeta}>
                            <span>이메일: {user.email}</span>
                            <span>성별: {user.gender}</span>
                            <span>생년월일: {user.birthDate}</span>
                        </div>
                        {user.introduction && (
                            <p css={s.introduction}>{user.introduction}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* 탭 메뉴 */}
            <div css={s.tabContainer}>
                <button 
                    css={[s.tabButton, activeTab === 'info' && s.activeTab]}
                    onClick={() => setActiveTab('info')}
                >
                    기본 정보
                </button>
                <button 
                    css={[s.tabButton, activeTab === 'moims' && s.activeTab]}
                    onClick={() => setActiveTab('moims')}
                >
                    가입한 모임 ({userMoims.length})
                </button>
                <button 
                    css={[s.tabButton, activeTab === 'posts' && s.activeTab]}
                    onClick={() => setActiveTab('posts')}
                >
                    작성한 글 ({userPosts.length})
                </button>
            </div>

            {/* 탭 내용 */}
            <div css={s.tabContent}>
                {activeTab === 'info' && (
                    <div css={s.infoTab}>
                        <div css={s.infoGrid}>
                            <div css={s.infoItem}>
                                <label>사용자 ID</label>
                                <span>{user.userId}</span>
                            </div>
                            <div css={s.infoItem}>
                                <label>닉네임</label>
                                <span>{user.nickName}</span>
                            </div>
                            <div css={s.infoItem}>
                                <label>성명</label>
                                <span>{user.fullName}</span>
                            </div>
                            <div css={s.infoItem}>
                                <label>이메일</label>
                                <span>{user.email}</span>
                            </div>
                            <div css={s.infoItem}>
                                <label>성별</label>
                                <span>{user.gender}</span>
                            </div>
                            <div css={s.infoItem}>
                                <label>생년월일</label>
                                <span>{user.birthDate}</span>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'moims' && (
                    <div css={s.moimsTab}>
                        {userMoims.length === 0 ? (
                            <div css={s.emptyState}>가입한 모임이 없습니다.</div>
                        ) : (
                            <div css={s.moimsGrid}>
                                {userMoims.map(moim => (
                                    <div key={moim.moimId} css={s.moimCard}
                                        onClick={() => handleMoimClick(moim.moimId)}
                                        style={{ cursor: 'pointer' }}>
                                        <img 
                                            src={moim.moimImgPath || '/default-moim.png'} 
                                            alt="모임 이미지"
                                            css={s.moimImage}
                                        />
                                        <div css={s.moimInfo}>
                                            <h3>{moim.title || moim.moimTitle}</h3>
                                            <p>{moim.description}</p>
                                            <div css={s.moimMeta}>
                                                <span>멤버: {moim.memberCount || moim.moimMemberCount}/{moim.maxMember || moim.moimMaxMember}</span>
                                                <span>지역: {moim.districtName}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'posts' && (
                    <div css={s.postsTab}>
                        {userPosts.length === 0 ? (
                            <div css={s.emptyState}>작성한 게시글이 없습니다.</div>
                        ) : (
                            <div css={s.postsList}>
                                {userPosts.map(post => (
                                    <div key={post.forumId} css={s.postCard}
                                        onClick={() => handlePostClick(post.forumId, post.moimId)}
                                        style={{ cursor: 'pointer' }}>
                                        <div css={s.postHeader}>
                                            <h3>{post.forumTitle}</h3>
                                            <span css={s.postDate}>
                                                {new Date(post.forumCreatedAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p css={s.postContent}>
                                            {post.forumContent.substring(0, 100)}
                                            {post.forumContent.length > 100 && '...'}
                                        </p>
                                        <div css={s.postStats}>
                                            <span>좋아요: {post.likeCount}</span>
                                            <span>댓글: {post.commentCount}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserDetailPage;