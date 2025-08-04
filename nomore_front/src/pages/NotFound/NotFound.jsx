import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function NotFound(props) {

    useEffect(() => {
        alert("잘못된 경로입니다.")
    }, [])

    return (
        <div>
            <Navigate to="/" replace />
        </div>
    );
}

export default NotFound;