import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { reqUserBlock, reqUserUnBlock, reqCheckBlockStatus, reqUserBlockList } from '../api/userBlockApi';

export const useGetBlockedUsersQuery = () =>
    useQuery({
        queryKey: ['blockedUsers'],
        queryFn: reqUserBlockList,
        select: (res) => res?.data ?? [],
        staleTime: 1000 * 60 * 5,
    });

export const useCheckBlockStatusQuery = (targetUserId) =>
    useQuery({
        queryKey: ['blockStatus', targetUserId],
        queryFn: () => reqCheckBlockStatus(targetUserId),
        select: (res) => res?.data,
        enabled: !!targetUserId,
    });

export const useBlockUserMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: reqUserBlock,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blockedUsers'] });
            queryClient.invalidateQueries({ queryKey: ['blockStatus'] });
            queryClient.invalidateQueries({ queryKey: ['moimMembers'] });
        },
    });
};

export const useUnblockUserMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: reqUserUnBlock,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blockedUsers'] });
            queryClient.invalidateQueries({ queryKey: ['blockStatus'] });
            queryClient.invalidateQueries({ queryKey: ['moimMembers'] });
        },
    });
};
