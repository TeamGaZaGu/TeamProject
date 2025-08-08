import api from "./axios";

export const reqfindAllMoim = () => api.get("/api/moim/find")

export const reqCreateSuggestMoim = (data) => api.post("/api/moim/register", data)

export const reqfindSuggestMoim = () => api.get("/api/moim/find/categoryIdInUserId")

export const reqSelecMoim = () => api.get("/")