// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';
import keystatic from '@keystatic/astro';

/**
 * Keystatic GitHub mode: browser editor uses GitHub authentication.
 * Configure the Keystatic GitHub App and KEYSTATIC_* secrets in Netlify.
 * Do not expose a local-mode editor publicly.
 */
export default defineConfig({
  // TODO: replace with the real production origin before launch.
  // Required by @astrojs/sitemap and for absolute canonical URLs.
  site: 'https://example.com',
  output: 'static',
  // URLs are trailing-slash (build.format 'directory'; Netlify redirects /x to /x/).
  // Not 'always': Keystatic's admin calls its API without trailing slashes.
  trailingSlash: 'ignore',
  // devFeatures off: the site uses no Netlify image CDN, env vars, or edge
  // functions, and the edge emulator needs Deno, which crashes `astro dev` without it.
  adapter: netlify({ devFeatures: false }),
  // No sessions: the site has no logged-in state. (The Netlify adapter would
  // otherwise enable them, backed by Netlify Blobs.)
  session: false,
  integrations: [
    // Never add a `client:*` directive to a public page or component.
    react(),
    keystatic(),
    sitemap({ filter: (page) => !page.includes('/contact/thanks/') }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
