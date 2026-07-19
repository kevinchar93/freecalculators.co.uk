import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { local } from 'laravel-vite-plugin/fonts';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
            fonts: [
                local('DM Sans', {
                    alias: 'sans',
                    variable: '--font-sans',
                    optimizedFallbacks: false,
                    variants: [
                        {
                            src: 'resources/css/fonts/DMSans-VariableFont_opsz,wght.woff2',
                            weight: '100 1000',
                            style: 'normal',
                        },
                        {
                            src: 'resources/css/fonts/DMSans-Italic-VariableFont_opsz,wght.woff2',
                            weight: '100 1000',
                            style: 'italic',
                        },
                    ],
                }),
                local('Inter', {
                    alias: 'logo',
                    variable: '--font-logo',
                    optimizedFallbacks: false,
                    variants: [
                        {
                            src: 'resources/css/fonts/Inter-VariableFont_opsz,wght.woff2',
                            weight: '100 900',
                            style: 'normal',
                        },
                        {
                            src: 'resources/css/fonts/Inter-Italic-VariableFont_opsz,wght.woff2',
                            weight: '100 900',
                            style: 'italic',
                        },
                    ],
                }),
            ],
        }),
        inertia(),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],
});
