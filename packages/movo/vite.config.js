import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: [
                resolve(__dirname, 'src/index.js'),
                resolve(__dirname, 'src/styles/index.scss')
            ],
            name: 'movo',
            fileName: 'movo',
        },
        rollupOptions: {
            output: {
                assetFileNames: "movo.[ext]",
            },
        },
    },
});
