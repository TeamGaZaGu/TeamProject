import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  let baseURL = "http://localhost:8080";
  
  if (mode === "kyuchul") {
    baseURL = "https://imtheking.store";
  } else if (mode === "jaewon") {
    baseURL = "https://meetyou.store";
  } else if (mode === "jinhyuk") {
    baseURL = "https://meetuu.store";
  } else if (mode === "deaung") {
    baseURL = "https://deaung.store";
  } else {
    baseURL = "http://localhost:8080";
  }

  return {
    plugins: [react()],
     define: {
      __API_HOST__:JSON.stringify(baseURL),
      global: 'window',  // global이 브라우저에서 window로 인식되도록 설정
    },
  }
})
