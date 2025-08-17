import api from "./axios";

export const reqRegisterForum = async (data, moimId) => await api.post(`/api/moims/${moimId}/register`, data, {
    headers: {
    'Content-Type': 'multipart/form-data'
  }
});

export const reqGetForums = async (moimId) => await api.get(`/api/moims/${moimId}/forums`)

export const reqGetForumCategories = async () => await api.get("/api/moims/forumCategories");

