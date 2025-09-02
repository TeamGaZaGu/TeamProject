/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { reqUserMoims, reqUserPosts } from '../../api/userApi';
import usePrincipalQuery from '../../queries/usePrincipalQuery';
import * as s from './styles';

function UserDetailPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location?.state?.user
    const { userId } = useParams();
    const [userMoims, setUserMoims] = useState([]);
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('info');

    const principalQuery = usePrincipalQuery();
    const admin = principalQuery.data.data.user;
    const currentUserRole = admin?.userRole;

    const handleMoimClick = (moimId) => {
        navigate(`/moim/detail?moimId=${moimId}`);
    };

    const handlePostClick = (forumId, moimId) => {
        navigate(`/forum/detail?moimId=${moimId}&forumId=${forumId}`);
    };

    // 관리자 권한 확인
    useEffect(() => {
        if (principalQuery.isFetched && currentUserRole !== 'ROLE_ADMIN') {
            alert('접근 권한이 없습니다.');
            navigate('/');
            return;
        }
    }, [currentUserRole, navigate, principalQuery.isFetched]);

    // 유저 정보 및 데이터 로드
    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId || currentUserRole !== 'ROLE_ADMIN') return;

            try {
                setLoading(true);

                try {
                    const moimsResponse = await reqUserMoims(userId);
                    setUserMoims(moimsResponse.data || []);
                } catch (error) {
                    console.warn('모임 정보 로드 실패:', error);
                    setUserMoims([]);
                }

                // 유저가 작성한 게시글들 (에러 발생 시 빈 배열로 설정)
                try {
                    const postsResponse = await reqUserPosts(userId);
                    setUserPosts(postsResponse.data || []);
                } catch (error) {
                    console.warn('게시글 정보 로드 실패:', error);
                    setUserPosts([]);
                }

            } catch (error) {
                console.error('사용자 정보 로드 실패:', error);
                alert('사용자 정보를 불러오는데 실패했습니다.');
                navigate('/userManagement');
            } finally {
                setLoading(false);
            }
        };

        if (principalQuery.isFetched && userId && currentUserRole === 'ROLE_ADMIN') {
            fetchUserData();
        }
    }, [userId, currentUserRole, navigate, principalQuery.isFetched]);

    if (!principalQuery.isFetched || loading) {
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
                    <div css={s.profileImageContainer}>
                        {user.profileImgPath ? (
                            <img
                                src={`${user.profileImgPath}`}
                                alt="프로필"
                                css={s.profileImage}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                        ) : null}
                        <div className="placeholder" style={{
                            display: user.profileImgPath ? 'none' : 'flex',
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            backgroundColor: '#f0f0f0',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2rem'
                        }}>
                            👤
                        </div>
                    </div>
                    <div css={s.userDetails}>
                        <h2>{user.fullName} ({user.nickName})</h2>
                        <div css={s.userMeta}>
                            <span>이메일: {user.email}</span>
                            <span>성별: {user.gender || '미설정'}</span>
                            <span>생년월일: {user.birthDate ? new Date(user.birthDate).toLocaleDateString() : '미설정'}</span>
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
                                <span>{user.gender || '미설정'}</span>
                            </div>
                            <div css={s.infoItem}>
                                <label>생년월일</label>
                                <span>{user.birthDate ? new Date(user.birthDate).toLocaleDateString() : '미설정'}</span>
                            </div>
                            <div css={s.infoItem}>
                                <label>회원 상태</label>
                                <span>{user.userRole === 'ROLE_BEN' ? '사용자차단' : user.siteBlock === 1 ? '사이트차단' : '정상'}</span>
                            </div>
                            <div css={s.infoItem}>
                                <label>소개</label>
                                <span>{user.introduction || '미설정'}</span>
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
                                                {new Date(post.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p css={s.postContent}>
                                            {post.forumContent && post.forumContent.substring(0, 100)}
                                            {post.forumContent && post.forumContent.length > 100 && '...'}
                                        </p>
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