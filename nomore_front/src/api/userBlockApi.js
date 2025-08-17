import api from './axios';

export const reqUserBlockList = async () => api.get('/api/user/userBlock');

export const reqUserBlock = async (userId) => api.post(`/api/user/userBlock?userId=${userId}`);

export const reqUserUnBlock = async (userId) => api.delete(`/api/user/userBlock?userId=${userId}`);

export const reqCheckBlockStatus = async (userId) => api.get(`/api/user/userBlock/status?userId=${userId}`);
