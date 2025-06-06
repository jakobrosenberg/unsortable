import { svelte } from '@sveltejs/vite-plugin-svelte'
import routify from '@roxi/routify/vite-plugin'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

const production = process.env.NODE_ENV === 'production'

export default defineConfig({
    clearScreen: false,
    resolve: { alias: { '@': resolve('src') } },
    plugins: [
        routify({
            render: {
                ssg: !!production,
                ssr: !!production,
            },
        }),
        svelte({
            compilerOptions: {
                dev: !production,
            },
        }),
            tailwindcss(),
    ],

    server: { port: 1337 },
})
