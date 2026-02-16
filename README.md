# Vite SPA Boilerplate

A minimal boilerplate for building Single Page Applications (SPA) with [Vite](https://vitejs.dev/), [React](https://react.dev/), and [TypeScript](https://www.typescriptlang.org/).

## Features

- React 19 with TypeScript
- Fast development server with Hot Module Replacement (HMR)
- ESLint pre-configured
- Optimized production builds

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/TraxxD/vite-spa-boilerplate.git
cd vite-spa-boilerplate

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
├── public/          # Static assets
├── src/
│   ├── assets/      # Images, fonts, etc.
│   ├── App.tsx      # Root component
│   ├── App.css      # App styles
│   ├── main.tsx     # Entry point
│   └── index.css    # Global styles
├── index.html       # HTML entry point
├── vite.config.ts   # Vite configuration
├── tsconfig.json    # TypeScript configuration
└── package.json
```

## License

MIT
