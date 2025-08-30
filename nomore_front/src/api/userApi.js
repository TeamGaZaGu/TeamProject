import api from './axios';

export const reqAllUser = async () => api.get('/api/user/admin');

export const reqBlockUser = async (userId) => api.put(`/api/user/banUser?userId=${userId}`);

export const reqUnBlockUser = async (userId) => api.put(`/api/user/liftBanUser?userId=${userId}`);

export const deleteUser = async (userId) => api.delete(`/api/user/${userId}`);

export const reqUserMoims = async (userId) => {
    return await api.get(`/api/user/admin/user/${userId}/moims`);
};

export const reqUserPosts = async (userId) => {
    return await api.get(`/api/user/admin/user/${userId}/posts`);
};

export const reqModifyUserBlob = async ({url, imageConfigsName}) => await api.get(`/api/user/blob`, {
    params: {url, imageConfigsName},
    responseType: 'blob',
  });