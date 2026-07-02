# SCG Transport — Custom WordPress Block Theme

Custom block theme for a logistics company, built from a design project.
Full Gutenberg site editing with custom blocks using TypeScript, Interactivity API, and GSAP.

![](site.png)

## Blocks

```bash
src/blocks/
├── accordion/       # Collapsible content sections
├── carousel/        # Image carousel
├── cert/            # Certificate display with map marker
├── cert-viewer/     # PDF certificate viewer
├── contact/         # Contact section with Google Maps integration
├── data-counter/    # Animated number counter
├── details/         # Expandable details with marker
├── header/          # Sticky site header
├── job-offer/       # Job listing block
├── logo/            # SVG logo block
└── scroll-badge/    # Scroll-triggered animated badge
```

## Structure

```bash
src/
├── blocks/          # Custom Gutenberg blocks (TypeScript, iAPI, GSAP)
├── scripts/         # Global theme scripts
└── styles/          # SCSS — theme, editor, content, login
parts/               # FSE template parts (header, footer)
patterns/            # Block patterns
templates/           # FSE page templates
tests/
├── js/              # Jest + Testing Library tests per block
└── php/             # PHPUnit tests per block
```

## Scripts

```bash
npm start            # development build (watch, experimental modules)
npm run build        # production build
npm run build:prod   # lint + production build
npm run lint         # JS (wp-scripts) + TypeScript + SCSS
npm run tsc          # TypeScript type check
npm run test:js      # Jest unit tests
npm run test:php     # PHPUnit via wp-env
npm run env:start    # start wp-env environment
```

## Stack
TypeScript - PHP - SCSS<br>
WordPress - Gutenberg - Interactivity API - wp-env<br>
GSAP - PDF.js - Jest - PHPUnit<br>
