# Welcome to RePDF Frontend

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

Preview production build locally (Optional):
```bash
npm run preview
```

## Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Run `npm run build` and deploy the output:

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

- **Static SSG/CSR** – Can be deployed on any static host (no server required).
- **SSR** – Requires an active Node server to deliver rendered pages.

If using **SSR**, you can:
- Serve frontend from your existing backend server.
- Deploy backend and frontend separately.
- Use `react-router-serve` or the built-in React Router App Server (Express-based, production-ready).

From React Router docs:
> “React Router is designed for you to own your server, but if you don't want to set one up, you can use the React Router App Server instead.”

Example:
```bash
npm run build
npm run serve-ssr
```
