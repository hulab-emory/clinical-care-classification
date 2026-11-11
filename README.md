# Clinical Care Classification (CCC) System

A web reference for the **Clinical Care Classification (CCC) System v2.5**: a standardized, coded nursing terminology for documenting nursing diagnoses, interventions, and outcomes in electronic health records. It was developed by Dr. Virginia K. Saba.

## Features

- **Framework:** the 4-level model and the 21 Care Components
- **Terminology Browser:** search and browse CCC diagnoses and interventions
- **Code Builder:** build coded care plan entries interactively, with FHIR output
- **Translations:** multilingual translations and global concordance
- **News, About & Contact:** research updates, governance, and history

## Getting started

Requires [Node.js](https://nodejs.org/) 20 or later.

```bash
npm install
npm run dev       # dev server at http://localhost:3000
npm run build     # production build in dist/
npm run preview   # serve the production build locally
npm run lint      # type-check
```

## Deployment

On every push to `main`, the [`deploy.yml`](.github/workflows/deploy.yml) workflow builds the site and publishes it to GitHub Pages. To enable it, open the repo's **Settings → Pages** and set **Source** to **GitHub Actions**.

## Tech stack

React 19, TypeScript, Vite, Tailwind CSS v4
