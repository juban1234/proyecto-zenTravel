import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',  // 🔹 Asegura rutas relativas en Netlify
  build: {
    outDir: 'dist'  // 🔹 Asegura que Netlify publique la carpeta correcta
  }
})
