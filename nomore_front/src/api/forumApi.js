import api from "./axios";

export const reqRegisterForum = async (data, moimId) => await api.post(`/api/forums/${moimId}`, data, {
    headers: {
    'Content-Type': 'multipart/form-data'
  }
});

export const reqGetForums = async ({page, size, moimId}) => await api.get("/api/forums", {
  params: {
    page,
    size,
    moimId,
  }
});

export const reqDetailForum = async (forumId) => await api.get(`/api/forums/${forumId}`);

export const reqModifyForum = async (forumId, data) => await api.put(`/api/forums/${forumId}`, data);

export const reqDeleteForum = async (forumId, moimId) => await api.delete(`/api/forums/${moimId}/${forumId}`);

export const reqGetForumCategories = async () => await api.get("/api/forums/categories");

export const reqDetailForumBlob = async ({url, imageConfigsName}) => await api.get(`/api/forums/blobs`, {
    params: {url, imageConfigsName},
    responseType: 'blob',
  });

export const reqGetComment = async ({page, size, forumId}) => await api.get(`api/forums/comments`, {
  params: {
    page,
    size,
    forumId,
  }
});

export const reqLike = async (forumId) => await api.post(`api/forums/${forumId}/like`);

export const reqDislike = async (forumId) => await api.delete(`/api/forums/${forumId}/like`);

export const reqRegisterComment = async (forumId, moimId, data) => await api.post(`api/forums/${moimId}/${forumId}/comments`, data);
  
export const reqDeleteComment = async (forumCommentId) => await api.delete(`api/forums/comments/${forumCommentId}`)