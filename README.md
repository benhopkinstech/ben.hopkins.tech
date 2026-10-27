# ben.hopkins.tech

Personal site for Ben Hopkins: a short intro and links to everywhere else I am online.
Built with [Astro](https://astro.build), TypeScript and Tailwind CSS v4, and output as a static site.

## Getting started

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # type-checks, then outputs the static site to ./dist
npm run preview  # serve the production build locally
```

Requires Node 22.23.4 or newer (Astro 7).

## Editing content

Everything lives in `src/data/profile.ts`: name, handle, role, company, intro and links. The home
page, 404 page, meta tags, search-engine data and the social preview image all read from it.

To add a link, add an entry to `socials` with a `label`, `href`, `handle` and optional `description`.
Its icon is looked up by `label` in the `icons` map in `src/components/SocialLinks.astro`, so add an
SVG path there under the same label. `mailto:` links open the mail app instead of a new tab.

## Structure

```
src/
  assets/       profile.png (optimised to WebP at build time)
  components/   Header, SocialLinks
  data/         profile.ts (all site content), theme.ts (colours for meta tags and preview image)
  layouts/      Layout.astro (head, meta tags, fonts)
  pages/        index.astro, 404.astro, og.png.ts (social preview image, rendered at build time)
  styles/       global.css (Tailwind and colour tokens)
public/         favicons, robots.txt
```

## Styling

Colours are defined in `src/styles/global.css`. The accent `--color-accent` drives links, icons
and highlights across the site. The same values are repeated in `src/data/theme.ts` (browser theme
colour and social preview image) and `public/favicon.svg`, so change them together.

Fonts (Inter and JetBrains Mono) are self-hosted from `@fontsource-variable` packages and bundled
into `dist/_astro/` at build time.


## Deploying

Any static host works. Use build command `npm run build` and output directory `dist`.

This site is hosted on Cloudflare Pages, which builds from this GitHub repo using those settings.
Only pushes to `main` are deployed, and they go straight to production.

Two files configure Cloudflare:

- `public/_headers` caches the hashed files in `/_astro/` for a year and adds a few security headers.
- `.node-version` sets the Node version Cloudflare builds with.
