import api from "./axios";

export const reqRegisterForum = async (data, moimId) => await api.post(`/api/moims/${moimId}/register`, data, {
    headers: {
    'Content-Type': 'multipart/form-data'
  }
});

export const reqGetForums = async (moimId) => await api.get(`/api/moims/${moimId}/forums`);

export const reqGetForumCategories = async () => await api.get("/api/moims/forumCategories");

export const reqDetailForum = async (forumId) => await api.get(`/api/moims/${forumId}`);

export const reqModifyForum = async (moimId, forumId, data) => await api.put(`/api/moims/${moimId}/${forumId}/modify`, data);

export const reqDeleteForum = async (forumId, moimId) => await api.delete(`/api/moims/${moimId}/${forumId}/delete`);

export const reqGetComment = async (forumId) => await api.get(`api/moims/${forumId}/comments`);

export const reqRegisterComment = async (forumId, moimId, data) => await api.post(`api/moims/${moimId}/${forumId}/comment`, data);

export const reqDeleteComment = async (forumId, moimId, forumCommentId) => await api.delete(`api/moims/${moimId}/${forumId}/comment/delete/${forumCommentId}`)

export const reqLike = async (forumId) => await api.post(`api/moims/${forumId}/like`);

export const reqDislike = async (forumId) => await api.delete(`/api/moims/${forumId}/dislike`);