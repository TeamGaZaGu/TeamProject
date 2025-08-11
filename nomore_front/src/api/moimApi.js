import api from "./axios";

export const reqfindAllMoim = async () => await pi.get("/api/moim/find")

export const reqCreateSuggestMoim = async (data) => await api.post("/api/moim/register", data)

export const reqfindSuggestMoim = async () => await api.get("/api/moim/find/categoryIdInUserId")

export const reqSelectMoim = async (moimId) => await api.get(`/api/moim/${moimId}/select`)

export const reqJoinMoim = async (moimId) => await api.post(`/api/moim/${moimId}/join`)