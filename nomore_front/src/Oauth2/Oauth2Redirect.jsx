import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

function Oauth2Redirect() {
     const [ searchParams ] = useSearchParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useEffect(() => {
        const accessToken= searchParams.get("accessToken");
        if (!!accessToken) {
            localStorage.setItem("AccessToken", `Bearer ${accessToken}`);
            queryClient.invalidateQueries({
                queryKey: ["principal"],
            }).then(() => {
                navigate("/");
            })
        } else {
            navigate("/");
        }
    }, []);


    return (
        <></>
    )
}

export default Oauth2Redirect;
