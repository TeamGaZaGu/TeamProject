import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

function Signup() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useEffect(() => {
        const accessToken = searchParams.get("accessToken");
        if (accessToken) {
            localStorage.setItem("AccessToken", `Bearer ${accessToken}`);
            queryClient.invalidateQueries({ queryKey: ["principal"] })
                .then(() => {
                    navigate("/");
                });
        }
    }, []);

    return (
        <div>회원가입 or 처리중...</div>
    )
}

export default Signup;
