import type { APIRoute } from 'astro';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import satori from 'satori';
import sharp from 'sharp';
import { profile } from '../data/profile';
import { colours } from '../data/theme';

/**
 * The social preview image (1200×630) shown when the site is shared on LinkedIn, Slack, X, etc.
 * Rendered once at build time from profile.ts, so it never goes out of date.
 */

const WIDTH = 1200;
const HEIGHT = 630;

const require = createRequire(import.meta.url);
const font = (file: string) => readFile(require.resolve(`@fontsource/${file}`));

// Minimal element helper, so this file needs no JSX setup.
type Node = { type: string; props: Record<string, unknown> };
const el = (type: string, style: Record<string, unknown>, children?: unknown, props = {}): Node => ({
  type,
  props: { style, children, ...props },
});

export const GET: APIRoute = async ({ site }) => {
  const [inter400, inter700, mono500, portrait] = await Promise.all([
    font('inter/files/inter-latin-400-normal.woff'),
    font('inter/files/inter-latin-700-normal.woff'),
    font('jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff'),
    sharp('src/assets/profile.png').resize(720, 720).png().toBuffer(),
  ]);

  const tree = el(
    'div',
    { width: WIDTH, height: HEIGHT, display: 'flex', flexDirection: 'column', background: colours.paper, fontFamily: 'Inter', color: colours.ink },
    [
      el('div', { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 90px' }, [
        el('div', { flex: 1, display: 'flex', flexDirection: 'column', paddingRight: 40 }, [
          el('div', { fontFamily: 'JetBrains Mono', fontSize: 30, color: colours.accent }, 'hello, world'),
          el('div', { marginTop: 20, fontSize: 96, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }, profile.name),
          el('div', { marginTop: 30, fontSize: 40, lineHeight: 1.25 }, profile.role),
          el('div', { fontSize: 40, lineHeight: 1.25, color: colours.muted }, `at ${profile.company}`),
          el('div', { marginTop: 52, display: 'flex', fontFamily: 'JetBrains Mono', fontSize: 28, color: colours.muted }, [
            el('span', { color: colours.accent }, '~/'),
            el('span', {}, site?.host ?? ''),
          ]),
        ]),
        el('img', { flexShrink: 0, width: 340, height: 340, borderRadius: 9999, border: `6px solid ${colours.ring}` }, undefined, {
          src: `data:image/png;base64,${portrait.toString('base64')}`,
          width: 340,
          height: 340,
        }),
      ]),
      el('div', { height: 16, background: colours.accent }),
    ],
  );

  const svg = await satori(tree as Parameters<typeof satori>[0], {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      { name: 'Inter', data: inter400, weight: 400, style: 'normal' },
      { name: 'Inter', data: inter700, weight: 700, style: 'normal' },
      { name: 'JetBrains Mono', data: mono500, weight: 500, style: 'normal' },
    ],
  });

  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();

  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
