import { useQueryClient } from "@tanstack/react-query";

export const useBlockUserMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: reqUserBlock,
        onSuccess: () => {
            queryClient.invalidateQueries(["blockedUsers"]);
            queryClient.invalidateQueries(["blockStatus"]);
            queryClient.invalidateQueries(["moimMembers"]);
        },
        onError: (error) => {
            console.error("차단 실패:", error);
            alert("차단에 실패했습니다.");
        }
    });
};

export const useUnblockUserMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: reqUserUnBlock,
        onSuccess: () => {
            queryClient.invalidateQueries(["blockedUsers"]);
            queryClient.invalidateQueries(["blockStatus"]);
            queryClient.invalidateQueries(["moimMembers"]);
        },
        onError: (error) => {
            console.error("차단 해제 실패:", error);
            alert("차단 해제에 실패했습니다.");
        }
    });
};
