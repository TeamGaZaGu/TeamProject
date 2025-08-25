import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { reqfindAllMoim } from "../api/moimApi";

function useMoimQuery({size, categoryId, districtId, searchText}) {
    return useInfiniteQuery({
        queryKey: ["moimpage", size, categoryId, districtId, searchText],
        queryFn: async ({ pageParam = 1 }) => await reqfindAllMoim({page: pageParam, size, categoryId, districtId, searchText}),
        getNextPageParam: (lastPage, allPages) => {
            const currentPage = lastPage.data.body.page;
            const totalPages = lastPage.data.body.totalPages + 1;
            return currentPage + 1 < totalPages ? currentPage + 1 : undefined;
        },
    });
}

export default useMoimQuery;