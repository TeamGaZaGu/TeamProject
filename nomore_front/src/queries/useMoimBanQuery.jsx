import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { reqMoimUnbanUser } from "../api/moimBanApi";

export const useMoimUnbanUserMutation = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ moimId, userId }) => reqMoimUnbanUser(moimId, userId),
        onSuccess: (_, { moimId }) => {
            qc.invalidateQueries({ queryKey: ["moimBannedUsers", moimId] });
            qc.invalidateQueries({ queryKey: ["moimBanStatus"] });
            qc.invalidateQueries({ queryKey: ["moimMembers"] });
        },
    });
};