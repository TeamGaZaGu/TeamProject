import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  reqGetForumById,
  reqGetForumComments,
  reqRegisterComment,
  reqLikeForum,
  reqDislikeForum,
} from "../../../api/forumApi";
import { BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";

function DetailedForum() {
  // URL에서 moimId와 forumId 가져오기
  const { moimId, forumId } = useParams();

  const [forum, setForum] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState({}); // 대댓글 별로 관리

  useEffect(() => {
    if (!forumId) return;

    const fetchData = async () => {
      try {
        const forumRes = await reqGetForumById(forumId);
        setForum(forumRes.data);

        const commentsRes = await reqGetForumComments(forumId);
        setComments(commentsRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [forumId]);

  // 좋아요 토글
  const handleLikeClick = async () => {
    if (!forum) return;
    try {
      if (forum.isLike === 1) {
        await reqDislikeForum(moimId, forumId);
        setForum({ ...forum, isLike: 0, likeCount: forum.likeCount - 1 });
      } else {
        await reqLikeForum(moimId, forumId);
        setForum({ ...forum, isLike: 1, likeCount: forum.likeCount + 1 });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 댓글 작성
  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    try {
      await reqRegisterComment(moimId, forumId, commentText);
      setCommentText("");
      const commentsRes = await reqGetForumComments(forumId);
      setComments(commentsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 대댓글 작성
  const handleReplySubmit = async (parentComment) => {
    const content = replyText[parentComment.forumCommentId];
    if (!content || !content.trim()) return;

    try {
      await reqRegisterComment(
        moimId,
        forumId,
        content,
        parentComment.forumCommentId,
        parentComment.userId
      );
      setReplyText({ ...replyText, [parentComment.forumCommentId]: "" });
      const commentsRes = await reqGetForumComments(forumId);
      setComments(commentsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!forum) return <div>로딩중...</div>;

  return (
    <div>
      <h1>{forum.forumTitle}</h1>
      <p>{forum.forumContent}</p>
      <p>작성자: {forum.user?.nickName}</p>
      <p>카테고리: {forum.forumCategory?.forumCategoryName}</p>

      {/* 좋아요/댓글 */}
      <div>
        <button onClick={handleLikeClick}>
          <BiLike /> {forum.likeCount} {forum.isLike === 1 ? "💖" : ""}
        </button>
        <span>
          <FaRegComment /> {comments.length}
        </span>
      </div>

      {/* 댓글 작성 */}
      <div>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="댓글 작성..."
        />
        <button onClick={handleCommentSubmit}>작성</button>
      </div>

      {/* 댓글 리스트 */}
      <div>
        {comments.map((c) => (
          <div key={c.forumCommentId} style={{ marginTop: "10px" }}>
            <p>
              <strong>{c.user?.nickName}</strong>: {c.forumComment}
            </p>

            {/* 대댓글 작성 */}
            <div style={{ marginLeft: "20px" }}>
              <textarea
                value={replyText[c.forumCommentId] || ""}
                onChange={(e) =>
                  setReplyText({
                    ...replyText,
                    [c.forumCommentId]: e.target.value,
                  })
                }
                placeholder="대댓글 작성..."
              />
              <button onClick={() => handleReplySubmit(c)}>작성</button>
            </div>

            {/* 대댓글 표시 */}
            {c.children &&
              c.children.map((child) => (
                <div key={child.forumCommentId} style={{ marginLeft: "40px" }}>
                  <p>
                    <strong>{child.user?.nickName}</strong> (reply to{" "}
                    {child.parentUsername}): {child.forumComment}
                  </p>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetailedForum;
