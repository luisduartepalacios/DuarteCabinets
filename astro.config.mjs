import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Production domain (used for sitemap + canonical URLs). www is primary;
  // the bare apex redirects to www at the DNS level.
  site: 'https://www.duartecabinets.com',
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
