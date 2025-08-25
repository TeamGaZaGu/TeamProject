import api from "./axios";

export const reqfindAllMoim = async ({page, size, categoryId, districtId, searchText}) => await api.get("/api/moim/find", {
    params: {
        page,
        size,
        categoryId: categoryId || null,
        districtId: districtId || null,
        searchText: searchText || null,
    }
})

export const reqCreateSuggestMoim = async (data) => await api.post("/api/moim/register", data)

export const reqfindSuggestMoim = async () => await api.get("/api/moim/find/categoryIdInUserId")

export const reqSelectMoim = async (moimId) => await api.get(`/api/moim/${moimId}/select`)

export const reqJoinMoim = async (moimId) => await api.post(`/api/moim/${moimId}/join`)

export const reqExitMoim = async (moimId) => await api.delete(`/api/moim/${moimId}/exit`)

export const reqModifyMoim = async (data, moimId) => await api.patch(`/api/moim/${moimId}/modify`, data)

export const reqDeleteMoim = async (moimId) => await api.delete(`/api/moim/${moimId}/delete`)

export const reqMoimUserList = async (moimId) => await api.get(`/api/moim/userList?moimId=${moimId}`);

export const reqMoimUserBan = async (moimId, userId) => await api.post(`/api/moim/${moimId}/ban/${userId}`);

export const reqMoimBanUserList = async (moimId) => await api.get(`/api/moim/${moimId}/ban`)

export const reqMyMoimList = async (userId) => await api.get(`/api/moim/${userId}/moims`);