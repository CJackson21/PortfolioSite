import { defineConfig } from 'vite';
import { resolve } from 'path';
export default defineConfig({
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                fetch: resolve(__dirname, 'about.html'),
                key: resolve(__dirname, 'CalebJackson_SoftwareEngineer.pdf'),

            }
        }
    },
});