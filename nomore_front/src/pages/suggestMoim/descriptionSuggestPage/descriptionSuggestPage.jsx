import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { reqJoinMoim } from '../../../api/moimApi';

function DescriptionSuggestPage(props) {
    const [ searchParam ] = useSearchParams();
    const moimId = searchParam.get("moimId")

    const handleJoinMoimOnClick = () => {
        reqJoinMoim(moimId)
    }

    return (
        <div>
            <button onClick={handleJoinMoimOnClick}>모임 가입하기</button>    
        </div>
    );
}

export default DescriptionSuggestPage;