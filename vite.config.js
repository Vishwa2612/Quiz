import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import postcss from 'postcss'
import path from "path" 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),postcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
