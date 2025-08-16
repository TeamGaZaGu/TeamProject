import { useQuery } from "@tanstack/react-query";
import { reqUserBlockList } from "../api/userBlockApi";

function useUserBlockListQuery() {
    return useQuery({
        queryKey: ["userBlockList"],
        queryFn: async () => await reqUserBlockList(),
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60,
    });
}

export default useUserBlockListQuery;