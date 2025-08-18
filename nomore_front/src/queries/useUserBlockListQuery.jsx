import { useQuery } from "@tanstack/react-query";
import { reqUserBlockList } from "../api/userBlockApi";


function useUserBlockListQuery({userId}) {
    return useQuery({
        queryKey: ["userBlockList", userId],
        queryFn: async () => await reqUserBlockList({userId}),
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60,
    });
}

export default useUserBlockListQuery;