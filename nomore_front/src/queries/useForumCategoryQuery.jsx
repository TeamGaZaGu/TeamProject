import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { reqGetForumCategories } from '../api/forumApi';

function useForumCategoryQuery(props) {
    return useQuery({
        queryKey: ["forumCategories"],
        queryFn: async () => await reqGetForumCategories(),
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60,
    })
}

export default useForumCategoryQuery;