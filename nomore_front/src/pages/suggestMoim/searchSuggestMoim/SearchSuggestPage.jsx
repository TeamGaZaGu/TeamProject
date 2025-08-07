import React from 'react';
import { useNavigate } from 'react-router-dom';

function SearchSuggestPage(props) {
    const navigate = useNavigate()

    const handleCreateMoimOnClick = () => {
        navigate("/suggest/create")
    }

    return (
        <div>
            <button onClick={handleCreateMoimOnClick}>모임 만들기</button>
        </div>
    );
}

export default SearchSuggestPage;