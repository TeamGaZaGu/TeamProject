import api from './axios';

export const reqAllUser = async () => api.get('/api/user/admin');

export const reqBlockUser = async (userId) => api.put(`/api/user/siteBlockUser?userId=${userId}`);

export const reqUnBlockUser = async (userId) => api.put(`/api/user/siteUnBlockUser?userId=${userId}`);

export const deleteUser = async (userId) => api.delete(`/api/user/${userId}`);

export const reqUserDetail = async (userId) => {
    return await api.get(`/api/user/admin/user/${userId}`);
};

export const reqUserMoims = async (userId) => {
    return await api.get(`/api/user/admin/user/${userId}/moims`);
};

export const reqUserPosts = async (userId) => {
    return await api.get(`/api/user/admin/user/${userId}/posts`);
};