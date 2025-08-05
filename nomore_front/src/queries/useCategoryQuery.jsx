import { useQuery } from "@tanstack/react-query";
import { reqCategory } from "../api/searchApi";

function useCategoryQuery() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: async () => await reqCategory(),
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60,
    });
}

export default useCategoryQuery;