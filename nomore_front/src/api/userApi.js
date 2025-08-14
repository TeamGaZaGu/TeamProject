import api from "./axios";

export const reqAllUser = async () => await api.get("/api/user/admin");

export const reqBlockUser = async (userId) => await api.put(`/api/user/blockUser?userId=${userId}`)

export const reqUnBlockUser = async (userId) => await api.put(`/api/user/unBlockUser?userId=${userId}`)