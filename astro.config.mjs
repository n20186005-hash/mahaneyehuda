import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// הדומיין הרשמי מוגדר כאן בלבד; יש לבנות מחדש לאחר שינוי.
// כל כתובות ה-canonical, Open Graph, JSON-LD, ה-sitemap וה-PWA נגזרות מ-Astro.site.
const site = 'https://mahaneyehuda.org';

export default defineConfig({
  site,
  integrations: site ? [sitemap()] : [],
  vite: {
    plugins: [tailwindcss()]
  }
});
