import api from "./axios";

export const reqRegisterForum = async () => await api.post(`/api/moims/{moimId}/register`, data)