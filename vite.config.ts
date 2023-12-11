import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

const { resolve } = path;
// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '@styles': resolve(__dirname, './src/styles'),
            '@components': resolve(__dirname, './src/components')
        }
    },
    plugins: [react()]
});
