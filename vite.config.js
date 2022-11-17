import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import prismjs from 'vite-plugin-prismjs';

const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

export default defineConfig({
    build: {
        outDir: 'docs'
    },
    plugins: [
        vue(),
        prismjs({
            languages: ['json', 'jsx', 'js', 'css', 'less', 'sass', 'scss', 'ts', 'tsx', 'sql', 'java', 'html', 'nginx', 'ejs', 'shell', 'yaml'],
        }),
    ],
    resolve: {
        alias: {
            '@': resolve('src'),
            'cmps': resolve('src/components'),
        },
    },
    optimizeDeps: {
        include: ['@kangc/v-md-editor/lib/theme/vuepress.js'],
    },
    server: {
        port: 3303
    }
});
