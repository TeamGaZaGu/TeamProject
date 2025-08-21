/** @jsxImportSource @emotion/react */
import * as s from './styles.js';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {  reqRegisterComment, reqDeleteForum, reqDetailForum, reqGetComment, reqDeleteComment, reqLike, reqDislike } from '../../../api/forumApi';
import { baseURL } from '../../../api/axios.js';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { FaCameraRetro, FaRegComment, FaRegHeart } from 'react-icons/fa';
import { useQueryClient } from '@tanstack/react-query';
import usePrincipalQuery from '../../../queries/usePrincipalQuery.jsx';
import { SiKakaotalk } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';
import { X } from 'lucide-react';
import useCommentsQuery from '../../../queries/useCommentsQuery.jsx';

function DetailedForum(props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const principalQuery = usePrincipalQuery();
    const inputRef = useRef(null);

    const [ searchParam ] = useSearchParams();
    const forumId = parseInt(searchParam.get("forumId"));

    const commentQuery = useCommentsQuery({ size:20 , forumId})
    const allComments = commentQuery?.data?.pages?.map(page => page.data.body.contents).flat() || [];
    const isLast = commentQuery?.data?.data?.body.isLast || false;
    console.log("--------------------")
    console.log(allComments);

    const loaderRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                if(commentQuery.hasNextPage) {
                    commentQuery.fetchNextPage();
                }
            }
        }, { 
            rootMargin: "500px",
        });

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [loaderRef.current]);

    const [ comments, setComments ] = useState([]);
    const [ commentValue, setCommentValue ] = useState("");
    const [ recomment, setRecomment ] = useState(null);
    
    const [ forum, setForum ] = useState([]);
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

    const fetchForum = async () => {
        try {
            const response = await reqDetailForum(forumId);
            setForum(response.data);
        } catch (error) {
            console.error("게시글 불러오기 실패:", error);
        }
    };
    
    useEffect(() => {
        if (forumId) {
            fetchForum();
        }
    }, [forumId]);
        
    const handleDeleteForumOnClick = async (forumId, moimId) => {
        const confirmDelete = window.confirm("게시글을 삭제하시겠습니까?");
        if (!confirmDelete) return;

        try {
            await reqDeleteForum(forumId, moimId);
            queryClient.invalidateQueries(['forums']); 
            navigate(`/suggest/description?moimId=${moimId}`);
        } catch (error) {
            console.error("삭제 실패:", error);
            alert("게시글 삭제 중 오류 발생");
        }
    };

    const handleCommentOnChange = (e) => {
      const value = e.target.value;
      setCommentValue(value);

      if (recomment && !value.startsWith(`@${recomment?.user?.nickName}`)) {
        setRecomment(null);
      }
    }

    // 댓글 작성 후 즉시 반영되도록 수정
    const handleRegisterCommentOnClick = async (forumId, moimId) => {
        if (commentValue.trim() === "") {
            return setCommentValue("");
        }

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
            
            // 댓글 쿼리 무효화하여 새 댓글 데이터 다시 가져오기
            await queryClient.invalidateQueries(['comments', forumId]);
            // 포럼 상세 정보도 새로고침 (댓글 수 업데이트 등)
            await fetchForum();
            
        } catch (error) {
            console.error("댓글 등록 실패:", error);
            alert("댓글 등록에 실패했습니다.");
        }
    }

    useEffect(() => {
        if(!!recomment) {
            setCommentValue(prev => {
                const content = /^@[가-힣\w]+(?=\s|$|[^가-힣\w])/.test(commentValue)
                    ? commentValue.substring(commentValue.indexOf(" ") + 1)
                    : commentValue;

                return `@${recomment.user.nickName} ${content}`;
            });
        }
    }, [recomment]);

    // 좋아요/싫어요도 즉시 반영되도록 수정
    const handleLikeOnClick = async (e) => {
        try {
            await reqLike(forumId);
            await fetchForum();
            // 포럼 목록 쿼리도 무효화 (좋아요 수 반영)
            queryClient.invalidateQueries(['forums']);
        } catch (error) {
            console.error("좋아요 처리 실패:", error);
        }
    }

    const handleDislikeOnClick = async (e) => {
        try {
            await reqDislike(forumId);
            await fetchForum();
            // 포럼 목록 쿼리도 무효화 (좋아요 수 반영)
            queryClient.invalidateQueries(['forums']);
        } catch (error) {
            console.error("좋아요 취소 처리 실패:", error);
        }
    }

    // 댓글 삭제 후 즉시 반영되도록 수정
    const handleCommentDeleteOnClick = async (forumId, moimId, forumCommentId) => {
        const confirmDelete = window.confirm("댓글을 삭제하시겠습니까?");
        if (!confirmDelete) return;

        console.log("moimId", moimId)

        try {
            await reqDeleteComment(forumId, moimId, forumCommentId);
            alert("댓글이 삭제되었습니다.");
            
            // 댓글 쿼리 무효화하여 삭제된 댓글 반영
            await queryClient.invalidateQueries(['comments', forumId]);
            // 포럼 정보도 새로고침 (댓글 수 업데이트)
            await fetchForum();
            
        } catch (e) {
            alert("권한이 없습니다.");
        }
    };

    if(principalQuery.isFetched && principalQuery.isSuccess) {
        return (
            <div css={s.forumCard} key={forum?.forumId}>
                <div css={s.forumHeader}>
                    <div css={s.left}>
                        <img
                            css={s.modalProfileImage}
                            src={`${baseURL}/image${forum?.user?.profileImgPath}`}
                            alt=""
                        />
                        <div css={s.userInfo}>
                            <h3 css={s.h3Tag}>{forum?.user?.nickName}</h3>
                            <p css={s.postMeta}>
                                {forum?.forumCategory?.forumCategoryName} · {formatted}
                            </p>
                        </div>
                    </div>
                    <div css={s.buttonWrapper}>
                        <button css={s.editButton} onClick={() => navigate(`/forum/modify?forumId=${forumId}`)}>수정</button>
                        <button css={s.deleteButton} onClick={() => handleDeleteForumOnClick(forumId, forum?.moim?.moimId)}>삭제</button>
                    </div>
                </div>
                <div css={s.forumBody}>
                    <h2 css={s.forumTitle}>{forum?.forumTitle}</h2>
                    <p css={s.forumContent}>{forum?.forumContent}</p>
                    {forum?.forumImgList?.map(img => (
                      <img key={img.forumImgId} src={`${baseURL}/image${img.path}`} alt="forum-img" />
                    ))}
                </div>
                <div css={s.forumFooter}>
                    {
                        !!forum.isLike
                        ? <p onClick={(e) => handleDislikeOnClick(e)}><BiSolidLike style={{ color: '#1e1ef3ff' }} />{forum?.likeCount}</p>
                        : <p onClick={(e) => handleLikeOnClick(e)}><BiLike />{forum?.likeCount}</p>
                    }
                    <p onClick={() => inputRef.current?.focus()}><FaRegComment />{comments.length}</p>
                </div>
                <div css={s.comments}>
                  <div css={s.commentList}>
                      {
                        allComments?.map(comment => {
                          if (comment.level === 0) {
                            return <>
                                <div css={s.commentRow}>
                                    <div css={s.commentItem}>
                                        <img src={`${baseURL}/image${comment?.user?.profileImgPath}`} alt="profile" css={s.commentProfileImage} />
                                        <div css={s.commentBody}>
                                        <p css={s.commentAuthor}>{comment?.user?.nickName}</p>
                                        <p css={s.commentText}>{comment?.forumComment}</p>
                                        <p css={s.recomment} onClick={() => setRecomment(comment)}>답글 달기</p>
                                        </div>
                                    </div>
    
                                    <div css={s.transactionButton}>
                                        <button type="button" onClick={() => handleCommentDeleteOnClick(forumId, forum.moim.moimId, comment.forumCommentId)}><X size={12} /></button>
                                    </div>
                                </div>
                            </>
                          }
                          return <>
                              <div css={s.commentRow}>
                                    <div css={s.subCommentItem}>
                                        <img src={`${baseURL}/image${comment?.user?.profileImgPath}`} alt="profile" css={s.commentProfileImage} />
                                        <div css={s.commentBody}>
                                        <p css={s.commentAuthor}>{comment?.user?.nickName}</p>
                                        <span css={s.commentText}><span css={s.tagText}>@{comment.parentUsername}</span>{comment?.forumComment}</span>
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
                                    <div css={s.transactionButton}>
                                        <button type="button" onClick={() => handleCommentDeleteOnClick(forumId, forum.moim.moimId, comment.forumCommentId)}><X size={12} /></button>
                                    </div>
                                </div>
                          </>
                        })
                      }
                  </div>

                  {!isLast && <div ref={loaderRef} style={{ height: "50px" }} />}
    
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
        );
    }
    return (
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
    );
}

export default DetailedForum;