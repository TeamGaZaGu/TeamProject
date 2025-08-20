import { useQuery } from "@tanstack/react-query";
import { reqfindAllMoim } from "../api/moimApi";

function useMoimQuery({page, size, categoryId, districtId, searchText}) {
    return useQuery({
        queryKey: ["moimpage", page, size, categoryId, districtId, searchText],
        queryFn: async () => await reqfindAllMoim({page, size, categoryId, districtId, searchText}),
    });
}

export default useMoimQuery;