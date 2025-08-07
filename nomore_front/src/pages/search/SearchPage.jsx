import React from 'react';
import useSearchQuery from '../../queries/useSearchQuery';

function SearchPage(props) {
    const searchQuery = useSearchQuery();
    const searchMoim = searchQuery.data?.data || []
    console.log(searchMoim)

    return (
        <div>
            
        </div>
    );
}

export default SearchPage;