import api from "./axios";

export const reqCreateSuggestMoim = (data) => api.post("/api/moim/register", data)

export const reqfindSuggestMoim = () => api.get("/api/moim/find/categoryIdInUserId")