import api from './axios';

export const reqAllUser = async () => api.get('/api/users/admin');

export const deleteUser = async (userId) => api.delete(`/api/users/${userId}`);

export const reqBlockUser = async (userId) => api.put(`/api/users/banUser?userId=${userId}`);

export const reqUnBlockUser = async (userId) => api.put(`/api/users/liftBanUser?userId=${userId}`);

export const reqUserMoims = async (userId) => {
    return await api.get(`/api/users/admin/user/${userId}/moims`);
};

export const reqUserPosts = async (userId) => {
    return await api.get(`/api/users/admin/user/${userId}/posts`);
};

export const reqModifyUserBlob = async ({url, imageConfigsName}) => await api.get(`/api/users/blob`, {
    params: {url, imageConfigsName},
    responseType: 'blob',
  });