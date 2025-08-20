import api from "./axios";

export const reqfindAllMoim = async ({page, size, categoryId, districtId, searchText} = {}) => {
    const defaultPage = page || 1;
    const defaultSize = size || 20;
    
    const hasValidCategory = categoryId && categoryId !== "" && categoryId !== 1;
    const hasValidDistrict = districtId && districtId !== "";
    const hasValidSearch = searchText && searchText.trim() !== "";
    
    if (hasValidCategory || hasValidDistrict || hasValidSearch) {
        const params = {};
        
        if (hasValidCategory) {
            params.categoryId = categoryId;
        }
        
        if (hasValidDistrict) {
            params.districtId = districtId;
        }
        
        if (hasValidSearch) {
            params.keyword = searchText.trim();
        }
        
        console.log("검색 API 호출 - 파라미터:", params);
        
        return await api.get("/api/moim/search", { params });
    } else {
        console.log("전체 모임 조회 API 호출");
        
        return await api.get("/api/moim/find", {
            params: {
                page: defaultPage,
                size: defaultSize
            }
        });
    }
}

export const reqCreateSuggestMoim = async (data) => await api.post("/api/moim/register", data)

export const reqfindSuggestMoim = async () => await api.get("/api/moim/find/categoryIdInUserId")

export const reqSelectMoim = async (moimId) => await api.get(`/api/moim/${moimId}/select`)

export const reqJoinMoim = async (moimId) => await api.post(`/api/moim/${moimId}/join`)

export const reqExitMoim = async (moimId) => await api.delete(`/api/moim/${moimId}/exit`)

export const reqModifyMoim = async (data, moimId) => await api.patch(`/api/moim/${moimId}/modify`, data)

export const reqDeleteMoim = async (moimId) => await api.delete(`/api/moim/${moimId}/delete`)

export const reqMoimUserList = async (moimId) => await api.get(`/api/moim/userList?moimId=${moimId}`);

export const reqMoimUserBan = async (moimId, userId) => await api.post(`/api/moim/${moimId}/ban/${userId}`);

export const reqMoimBanUserList = async (moimId) => await api.get(`/api/moim/${moimId}/ban`)