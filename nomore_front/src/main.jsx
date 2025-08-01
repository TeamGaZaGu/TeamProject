import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { global } from './styles/global';
import { Global } from "@emotion/react";
import { createRoot } from "react-dom/client";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 0,
    }
  }
});

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <>
        <Global styles={global} />
        <App />
      </>
    </BrowserRouter>
  </QueryClientProvider>
)