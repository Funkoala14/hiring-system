/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
        container: {
            center: true,
            padding: '2rem',
            screens: {
                sm: '100%',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1440px',
            },
        },
        daisyui: {
            themes: ['cupcake'],
        },
    },
    plugins: [daisyui],
};
