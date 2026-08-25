import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// לאחר בחירת דומיין, יש להגדיר אותו כאן בלבד ולבנות מחדש.
// כל כתובות ה-canonical, Open Graph, JSON-LD וה-sitemap נגזרות מ-Astro.site.
const site = undefined;

export default defineConfig({
  site,
  integrations: site ? [sitemap()] : [],
  vite: {
    plugins: [tailwindcss()]
  }
});
