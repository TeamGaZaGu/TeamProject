import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';

function NotFound(props) {
    const navigate = useNavigate();

    useEffect(() => {
        toast.error("잘못된 경로입니다.");
        setTimeout(() => {
            navigate("/");
        }, 1200)
    }, [])

    return (
        <div>
            <Toaster />
        </div>
    );
}

export default NotFound;