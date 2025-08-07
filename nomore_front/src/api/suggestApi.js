import api from "./axios";

export const reqCreateSuggestMoim = (data) => api.post("/api/moim/register", data, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
})