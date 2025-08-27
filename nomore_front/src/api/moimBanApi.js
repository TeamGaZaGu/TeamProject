import api from './axios';

export const reqMoimBanList = async (moimId) => api.get(`/api/moim/${moimId}/ban`);
export const reqMoimBanUser = async (moimId, userId, reason) => api.post(`/api/moim/${moimId}/ban`, { userId, reason });
export const reqMoimUnbanUser = async (moimId, userId) => api.delete(`/api/moim/${moimId}/ban?userId=${userId}`);
export const reqFindMoimBanStatus = async (moimId, userId) =>
    api.get(`/api/moim/${moimId}/ban/status?userId=${userId}`);
