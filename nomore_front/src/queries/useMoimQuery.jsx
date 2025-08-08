import { useQuery } from "@tanstack/react-query";
import { reqfindAllMoim } from "../api/moimApi";

function useMoimQuery() {
    return useQuery({
        queryKey: ["moimpage"],
        queryFn: async () => await reqfindAllMoim(),
    });
}