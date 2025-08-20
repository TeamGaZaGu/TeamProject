import api from "./axios"

export const reqGetMessages = async (moimId,  offset = 0, limit = 50) => {
    return await api.get(`/api/chat/${moimId}/messages?&offset=${offset}&limit=${limit}`);
};