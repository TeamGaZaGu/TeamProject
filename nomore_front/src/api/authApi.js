import api from "./axios";

export const reqPrincipal = async () => await api.get("/api/account/principal");

export const reqFindUser = async () => await api.get("/api/auth/findUser");