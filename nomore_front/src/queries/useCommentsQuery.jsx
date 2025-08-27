import { useInfiniteQuery} from '@tanstack/react-query';
import React from 'react';
import { reqGetComment, reqGetForums } from '../api/forumApi';

function useCommentsQuery({size, forumId}) {
    return useInfiniteQuery({
        queryKey: ["forums", size, forumId],
        queryFn: async ({pageParam = 1}) => await reqGetComment({page: pageParam, size, forumId}),
        getNextPageParam: (lastPage, allPages) => {
            console.log(lastPage)
            const currentPage = lastPage.data.body.page;
            const totalPages = lastPage.data.body.totalPages + 1;
            return currentPage + 1 < totalPages ? currentPage + 1 : undefined;
        },
    })
}

export default useCommentsQuery;