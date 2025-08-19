import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   define: {
    global: 'window',  // global이 브라우저에서 window로 인식되도록 설정
  },
})
