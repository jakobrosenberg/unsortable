import { svelte } from '@sveltejs/vite-plugin-svelte'
import routify from '@roxi/routify/vite-plugin'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'
import { mdsvex } from 'mdsvex'

const production = process.env.NODE_ENV === 'production'

export default defineConfig({
  base: '/unsortable', // e.g. /my-project/
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
      extensions: ['.svelte', '.md'],
      preprocess: [mdsvex({ extension: 'md' })],
      compilerOptions: {
        dev: !production,
      },
    }),
    
    tailwindcss(),
  ],
  css: {
    // tailwind build fix
  },
  server: { port: 1337 },
})
