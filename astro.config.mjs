// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ben.hopkins.tech',
  build: {
    // Put the CSS straight into the HTML so the page renders from one request.
    inlineStylesheets: 'always',
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
