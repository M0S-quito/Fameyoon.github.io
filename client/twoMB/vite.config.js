import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // 루트 도메인이므로 슬래시만
  plugins: [react()],
  server: { // fameyoon-incoo.run.goorm.io에서의 접속도 허용
    allowedHosts: ['fameyoon-incoo.run.goorm.io']
  }
})
