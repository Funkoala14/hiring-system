import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@layouts': path.resolve(__dirname, 'src/layouts'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@services': path.resolve(__dirname, 'src/services'),
            '@store': path.resolve(__dirname, 'src/store'),
            '@utils': path.resolve(__dirname, 'src/utils'),
        },
    },
    server: {
        port: 3000,
        proxy: {
            '/v1/api': 'http://localhost:5000', // backend
        },
    },
});
