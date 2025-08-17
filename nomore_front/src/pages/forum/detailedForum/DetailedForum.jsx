import React from 'react';
import { useSearchParams } from 'react-router-dom';

function DetailedForum(props) {
    const [ searchParam ] = useSearchParams();
    const forumId = searchParam.get("forumId");
    console.log(forumId)
    return (
        <div>
            
        </div>
    );
}

export default DetailedForum;