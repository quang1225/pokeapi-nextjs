# AGENTS.md

Context for humans and coding agents working on **pokeapi-nextjs** (Next.js App Router Pokédex).

## Project shape

- **Single app** — one package at the repo root (`package.json` → `"name": "pokeapi-nextjs"`). There is no Turborepo or `pnpm-workspace` here.
- **Import alias** — use `@/` for root imports (see [tsconfig.json](tsconfig.json) `paths`).
- **Entry UI** — [app/page.tsx](app/page.tsx) renders [components/pokedex/PokedexRoot.tsx](components/pokedex/PokedexRoot.tsx) (`"use client"` boundary: React Query, **TooltipProvider**, modal context, toolbar, grid, dialog).
- **Theme** — [components/theme/ThemeProvider.tsx](components/theme/ThemeProvider.tsx) and [components/theme/ThemeToggle.tsx](components/theme/ThemeToggle.tsx); wired from [app/layout.tsx](app/layout.tsx) (no duplicate `app/components` tree).
- **Data layer** — [lib/pokeapi/client.ts](lib/pokeapi/client.ts), [lib/pokeapi/types.ts](lib/pokeapi/types.ts), [lib/pokemon/format.ts](lib/pokemon/format.ts); type lists as refs + intersection in [lib/pokedex/pokemonRefs.ts](lib/pokedex/pokemonRefs.ts), full Pokémon payloads per page in [lib/pokedex/fetchPokemonFormatted.ts](lib/pokedex/fetchPokemonFormatted.ts) (barrel [lib/pokedex/fetchByType.ts](lib/pokedex/fetchByType.ts)).
- **Hooks** — [hooks/useTypes.ts](hooks/useTypes.ts) (excludes `unknown`, `shadow`, **`stellar`**), [hooks/usePokemonsForTypes.ts](hooks/usePokemonsForTypes.ts) (`usePokemonCatalogPage`: AND multi-type + paginated `/pokemon/{id}` fetches), [hooks/useEvolution.ts](hooks/useEvolution.ts).
- **Pokedex UI** — [components/pokedex/](components/pokedex/): `PokedexToolbar`, `TypeFilter`, `PokemonSearch`, `PokemonDataSection`, `Pagination`, `ModalTabs`, etc.
- **Radix-first UI rule** — Prefer **[@radix-ui](https://www.radix-ui.com/primitives)** primitives over bespoke controls when a primitive exists: **Dialog** (modal), **Tabs** (modal sections), **ToggleGroup** (multi type filter), **Tooltip** (type names), **Label** (search field), **Toolbar** (pagination actions + separators), **Dialog.Close** (back control in [IntroModal.tsx](components/pokedex/IntroModal.tsx)). **Button** in [components/ui/button.tsx](components/ui/button.tsx) uses **Slot**. Do not reintroduce native-only patterns where Radix already solves a11y and focus (e.g. use `Dialog.Close` instead of a plain button that only calls `closeModal`).
- **Styling** — [app/pokedex.css](app/pokedex.css) (layout, cards, modal, types bar single-row scroll, tab “rail”, active type ring); [app/globals.css](app/globals.css) (theme tokens, view transitions); Tailwind v4 via `@import "tailwindcss"` in globals.

## Dev environment tips

- Install from repo root: `pnpm install`.
- Dev server: `pnpm dev` → [http://localhost:3000](http://localhost:3000).
- Production build: `pnpm build` then `pnpm start`.
- **Finding code** — search under `app/`, `components/`, `hooks/`, `lib/`; keep PokéAPI fetch/format logic in `lib/pokeapi`, `lib/pokemon`, and `lib/pokedex`.
- **Environment** — optional `NEXT_PUBLIC_SITE_URL` (no trailing slash) for [app/sitemap.ts](app/sitemap.ts) and canonical URLs in production.
- **External API** — `https://pokeapi.co/api/v2`; list UI uses browser `fetch` (add a Route Handler only if you need caching, secrets, or rate limits).

## Testing instructions

- There is **no** `.github/workflows` folder and **no** Vitest/Jest tests yet. Quality gate: **`pnpm lint`** and **`pnpm build`**.
- **`pnpm lint`** runs `tsc --noEmit` then `eslint .` via [eslint.config.mjs](eslint.config.mjs). Next.js 16 does not expose `next lint` the same way as older versions.
- After moving files or changing imports, run both commands before merging.
- When you add tests, document `pnpm test` (or Playwright) here and prefer CI in `.github/workflows`.

## PR instructions

- **Title format:** `[pokeapi-nextjs] <Clear, imperative title>`
- **Before commit / PR:** run `pnpm lint` and `pnpm build`.
- **Types:** strict TypeScript; avoid `any`.
- **UI** — large visual changes live in [app/pokedex.css](app/pokedex.css); keep class contracts (`types-bar`, `modal`, `pokemon-card`, …) stable unless redesigning intentionally.
- **Scope** — focused diffs; avoid unrelated dependency churn.

## Product / UX notes for agents

- **Default types:** `["ice"]` in `PokedexRoot`; user can **multi-select** types (union of API type lists, deduped by Pokémon id). Deselecting all types is blocked (at least one must stay).
- **Type bar** — single horizontal row with **horizontal scroll**; selected types use a **high-contrast ring** (`[data-state="on"]` on ToggleGroup items).
- **Search:** **`useDeferredValue`** on the query string; filters the merged list by name / id / padded id client-side. Field is wired with **Radix Label** + native `type="search"` (no separate Radix text-field primitive in core).
- **Pagination:** **Radix Toolbar** (`Toolbar.Root`, `Toolbar.Button`, `Toolbar.Separator`) in [Pagination.tsx](components/pokedex/Pagination.tsx).
- **Modal tabs** — inactive vs **active** (`data-state="active"`) use separate surface styles (tinted bar + inset underline on active); no pokeball mask on tab row.
- **Modal intro image** — **no** shake/blur entrance animation (avoids flash on open).
- **Theme toggle** — View Transitions when supported, clip-path fallback ([components/theme/ThemeToggle.tsx](components/theme/ThemeToggle.tsx)).
- **Modal** — primary color from first type class on `.modal.{type}`; tab panels use `.modal-scroll-panel` for scroll.
- **Tooltips** — padded content (`TooltipContent` uses comfortable `px`/`py`).

## Documentation

- [docs/pokedex.md](docs/pokedex.md), [docs/pokedex-plan.md](docs/pokedex-plan.md).
- PokéAPI: [https://pokeapi.co/docs/v2](https://pokeapi.co/docs/v2).
