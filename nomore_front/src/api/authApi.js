import api from "./axios";

export const reqPrincipal = async () => await api.get("/api/account/principal");

export const reqFindUser = async () => await api.get("/api/auth/findUser");

export const reqSignup = async (signupData) => await api.post("/auth/signup", signupData, {
    headers: {
        Authorization: localStorage.getItem("AccessToken"),
        },
    });