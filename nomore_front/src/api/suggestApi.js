import api from "./axios";

export const reqCreateSuggestMoim = (data) => api.post("/api/moim/register", data)