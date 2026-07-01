# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Landing page for Hip Hop Defensive Driving ([hiphopdriving.com](https://hiphopdriving.com)), built with Astro. Content (landing page copy, FAQs, slides, features, blog posts, terms, support page) is authored in a headless Strapi CMS and fetched at build time — this repo contains no content, only presentation.

## Commands

- `npm run dev` / `npm start` — start the Astro dev server
- `npm run build` — build for production (runs type-checking as part of `astro build`)
- `npm run preview` — preview the production build
- `npx prettier --write .` — format (prettier + prettier-plugin-astro + prettier-plugin-tailwindcss configured in `.prettierrc.js`)

There is no test suite and no lint script configured.

## Environment

Requires `STRAPI_URL` and `STRAPI_TOKEN` in `.env` to fetch content from Strapi at build/dev time. Without valid values, pages that call `fetchStrapi` will fail.

## Architecture

- **Content fetching**: `src/strapi.ts` exports `fetchStrapi<T>()`, a thin wrapper around the Strapi REST API (`${STRAPI_URL}/api/${endpoint}`, bearer-token auth). It also defines TypeScript interfaces for every Strapi content type (`LandingPage`, `BlogPost`, `Faq`, `Slide`, `Feature`, etc.), which mirror the Strapi schema — update these interfaces if the CMS schema changes. Because `tsconfig.json` sets `baseUrl: src`, pages import this as `from "strapi"` (bare specifier), not a relative path.
- **Pages fetch their own data**: each route in `src/pages/*.astro` calls `fetchStrapi` directly in its frontmatter (e.g. `index.astro` fetches the `hip-hop-landing-page` endpoint with nested `populate[...]` query params for relations like slides/images). There's no shared data-loading layer — new pages follow this same fetch-in-frontmatter pattern.
- **Layout**: `src/layouts/Layout.astro` wraps every page with `Navbar`/`Footer` and SEO tags (via `astro-seo`), and takes a `title` prop that's appended to the site name.
- **Components**: `src/components/*.astro` are page sections (`hero`, `features`, `slider`, `faq`, `pricing`, etc.), each typically typed to accept the corresponding Strapi interface as props. `src/components/ui/` holds generic primitives (`button.astro`, `link.astro`, icons).
- **Styling**: Tailwind v4 via the Vite plugin (`@tailwindcss/vite`, configured in `astro.config.mjs`), with `src/tailwind.css` as the entry stylesheet and `src/utils.ts`'s `cn()` (clsx + tailwind-merge) for conditional class composition.
- **Path aliases** (see `tsconfig.json`): `@components/*`, `@layouts/*`, `@assets/*`, `@pages/*`, `@lib/*`, `@utils/*` all resolve under `src/`.
- **Site config**: `astro.config.mjs` sets the canonical `site` URL and registers integrations (`@astrojs/mdx`, `@astrojs/sitemap`, `astro-icon` restricted to the `ph` (Phosphor) icon set). `src/config.ts` holds external URLs (sign-up/sign-in links to the Plum Learning course platform).
