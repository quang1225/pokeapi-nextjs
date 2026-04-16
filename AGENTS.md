# AGENTS.md

Context for humans and coding agents working on **pokeapi-nextjs** (Next.js App Router Pokédex).

## Project shape

- **Single app** — one package at the repo root (`package.json` → `"name": "pokeapi-nextjs"`). There is no Turborepo or `pnpm-workspace` here.
- **Import alias** — use `@/` for root imports (see [tsconfig.json](tsconfig.json) `paths`).
- **Entry UI** — [app/page.tsx](app/page.tsx) renders [components/pokedex/PokedexRoot.tsx](components/pokedex/PokedexRoot.tsx) (`"use client"` boundary: React Query, modal context, filters, grid, dialog).
- **Data layer** — [lib/pokeapi/client.ts](lib/pokeapi/client.ts) (`apiFetchJson`, `fetchJsonUrl`, `ApiError`), [lib/pokeapi/types.ts](lib/pokeapi/types.ts), [lib/pokemon/format.ts](lib/pokemon/format.ts) (`formatPokemonData`, `formatStats`, `normalizeEvolutionChain`).
- **Hooks** — [hooks/useTypes.ts](hooks/useTypes.ts), [hooks/usePokemons.ts](hooks/usePokemons.ts) (`useSuspenseQuery`), [hooks/useEvolution.ts](hooks/useEvolution.ts) (`useQuery`).
- **Styling** — Pokédex layout/animations: [app/pokedex.css](app/pokedex.css); theme + view transitions: [app/globals.css](app/globals.css); Tailwind v4 via `@import "tailwindcss"` in globals.

## Dev environment tips

- Install from repo root: `pnpm install`.
- Dev server: `pnpm dev` → [http://localhost:3000](http://localhost:3000).
- Production build: `pnpm build` then `pnpm start`.
- **Finding code** — search under `app/`, `components/pokedex/`, `hooks/`, `lib/`; avoid duplicating PokéAPI calls outside `lib/pokeapi` and the hooks.
- **Environment** — optional `NEXT_PUBLIC_SITE_URL` (no trailing slash) for [app/sitemap.ts](app/sitemap.ts) and canonical URLs in production.
- **External API** — all live data comes from `https://pokeapi.co/api/v2`; browser `fetch` (no app-owned BFF unless you add one).

## Testing instructions

- There is **no** `.github/workflows` folder and **no** Vitest/Jest test files in this repo yet. Quality gate today: **`pnpm lint`** and **`pnpm build`**.
- **`pnpm lint`** runs `tsc --noEmit` then `eslint .` using [eslint.config.mjs](eslint.config.mjs) (flat config + `typescript-eslint`). Next.js 16 does not ship a `next lint` CLI in the same way as older majors.
- After refactors (moved files, import path changes), run both commands before merging.
- When you add a test runner (e.g. Vitest + React Testing Library, or Playwright for E2E), document the exact commands here and prefer `pnpm test` as the single entrypoint.

## PR instructions

- **Title format:** `[pokeapi-nextjs] <Clear, imperative title>`
- **Before commit / PR:** run `pnpm lint` and `pnpm build`; fix all TypeScript and ESLint errors.
- **Types:** strict TypeScript; do not introduce `any` unless unavoidable and then narrow immediately.
- **UI changes** — preserve existing class names in `app/pokedex.css` consumers (`modal`, `types-bar`, etc.) unless you intentionally redesign; keep Radix + accessibility when swapping markup.
- **Scope** — keep changes focused; avoid unrelated dependency or copy churn.

## Product / UX notes for agents

- Default type filter is **ice** (`PokedexRoot` state).
- Theme toggle uses **View Transitions API** when available, with a clip-path fallback ([app/components/ThemeToggle.tsx](app/components/ThemeToggle.tsx)).
- Modal primary color comes from the Pokémon’s first type class on `.modal.{type}`.
- Evolution tab uses species id with [hooks/useEvolution.ts](hooks/useEvolution.ts); empty chain shows the copy from the UI spec.

## Documentation

- Implementation spec: [docs/pokedex.md](docs/pokedex.md) and plan outline [docs/pokedex-plan.md](docs/pokedex-plan.md).
- PokéAPI contract: [https://pokeapi.co/docs/v2](https://pokeapi.co/docs/v2).
