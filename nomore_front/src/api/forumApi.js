import api from "./axios";

export const reqRegisterForum = async (data, moimId) => await api.post(`/api/moims/${moimId}/register`, data, {
    headers: {
    'Content-Type': 'multipart/form-data'
  }
});

export const reqGetForums = async (moimId) => await api.get(`/api/moims/${moimId}/forums`)

export const reqGetForumCategories = async () => await api.get("/api/moims/forumCategories");


// 게시글 상세 조회
export const reqGetForumById = async (forumId) =>
  await api.get(`/api/moims/${forumId}`);

// 댓글 조회
export const reqGetForumComments = async (forumId) =>
  await api.get(`/api/moims/${forumId}/comments`);

// 댓글/대댓글 작성
export const reqRegisterComment = async (moimId, forumId, content, parentCommentId = null, parentUserId = null) => {
  const formData = new FormData();
  formData.append("forumComment", content);
  if (parentCommentId) formData.append("parentCommentId", parentCommentId);
  if (parentUserId) formData.append("parentUserId", parentUserId);

  return await api.post(`/api/moims/${moimId}/${forumId}/comment`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// 좋아요/취소
export const reqLikeForum = async (forumId) =>
  await api.post(`/api/moims/${forumId}/like`);

export const reqDislikeForum = async (forumId) =>
  await api.delete(`/api/moims/${forumId}/dislike`);