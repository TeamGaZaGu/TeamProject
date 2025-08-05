import React from 'react';
import { useNavigate } from 'react-router-dom';

function MypageButton(props) {
    
    const navigate = useNavigate();

    const handleMypageOnClick = () => {
        navigate("/mypage")
    }

    return (
        <div>
            <button onClick={handleMypageOnClick}>마이페이지</button>
        </div>
    );
}

export default MypageButton;