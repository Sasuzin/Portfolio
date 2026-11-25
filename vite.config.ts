import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base relativa: funciona tanto em sasuzin.github.io/Portfolio/ quanto na raiz de um domínio (Vercel).
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    // public/assets guarda as imagens do portfólio; os bundles ficam separados em /static.
    assetsDir: 'static',
    // o chunk do three.js (~530 kB) é carregado sob demanda, depois do primeiro render
    chunkSizeWarningLimit: 600,
  },
});
