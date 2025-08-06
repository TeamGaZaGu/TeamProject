/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ClimbingBoxLoader } from "react-spinners";

const layout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #22222288;
`;

function Loading() {
    
    return (
        <div css={layout}>
            <ClimbingBoxLoader color="#ffffff" />
        </div>
    );
}

export default Loading;