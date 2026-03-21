import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode, isSsrBuild}) => {
  const env = loadEnv(mode, '.', '');
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const baseFromEnv = env.VITE_BASE?.trim()
  const base =
    baseFromEnv && baseFromEnv.length > 0
      ? baseFromEnv.endsWith('/')
        ? baseFromEnv
        : `${baseFromEnv}/`
      : mode === 'pages'
        ? '/delhuerto/'
        : '/'
  return {
    base,
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: isSsrBuild
      ? {
          outDir: 'dist/server',
          ssr: 'src/entry-server.tsx',
        }
      : {
          outDir: 'dist',
        },
  };
});
