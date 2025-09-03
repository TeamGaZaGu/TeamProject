/** @jsxImportSource @emotion/react */
import * as s from './styles.js';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { reqRegisterComment, reqDeleteForum, reqDetailForum, reqDeleteComment, reqLike, reqDislike } from '../../../api/forumApi';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { FaRegComment } from 'react-icons/fa';
import { useQueryClient } from '@tanstack/react-query';
import usePrincipalQuery from '../../../queries/usePrincipalQuery.jsx';
import { X } from 'lucide-react';
import useCommentsQuery from '../../../queries/useCommentsQuery.jsx';
import { MdReport } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import toast, { Toaster } from 'react-hot-toast';
import { submitReport } from '../../../api/reportApi.js';
import useCategoryQuery from '../../../queries/useCategoryQuery.jsx';
import useUserBlockListQuery from '../../../queries/useUserBlockListQuery.jsx';
import { reqUserBlock, reqUserUnBlock } from '../../../api/userBlockApi.js';
import Oauth2 from '../../../Oauth2/Oauth2.jsx';

function DetailedForum(props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const principalQuery = usePrincipalQuery();
    const userId = principalQuery?.data?.data?.user?.userId;
    const userRole = principalQuery?.data?.data?.user?.userRole;

    const [searchParam] = useSearchParams();
    const forumId = parseInt(searchParam.get("forumId"));

    const inputRef = useRef(null);

    const [forum, setForum] = useState([]);
    const [commentValue, setCommentValue] = useState("");
    const [recomment, setRecomment] = useState(null);

    const [selectedUser, setSelectedUser] = useState(null);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);

    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [selectedReason, setSelectedReason] = useState('');
    const [customReason, setCustomReason] = useState('');
    const [reportTargetType, setReportTargetType] = useState(3);
    const [reportTargetId, setReportTargetId] = useState(null);

    const categoryQuery = useCategoryQuery();
    const categories = categoryQuery?.data?.data || [];

    const commentQuery = useCommentsQuery({ size: 20, forumId });
    const allComments = commentQuery?.data?.pages?.map(page => page.data.body.contents).flat() || [];
    const loaderRef = useRef(null);

    const userBlockListQuery = useUserBlockListQuery({ userId });
    const userBlockList = userBlockListQuery?.data?.data?.body;
    const isBlockedUser = userBlockList?.includes(selectedUser?.userId);


    let formatted = "";
    if (forum?.forumCreatedAt) {
        const date = new Date(forum.forumCreatedAt);
        formatted = new Intl.DateTimeFormat("ko-KR", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            timeZone: "Asia/Seoul",
        }).format(date);
    }

    const reportReasons = [
        '스팸 / 광고성 활동',
        '욕설 / 비방 / 혐오 발언',
        '음란물 / 불건전한 내용',
        '사기 / 도용 / 사칭',
        '불법 행위 (범죄, 불법거래 등)',
        '기타'
    ];

    const handleOpenUserModal = (user) => {
        setSelectedUser(user);
        setIsUserModalOpen(true);
    }

    const handleCloseUserModal = () => {
        setIsUserModalOpen(false);
        setSelectedUser(null);
    }

    const handleModalBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            handleCloseUserModal();
        }
    }

    const handleReportPostOnClick = () => {
        setReportTargetType(3);
        setReportTargetId(forumId);
        setIsReportModalOpen(true);
    }

    const handleReportUserOnClick = () => {
        setReportTargetType(1);
        setReportTargetId(selectedUser.userId);
        setIsReportModalOpen(true);
    }

    const handleCloseReportModal = () => {
        setIsReportModalOpen(false);
        setSelectedReason('');
        setCustomReason('');
        setReportTargetType(3);
        setReportTargetId(null);
    }

    const handleReasonChange = (reason) => {
        setSelectedReason(reason);
        if (reason !== '기타') {
            setCustomReason('');
        }
    }

    const handleSubmitReport = async () => {
        if (!selectedReason) return alert('신고 사유를 선택해주세요.');
        if (selectedReason === '기타' && !customReason.trim()) return alert('기타 사유를 입력해주세요.');

        try {
            const reportData = {
                userId,
                targetType: reportTargetType,
                targetId: reportTargetId,
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

    const handleToggleUserBlock = async (targetUserId, nickName) => {
        const action = isBlockedUser ? '차단해제' : '차단';
        const isConfirmed = window.confirm(`"${nickName}" 님을 ${action}하시겠습니까?`);
        if (!isConfirmed) return;

        try {
            if (isBlockedUser) await reqUserUnBlock(targetUserId);
            else await reqUserBlock(targetUserId);
            await queryClient.invalidateQueries(['userBlockList', userId]);
        } catch (error) {
            console.log(`사용자 ${action} 실패:`, error);
            alert(`${action}에 실패했습니다. 다시 시도해주세요.`);
        }
    }

    const fetchForum = async () => {
        try {
            const response = await reqDetailForum(forumId);
            setForum(response.data);
        } catch (error) {
            console.error("게시글 불러오기 실패:", error);
        }
    }

    useEffect(() => { if (forumId) fetchForum(); }, [forumId]);

    const handleDeleteForumOnClick = async (forumId, moimId) => {
        if (!window.confirm("게시글을 삭제하시겠습니까?")) return;
        try {
            await reqDeleteForum(forumId, moimId);
            queryClient.invalidateQueries(['forums']); 
            navigate(`/moim/detail?moimId=${moimId}`);
        } catch (error) {
            console.error("삭제 실패:", error);
            alert("게시글 삭제 중 오류 발생");
        }
    }

    const handleCommentOnChange = (e) => {
        const value = e.target.value;
        setCommentValue(value);
        if (recomment && !value.startsWith(`@${recomment?.user?.nickName}`)) setRecomment(null);
    }

    const handleRegisterCommentOnClick = async (forumId, moimId) => {
        if (!commentValue.trim()) return setCommentValue("");

        const content = /^@[가-힣\w]+(?=\s|$|[^가-힣\w])/.test(commentValue)
            ? commentValue.substring(commentValue.indexOf(" ") + 1)
            : commentValue;

        const comment = {
            parentCommentId: recomment?.forumCommentId,
            parentUserId: recomment?.user.userId,
            content
        }

        try {
            await reqRegisterComment(forumId, moimId, comment);
            setCommentValue("");
            setRecomment(null);
            await queryClient.invalidateQueries(['comments', forumId]);
            await fetchForum();
        } catch (error) {
            console.error("댓글 등록 실패:", error);
            alert("댓글 등록에 실패했습니다.");
        }
    }
    
    useEffect(() => {
        if (!!recomment) {
            setCommentValue(prev => {
                const content = /^@\w+\s/.test(commentValue) 
                    ? commentValue.substring(commentValue.indexOf(" ") + 1)
                    : commentValue;

                return `@${recomment.user.nick} ${content}`;
            });
        }
    }, [recomment]);

    const handleLikeOnClick = async () => { try { await reqLike(forumId); await fetchForum(); queryClient.invalidateQueries(['forums']); } catch (error) { console.error("좋아요 실패", error); } }
    const handleDislikeOnClick = async () => { try { await reqDislike(forumId); await fetchForum(); queryClient.invalidateQueries(['forums']); } catch (error) { console.error("좋아요 취소 실패", error); } }
    const handleCommentDeleteOnClick = async (forumId, moimId, forumCommentId) => { if (!window.confirm("댓글을 삭제하시겠습니까?")) return; try { await reqDeleteComment(forumId, moimId, forumCommentId); alert("댓글이 삭제되었습니다."); await queryClient.invalidateQueries(['comments', forumId]); await fetchForum(); } catch { alert("권한이 없습니다."); } }

    const canDeleteComment = (commentUserId) => userId === commentUserId || userRole === 'ADMIN';

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && commentQuery.hasNextPage) commentQuery.fetchNextPage();
        }, { rootMargin: "500px" });

        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => { if (loaderRef.current) observer.unobserve(loaderRef.current); }
    }, [loaderRef.current]);

    console.log(forum)

    if(principalQuery.isFetched && principalQuery.isSuccess) {
        return (
            <>
                <div css={s.forumCard} key={forum?.forumId}>
                    <div css={s.forumHeader}>
                        <div css={s.left}>
                            <img
                                css={s.modalProfileImage}
                                src={`${forum?.user?.profileImgPath}`}
                                alt=""
                                onClick={() => handleOpenUserModal(forum?.user)}
                                style={{cursor: 'pointer'}}
                            />
                            <div css={s.userInfo}>
                                <h3 css={s.h3Tag} onClick={() => handleOpenUserModal(forum?.user)} style={{cursor: 'pointer'}}>
                                    {forum?.user?.nickName}
                                </h3>
                                <p css={s.postMeta}>
                                    {forum?.forumCategory?.forumCategoryName} · {formatted}
                                </p>
                            </div>
                        </div>
                        <div css={s.buttonWrapper}>
                            {userRole === "ROLE_ADMIN" || userId === forum?.user?.userId || userId === forum?.moim?.userId ? (
                                <>
                                    <button css={s.editButton} onClick={() => navigate(`/forum/modify?forumId=${forumId}`)}>수정</button>
                                    <button css={s.deleteButton} onClick={() => handleDeleteForumOnClick(forumId, forum?.moim?.moimId)}>삭제</button>
                                </>
                            ) : (
                                <button css={s.reportButton} onClick={handleReportPostOnClick}>
                                    <MdReport /> 신고하기
                                </button>
                            )}
                        </div>
                    </div>
                    <div css={s.forumBody}>
                        <h2 css={s.forumTitle}>{forum?.forumTitle}</h2>
                        <p css={s.forumContent}>{forum?.forumContent}</p>
                        {forum?.forumImgList?.map(img => (
                          <img key={img.forumImgId} src={`${img.path}`} alt="forum-img" />
                        ))}
                    </div>
                    <div css={s.forumFooter}>
                        {
                            !!forum.isLike
                            ? <p onClick={(e) => handleDislikeOnClick(e)}><BiSolidLike style={{ color: '#1e1ef3ff' }} />{forum?.likeCount}</p>
                            : <p onClick={(e) => handleLikeOnClick(e)}><BiLike />{forum?.likeCount}</p>
                        }
                        <p onClick={() => inputRef.current?.focus()}><FaRegComment />{allComments.length}</p>
                    </div>
                    <div css={s.comments}>
                      <div css={s.commentList}>
                          {
                            allComments?.map(comment => {
                              if (comment.level === 0) {
                                return (
                                    <div key={comment.forumCommentId} css={s.commentRow}>
                                        <div css={s.commentItem}>
                                            <img 
                                                src={`${comment?.user?.profileImgPath}`} 
                                                alt="profile" 
                                                css={s.commentProfileImage} 
                                                onClick={() => handleOpenUserModal(comment?.user)}
                                                style={{cursor: 'pointer'}}
                                            />
                                            <div css={s.commentBody}>
                                                <p 
                                                    css={s.commentAuthor} 
                                                    onClick={() => handleOpenUserModal(comment?.user)}
                                                    style={{cursor: 'pointer'}}
                                                >
                                                    {comment?.user?.nickName}
                                                </p>
                                                <p css={s.commentText}>{comment?.forumComment}</p>
                                                <div css={s.commentActions}>
                                                    <p css={s.recomment} onClick={() => setRecomment(comment)}>답글 달기</p>
                                                </div>
                                            </div>
                                        </div>
        
                                        {/* 댓글 삭제 권한 체크 - 본인이거나 관리자만 */}
                                        {canDeleteComment(comment?.user?.userId) && (
                                            <div css={s.transactionButton}>
                                                <button type="button" onClick={() => handleCommentDeleteOnClick(forumId, forum.moim.moimId, comment.forumCommentId)}><X size={12} /></button>
                                            </div>
                                        )}
                                    </div>
                                )
                              }
                              return (
                                  <div key={comment.forumCommentId} css={s.commentRow}>
                                        <div css={s.subCommentItem}>
                                            <img 
                                                src={`${comment?.user?.profileImgPath}`} 
                                                alt="profile" 
                                                css={s.commentProfileImage} 
                                                onClick={() => handleOpenUserModal(comment?.user)}
                                                style={{cursor: 'pointer'}}
                                            />
                                            <div css={s.commentBody}>
                                                <p 
                                                    css={s.commentAuthor} 
                                                    onClick={() => handleOpenUserModal(comment?.user)}
                                                    style={{cursor: 'pointer'}}
                                                >
                                                    {comment?.user?.nickName}
                                                </p>
                                                <span css={s.commentText}>
                                                    <span css={s.tagText}>@{comment.parentUsername}</span>
                                                    {comment?.forumComment}
                                                </span>
                                                <div css={s.commentActions}>
                                                    <p css={s.recomment} 
                                                        onClick={() => {
                                                            setRecomment(comment);
                                                            setTimeout(() => inputRef.current?.focus(), 0);
                                                        }}
                                                    >
                                                        답글 달기
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* 대댓글 삭제 권한 체크 - 본인이거나 관리자만 */}
                                        {canDeleteComment(comment?.user?.userId) && (
                                            <div css={s.transactionButton}>
                                                <button type="button" onClick={() => handleCommentDeleteOnClick(forumId, forum.moim.moimId, comment.forumCommentId)}><X size={12} /></button>
                                            </div>
                                        )}
                                    </div>
                              )
                            })
                          }
                      </div>
        
                      <div css={s.writeComment}>
                          <input type="text" placeholder="댓글을 입력하세요" css={s.input} value={commentValue} onChange={handleCommentOnChange} ref={inputRef} />
                          <button 
                          css={s.button} 
                          disabled={recomment && !recomment?.user?.userId} 
                          onClick={() => handleRegisterCommentOnClick(forumId, forum?.moim?.moimId)}
                          >
                            등록
                          </button>
                      </div>
                    </div>
                </div>

                {isUserModalOpen && selectedUser && (
                    <div css={s.modalOverlay} onClick={handleModalBackdropClick}>
                        <div css={s.modalContent}>
                            <div css={s.modalHeader}>
                                <h3>사용자 프로필</h3>
                                <div css={s.modalHeaderButtons}>
                                    <button css={s.reportButton} onClick={handleReportUserOnClick}>
                                        <MdReport />
                                    </button>
                                    <button css={s.closeButton} onClick={handleCloseUserModal}>
                                        <IoClose />
                                    </button>
                                </div>
                            </div>
                            <div css={s.modalBody}>
                                <div css={s.userProfile}>
                                    <img
                                        src={`${selectedUser.profileImgPath}`}
                                        alt="프로필"
                                        css={s.modalProfileImageLarge}
                                    />
                                    <div css={s.userDetails}>
                                        <div css={s.userNameRow}>
                                            <h4>{selectedUser.nickName}</h4>
                                            {selectedUser.birthDate && <div>{selectedUser.birthDate}</div>}
                                        </div>
                                        <div css={s.userCategory}>
                                            {categories?.find(category => category.categoryId === selectedUser.categoryId)?.categoryEmoji}
                                            {categories?.find(category => category.categoryId === selectedUser.categoryId)?.categoryName}
                                        </div>
                                        {selectedUser.introduction && (
                                            <p css={s.userIntroduction}>{selectedUser.introduction}</p>
                                        )}
                                        <div css={s.modalButtonContainer}>
                                            <button onClick={() => handleToggleUserBlock(selectedUser.userId, selectedUser.nickName)}>
                                                {isBlockedUser ? '차단 해제' : '차단하기'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {isReportModalOpen && (
                    <div css={s.reportModalOverlay} onClick={(e) => e.target === e.currentTarget && handleCloseReportModal()}>
                        <div css={s.reportModalContent}>
                            <div css={s.reportModalHeader}>
                                <h3>
                                    {reportTargetType === 3 ? '게시글 신고' : 
                                     reportTargetType === 4 ? '댓글 신고' : '사용자 신고'}
                                </h3>
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
            </>
        );
    }
    return (
        <div css={s.loginContainer}>
            <h2>로그인이 필요한 페이지입니다</h2>
            <div css={s.loginBox}>
                <Oauth2 />
            </div>
        </div>
    );
}

export default DetailedForum;