import api from './axios';

export const reqAllUser = async () => api.get('/api/user/admin');

// 관리자가 차단
export const reqBlockUser = async (userId) => api.put(`/api/user/siteBlockUser?userId=${userId}`);

// 관리자가 차단 해제
export const reqUnBlockUser = async (userId) => api.put(`/api/user/siteUnBlockUser?userId=${userId}`);