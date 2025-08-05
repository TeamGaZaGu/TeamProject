import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Oauth2Redirect() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = searchParams.get("accessToken");
        console.log("accessToken url?", accessToken);
        if (accessToken) {
            localStorage.setItem("AccessToken", `Bearer ${accessToken}`);
            console.log("저장");
            navigate("/auth/signup");
        } else {
            navigate("/");
        }
    }, []);

    return (
        <div>처리중...</div>
    );
}

export default Oauth2Redirect;
