import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    reqMoimBanUser,
    reqMoimUnbanUser,
    reqFindMoimBanStatus,
    reqMoimBanList,
} from "../api/moimBanApi";

export const useGetMoimBannedUsersQuery = (moimId) =>
    useQuery({
        queryKey: ["moimBannedUsers", moimId],
        queryFn: () => reqMoimBanList(moimId),
        select: (res) => res?.data ?? [],
        enabled: !!moimId,
        staleTime: 1000 * 60 * 5,
    });

export const useFindMoimBanStatusQuery = (moimId, userId) =>
    useQuery({
        queryKey: ["moimBanStatus", moimId, userId],
        queryFn: () => reqFindMoimBanStatus(moimId, userId),
        select: (res) => res?.data,
        enabled: !!moimId && !!userId,
    });

export const useMoimBanUserMutation = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ moimId, userId, reason }) => reqMoimBanUser(moimId, userId, reason),
        onSuccess: (_, { moimId }) => {
            qc.invalidateQueries({ queryKey: ["moimBannedUsers", moimId] });
            qc.invalidateQueries({ queryKey: ["moimBanStatus"] });
            qc.invalidateQueries({ queryKey: ["moimMembers"] });
        },
    });
};

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