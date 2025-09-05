import { css } from "@emotion/react";

/* 2. RootLayout 반응형 개선 */
export const layout = css`
    margin: 0 auto;
    width: 100%;
    max-width: 82rem; 
    height: 100vh;
    background-color: #ffffff;
    padding: 0 1rem;  
    
    @media (max-width: 768px) {
      padding: 0;
    }
`;