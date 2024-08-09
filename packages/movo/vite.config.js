import { resolve } from 'path';
import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.js'),
            name: 'movo',
            fileName: 'movo',
            formats: ['es', 'umd', 'iife']
        },
        rollupOptions: {
            output: {
                assetFileNames: "movo.[ext]",
            },
        },
        css: {
            postcss: {
                plugins: [
                    autoprefixer({})
                ],
            }
        }
    },
});
