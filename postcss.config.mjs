// Tailwind v4 runs as a PostCSS plugin here. The homepage is built from the
// Figma Make editorial layout, which is written in Tailwind utilities; the rest
// of the site is CSS Modules and keeps its own reset, which is why globals.css
// imports Tailwind's theme and utilities layers but not its preflight.
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
