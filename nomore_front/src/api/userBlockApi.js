import api from './axios';

export const reqUserBlockList = async ({userId}) => api.get(`/api/user/${userId}/blocks`);

export const reqUserBlock = async (userId) => api.post(`/api/user/userBlock?userId=${userId}`);

export const reqUserUnBlock = async (userId) => api.delete(`/api/user/userBlock?userId=${userId}`);
