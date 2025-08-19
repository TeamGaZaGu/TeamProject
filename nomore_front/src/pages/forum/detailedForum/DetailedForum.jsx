/** @jsxImportSource @emotion/react */
import * as s from './styles.js';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {  reqRegisterComment, reqDeleteForum, reqDetailForum, reqGetComment } from '../../../api/forumApi';
import { baseURL } from '../../../api/axios.js';
import { BiLike } from 'react-icons/bi';
import { FaCameraRetro, FaRegComment } from 'react-icons/fa';
import { useQueryClient } from '@tanstack/react-query';

function DetailedForum(props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [ searchParam ] = useSearchParams();
    const forumId = searchParam.get("forumId");

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
    
    useEffect(() => {
        const fetchForum = async () => {
            try {
                const response = await reqDetailForum(forumId);
                setForum(response.data);
            } catch (error) {
                console.error("게시글 불러오기 실패:", error);
            }
        };

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
        try {
            await reqDeleteForum(forumId, moimId);

            await queryClient.invalidateQueries({ queryKey: ['forums', moimId] });

            await navigate(`/suggest/description?moimId=${moimId}`);
            
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
      const content = /^@\w+\s/.test(commentValue) 
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
                const content = /^@\w+\s/.test(commentValue) 
                    ? commentValue.substring(commentValue.indexOf(" ") + 1)
                    : commentValue;

                return `@${recomment.user.nickName} ${content}`;
            });
        }
    }, [recomment]);
    

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
                <p><BiLike />{forum?.likeCount}</p>
                <p><FaRegComment />{forum?.commentCount}</p>
            </div>
            <div css={s.comments}>
              <div css={s.commentList}>
                  {
                    comments?.map(comment => {
                      if (comment.level === 0) {
                        return <>
                            <div css={s.commentItem}>
                                <img src={`${baseURL}/image${comment?.user?.profileImgPath}`} alt="profile" css={s.commentProfileImage} />
                                <div css={s.commentBody}>
                                    <p css={s.commentAuthor}>{comment?.user?.nickName}</p>
                                    <p css={s.commentText}>{comment?.forumComment}</p>
                                    <p css={s.recomment} onClick={() => setRecomment(comment)}>답글 달기</p>
                                </div>
                            </div>
                        </>
                      }
                      return <>
                          <div></div>
                          <div css={s.subCommentGridContainer}>
                              <img src={`${baseURL}/image${comment?.user?.profileImgPath}`} alt="profile" css={s.commentProfileImage} />
                              <div css={s.commentBody}>
                                  <p css={s.commentAuthor}>{comment?.user?.nickName}</p>
                                  <span css={s.commentText}><span css={s.tagText}>@{comment.parentUsername}</span>{comment?.forumComment}</span>
                                  <p css={s.recomment} onClick={() => setRecomment(comment)}>답글 달기</p>
                              </div>
                          </div>
                      </>
                    })
                  }
              </div>

              <div css={s.writeComment}>
                  <input type="text" placeholder="댓글을 입력하세요" css={s.input} value={commentValue} onChange={handleCommentOnChange} />
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

export default DetailedForum;