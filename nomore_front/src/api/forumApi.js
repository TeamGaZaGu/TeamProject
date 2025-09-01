import api from "./axios";

export const reqRegisterForum = async (data, moimId) => await api.post(`/api/forum/${moimId}/register`, data, {
    headers: {
    'Content-Type': 'multipart/form-data'
  }
});

export const reqGetForums = async ({page, size, moimId}) => await api.get("/api/forum/forums", {
  params: {
    page,
    size,
    moimId,
  }
});

export const reqGetForumsWithParams = async (moimId, params) => await api.get(`/api/moims/${moimId}/forums`, { params });

export const reqGetForumCategories = async () => await api.get("/api/forum/forumCategories");

export const reqDetailForum = async (forumId) => await api.get(`/api/forum/${forumId}`);

export const reqDetailForumBlob = async ({url, imageConfigsName}) => await api.get(`/api/forum/forums/blobs`, {
    params: {url, imageConfigsName},
    responseType: 'blob',
  });

export const reqModifyForum = async (forumId, data) => await api.put(`/api/forum/${forumId}/modify`, data);

export const reqDeleteForum = async (forumId, moimId) => await api.delete(`/api/forum/${moimId}/${forumId}/delete`);

export const reqGetComment = async ({page, size, forumId}) => await api.get(`api/forum/comments`, {
  params: {
    page,
    size,
    forumId,
  }
});

export const reqRegisterComment = async (forumId, moimId, data) => await api.post(`api/forum/${moimId}/${forumId}/comment`, data);

export const reqDeleteComment = async (forumId, moimId, forumCommentId) => await api.delete(`api/forum/${moimId}/${forumId}/comment/delete/${forumCommentId}`)

export const reqLike = async (forumId) => await api.post(`api/forum/${forumId}/like`);

export const reqDislike = async (forumId) => await api.delete(`/api/forum/${forumId}/dislike`);