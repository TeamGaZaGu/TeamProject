import api from './axios';

export const reqAllUser = async () => api.get('/api/user/admin');

export const reqBlockUser = async (userId) => api.put(`/api/user/siteBlockUser?userId=${userId}`);

export const reqUnBlockUser = async (userId) => api.put(`/api/user/siteUnBlockUser?userId=${userId}`);

export const deleteUser = async (userId) => api.delete(`/api/user/${userId}`);

