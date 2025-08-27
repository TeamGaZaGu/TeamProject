/** @jsxImportSource @emotion/react */
import * as s from './styles.js';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {  reqRegisterComment, reqDeleteForum, reqDetailForum, reqGetComment, reqDeleteComment, reqLike, reqDislike } from '../../../api/forumApi';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { FaCameraRetro, FaRegComment, FaRegHeart } from 'react-icons/fa';
import { useQueryClient } from '@tanstack/react-query';
import usePrincipalQuery from '../../../queries/usePrincipalQuery.jsx';
import { SiKakaotalk } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';
import { X } from 'lucide-react';

function DetailedForum(props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const principalQuery = usePrincipalQuery();
    const inputRef = useRef(null);

    const [ searchParam ] = useSearchParams();
    const forumId = searchParam.get("forumId");

    const [ comments, setComments ] = useState([]);
    const [ commentValue, setCommentValue ] = useState("");
    const [ recomment, setRecomment ] = useState(null);
    console.log("recomment",recomment)
    
    const [ forum, setForum ] = useState([]);
    console.log(forum)
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

    const fetchComment = async () => {
      try {
        const response = await reqGetComment(forumId);
        setComments(response?.data)
      } catch (error) {
          console.log("댓글 불러오기 실패:", error);
      }
    };

    useEffect(() => {
      if (forumId) {
            fetchComment();
        }
    }, [forumId])

        
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
        await reqRegisterComment(forumId, moimId, comment)
        setCommentValue("");
        setRecomment(null);
        await fetchComment();
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


    const handleLikeOnClick = async (e) => {
        await reqLike(forumId)
        await fetchForum()
    }

    const handleDislikeOnClick = async (e) => {
        await reqDislike(forumId)
        await fetchForum()
    }

    const handleCommentDeleteOnClick = async (forumId, moimId, forumCommentId) => {
        const confirmDelete = window.confirm("댓글을 삭제하시겠습니까?");
        if (!confirmDelete) return;

        console.log("moimId", moimId)

        try {
            await reqDeleteComment(forumId, moimId, forumCommentId);
            alert("댓글이 삭제되었습니다.");
            await fetchComment()
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
                            src={`${forum?.user?.profileImgPath}`}
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
                      <img key={img.forumImgId} src={`${img.path}`} alt="forum-img" />
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
                        comments?.map(comment => {
                          if (comment.level === 0) {
                            return <>
                                <div css={s.commentRow}>
                                    <div css={s.commentItem}>
                                        <img src={`${comment?.user?.profileImgPath}`} alt="profile" css={s.commentProfileImage} />
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
                                        <img src={`${comment?.user?.profileImgPath}`} alt="profile" css={s.commentProfileImage} />
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