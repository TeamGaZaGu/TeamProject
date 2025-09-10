import { data } from "react-router-dom";
import api from "./axios";
export const reqDistrict = () => api.get("/api/districts");

export const reqCategory = () => api.get("/api/categories");