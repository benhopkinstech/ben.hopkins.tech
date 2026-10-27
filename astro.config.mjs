// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ben.hopkins.tech',
  build: {
    // Put the CSS straight into the HTML so the page renders from one request.
    inlineStylesheets: 'always',
  },
  env: {
    schema: {
      // Cloudflare Web Analytics site token. Leave unset to build without analytics.
      CF_ANALYTICS_TOKEN: envField.string({ context: 'client', access: 'public', optional: true }),
    },
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
