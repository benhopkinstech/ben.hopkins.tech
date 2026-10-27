/**
 * Site colours for code that can't read CSS variables: the browser theme colour
 * and the social preview image.
 *
 * CSS and SVG files can't import this, so these values are repeated in
 * src/styles/global.css (@theme) and public/favicon.svg. Change them together.
 */
export const colours = {
  accent: '#9b1427',
  paper: '#faf8f6',
  ink: '#1c1917',
  /** Tailwind stone-600 */
  muted: '#57534e',
  /** Tailwind stone-300 */
  ring: '#d6d3d1',
};
