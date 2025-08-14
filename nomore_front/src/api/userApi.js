import api from "./axios";

export const reqAllUser = async () => await api.get("/api/user/admin");

export const reqBlockUser = async (userId) => await api.put(`/api/user/siteBlockUser?userId=${userId}`)

export const reqUnBlockUser = async (userId) => await api.put(`/api/user/siteUnBlockUser?userId=${userId}`)

export const reqUserBlock = async (userId) => await api.post(`/api/user/userBlock?userId=${userId}`);