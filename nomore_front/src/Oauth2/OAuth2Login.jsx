import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function OAuth2Login(props) {
    const [ searchParams ] = useSearchParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useEffect(() => {
        const accessToken = searchParams.get("accessToken");
        if (!!accessToken) {
            localStorage.setItem("AccessToken", `Bearer ${accessToken}`)
            queryClient.invalidateQueries({
                queryKey: ["principal"]
            }).then(() => {
                navigate("/")
            })
        } else {
            navigate("/auth/signup")
        }
    }, [])
    return (
        <div>
            
        </div>
    );
}

export default OAuth2Login;