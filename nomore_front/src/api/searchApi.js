import { data } from "react-router-dom";
import api from "./axios";
export const reqDistrict = () => api.get("/api/search/district");

export const reqCategory = () => api.get("/api/search/category");

export function reqSearch({ districtId, categoryId, keyword }) {
  return api.get("/api/moim/search", {
    params: {
      districtId: districtId || null,
      categoryId: categoryId || null,
      keyword: keyword || null,
    }
  });
}