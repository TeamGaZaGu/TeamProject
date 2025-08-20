import { data } from "react-router-dom";
import api from "./axios";
export const reqDistrict = () => api.get("/api/search/district");

export const reqCategory = () => api.get("/api/search/category");