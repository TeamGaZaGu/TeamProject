import api from "./axios";

export const reqRegisterForum = async (data, moimId) => await api.post(`/api/moims/${moimId}/register`, data, {
    headers: {
    'Content-Type': 'multipart/form-data'
  }
})

export const reqGetForumCategories = async (moimId) => await api.get(`/api/moims/${moimId}/forumCategories`)