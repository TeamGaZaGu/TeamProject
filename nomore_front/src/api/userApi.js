import api from "./axios";

export const reqAllUser = async () => await api.get("/api/user/admin");

export const reqBlockUser = async (userId) => await api.put(`/api/user/siteBlockUser?userId=${userId}`);

export const reqUnBlockUser = async (userId) => await api.put(`/api/user/siteUnBlockUser?userId=${userId}`);

export const reqUserBlockList = async () => await api.get("/api/user/userBlock");

export const reqUserBlock = async (userId) => await api.post(`/api/user/userBlock?userId=${userId}`);

export const reqUserUnBlock = async (userId) => await api.delete(`/api/user/userBlock?userId=${userId}`);