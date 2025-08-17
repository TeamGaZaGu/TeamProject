/** @jsxImportSource @emotion/react */
import * as s from './styles.js';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { reqDeleteForum, reqDetailForum, reqModifyForum } from '../../../api/forumApi';
import { baseURL } from '../../../api/axios.js';
import { BiLike } from 'react-icons/bi';
import { FaCameraRetro, FaRegComment } from 'react-icons/fa';
import { useQueryClient } from '@tanstack/react-query';

function DetailedForum(props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [ searchParam ] = useSearchParams();
    const forumId = searchParam.get("forumId");

    const [forum, setForum] = useState(null);
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
    console.log(forum?.moim?.moimId)

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
            </div>
            <div css={s.forumFooter}>
                <p><BiLike /></p>
                <p><FaRegComment /></p>
            </div>
            <div css={s.comments}>
                <div css={s.commentList}>
                    <div css={s.commentItem}>
                        <img src="/profile.png" alt="profile" css={s.commentProfileImage} />
                        <div css={s.commentBody}>
                            <p css={s.commentAuthor}>홍길동</p>
                            <p css={s.commentText}>좋은 글 잘 읽었습니다!</p>
                        </div>
                    </div>

                    <div css={s.commentItem}>
                        <img src="/profile2.png" alt="profile" css={s.commentProfileImage} />
                        <div css={s.commentBody}>
                            <p css={s.commentAuthor}>김영희</p>
                            <p css={s.commentText}>저도 같은 생각이에요 👍</p>
                        </div>
                    </div>
                </div>

                {/* 댓글 작성 */}
                <div css={s.writeComment}>
                    <button css={s.button}><FaCameraRetro /></button>
                    <input type="text" placeholder="댓글을 입력하세요" css={s.input} />
                    <button css={s.button}>등록</button>
                </div>
            </div>
        </div>
    );
}

export default DetailedForum;