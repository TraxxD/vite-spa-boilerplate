# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server (HMR enabled)
npm run build    # Production build to dist/
npm run lint     # ESLint (flat config, React hooks + refresh plugins)
npm run preview  # Preview production build locally
```

## Architecture

**SATOSHI NOIR** — A premium dark-themed Bitcoin single-page application built with Vite + React 19.

### Data Flow

`useBitcoinData()` hook (src/hooks/) is called once in `App.jsx` and passes data down as props to all sections. It fetches from CoinGecko's free public API (no key required) and caches responses in sessionStorage with TTLs (60s for price, 1hr for historical, 5min for market data). A hardcoded monthly price table (2010–2025) serves as fallback when API calls fail.

### Routing

React Router DOM v7 with two routes: `"/"` renders MainPage (all 9 scrolling sections), `"*"` renders NotFound. Navigation within the page uses smooth-scroll to section IDs, not route changes.

### Component Layout (top to bottom on page)

Navbar → Hero (with 3D coin) → FeatureGrid → Banner(gold) → PriceDashboard (with PriceChart) → InvestmentCalculator → Banner(purple) → Timeline → Resources → Footer

### 3D Coin (BitcoinCoin3D.jsx)

Uses React Three Fiber + Three.js. Textures are generated programmatically via Canvas2D (no external image files). Scene background is set to `#0a0a0a` explicitly via `scene.background` (not alpha transparency). Interactive: auto-rotates on Y axis, drag to spin freely, eases back on release.

## Design System

CSS custom properties defined in `src/index.css`. Dark-only theme.

- **Colors:** `--bg-primary: #0a0a0a`, `--gold: #F7931A` (accent), `--green/#red` for price changes
- **Typography:** `--font-serif: Playfair Display` (headings), `--font-sans: Inter` (body) — loaded from Google Fonts in index.html
- **Layout:** `--container-width: 1200px`, `--section-padding: 120px`
- **Breakpoints:** 968px (tablet grid collapse), 768px (mobile nav/layout), 480px (stacked buttons)

## Workflow

- **Always commit and push after each code change.** Do not wait for the user to ask — every modification should be committed and pushed immediately.

## Conventions

- **CSS:** BEM naming (`.block__element--modifier`), one CSS file per component, co-located with its JSX
- **Animations:** Framer Motion `whileInView` with `viewport={{ once: true }}` for scroll-triggered entry animations
- **State:** React hooks only (no external state library). All Bitcoin data centralized in the custom hook
- **API dates:** CoinGecko expects `dd-mm-yyyy`; HTML date inputs produce `yyyy-mm-dd` — conversion happens in InvestmentCalculator
