import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { reqGetForums } from '../api/forumApi';

function useForumQuery(moimId) {
    return useQuery({
        queryKey: ["forums", moimId],
        queryFn: async () => await reqGetForums(moimId),
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    })
}

export default useForumQuery;