import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Update to the production domain once it's live (used for sitemap + canonical URLs).
  site: 'https://duartecabinets.com',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  image: {
    // Allow remote optimization from Cloudinary when/if assets are migrated there.
    domains: ['res.cloudinary.com'],
  },
  compressHTML: true,
});
