import api from "./axios";

export const reqfindAllMoim = async ({page, size, categoryId, districtId, searchText}) => await api.get("/api/moims/search", {
    params: {
        page,
        size,
        categoryId: categoryId || null,
        districtId: districtId || null,
        searchText: searchText || null,
    }
})

export const reqCreateMoim = async (data) => await api.post("/api/moims/register", data)

export const reqSelectMoim = async (moimId) => await api.get(`/api/moims/${moimId}`)

export const reqModifyMoim = async (data, moimId) => await api.patch(`/api/moims/${moimId}`, data)

export const reqDeleteMoim = async (moimId) => await api.delete(`/api/moims/${moimId}`)

export const reqJoinMoim = async (moimId) => await api.post(`/api/moims/${moimId}/join`)

export const reqExitMoim = async (moimId) => await api.delete(`/api/moims/${moimId}/exit`)

export const reqMoimUserList = async (moimId) => await api.get(`/api/moims/${moimId}/users`);

export const reqMyMoimList = async (userId) => await api.get(`/api/moims/users/${userId}/moims`);

export const reqCheckUserIsOwner = async () => {
    try {
        const response = await api.get("/api/moims/ownership");
        return response;
    } catch (error) {
        console.error("방장 모임 확인 실패:", error);
        throw error;
    }
}

export const reqTransferOwnership = (moimId, targetUserId) => api.post(`/api/moims/${moimId}/transfer-ownership`, { targetUserId });

export const reqMoimUserBan = async (moimId, userId) => await api.post(`/api/moims/${moimId}/ban/${userId}`);

export const reqMoimBanUserList = async (moimId) => await api.get(`/api/moims/${moimId}/ban`)

export const reqMoimUnbanUser = async (moimId, userId) => api.delete(`/api/moims/${moimId}/ban?userId=${userId}`);