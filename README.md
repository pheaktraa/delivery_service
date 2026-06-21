# Delivery Service (Vue 3 + Vite)

A single-page web application built with Vue 3 and Vite for managing deliveries, drivers, and users. This repository contains the frontend used by the Delivery Service project.

## Features
- Authentication and user profiles
- Create and manage deliveries
- Driver dashboard and delivery acceptance flow
- Admin panel for user and order management
- Real-time chat and notifications (store modules included)

## Quick start
Prerequisites: Node.js 16+ and npm/yarn.

Install dependencies:

```bash
npm install
# or
yarn
```

Run the dev server:

```bash
npm run dev
# or
yarn dev
```

Build for production:

```bash
npm run build
# or
yarn build
```

Preview production build locally:

```bash
npm run preview
# or
yarn preview
```

## Project structure
- `src/` — application source code (components, pages, store, utils)
- `public/` — static assets
- `vite.config.js` — Vite configuration

For details, see the `src` folder where pages like `Loginpage.vue`, `ProfilePage.vue`, and admin dashboards are implemented.

## Environment
This project uses client-side configuration and may require API keys or environment variables for services such as Supabase or Google Maps. Store secrets in a `.env` file and never commit them.

## Contributing
Feel free to open issues or PRs. Follow existing code style and add tests for new features when possible.

## License
Specify a license for your project (e.g., MIT) or add one later.

---
Updated for the Delivery Service frontend (Vue 3 + Vite).
