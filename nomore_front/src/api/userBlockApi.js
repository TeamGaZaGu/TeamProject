import api from './axios';

export const reqUserBlockList = async ({userId}) => api.get(`/api/users/${userId}/blocks`);

export const reqUserBlock = async (userId) => api.post(`/api/users/userBlock?userId=${userId}`);

export const reqUserUnBlock = async (userId) => api.delete(`/api/users/userBlock?userId=${userId}`);
