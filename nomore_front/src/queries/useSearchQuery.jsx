import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { reqSearch } from '../api/searchApi';

function useSearchQuery(props) {
    return useQuery({
        queryKey: ["searchpage"],
        queryFn: async () => await reqSearch(),
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60,
    });
}

export default useSearchQuery;