# AGENTS.md

Context for humans and coding agents working on **pokeapi-nextjs** (Next.js App Router Pokédex).

## Project shape

- **Single app** — one package at the repo root (`package.json` → `"name": "pokeapi-nextjs"`). There is no Turborepo or `pnpm-workspace` here.
- **Import alias** — use `@/` for root imports (see [tsconfig.json](tsconfig.json) `paths`).
- **Entry UI** — [app/page.tsx](app/page.tsx) renders [components/pokedex/PokedexRoot.tsx](components/pokedex/PokedexRoot.tsx) (`"use client"` boundary: React Query, **TooltipProvider**, modal context, toolbar, grid, dialog).
- **Theme** — [components/theme/ThemeProvider.tsx](components/theme/ThemeProvider.tsx) and [components/theme/ThemeToggle.tsx](components/theme/ThemeToggle.tsx); wired from [app/layout.tsx](app/layout.tsx) (no duplicate `app/components` tree).
- **Data layer** — [lib/pokeapi/client.ts](lib/pokeapi/client.ts), [lib/pokeapi/types.ts](lib/pokeapi/types.ts), [lib/pokemon/format.ts](lib/pokemon/format.ts); type lists as refs + intersection in [lib/pokedex/pokemonRefs.ts](lib/pokedex/pokemonRefs.ts) (`fetchAllPokemonRefsFromIndex` when no types selected), full Pokémon payloads per page in [lib/pokedex/fetchPokemonFormatted.ts](lib/pokedex/fetchPokemonFormatted.ts) (barrel [lib/pokedex/fetchByType.ts](lib/pokedex/fetchByType.ts)).
- **Hooks** — [hooks/useTypes.ts](hooks/useTypes.ts) (excludes `unknown`, `shadow`, **`stellar`**), [hooks/usePokemonsForTypes.ts](hooks/usePokemonsForTypes.ts) (`usePokemonCatalogPage`: AND multi-type, empty types = full dex via `/pokemon` list pagination, per-page `/pokemon/{id}`), [hooks/useEvolution.ts](hooks/useEvolution.ts).
- **Pokedex UI** — [components/pokedex/](components/pokedex/): `PokedexToolbar`, `TypeFilter`, `PokemonSearch`, `PokemonDataSection`, `PokemonCatalogSkeleton`, `Pagination`, `ModalTabs`, `PokemonDialog`, etc.
- **Radix-first UI rule** — Prefer **[@radix-ui](https://www.radix-ui.com/primitives)** primitives over bespoke controls when a primitive exists: **Dialog** (modal), **Tabs** (modal sections), **ToggleGroup** (multi type filter), **Tooltip** (`@radix-ui/react-tooltip` in [components/ui/tooltip.tsx](components/ui/tooltip.tsx) as `TooltipPrimitive`), **Label** (search field), **Toolbar** (pagination), **Dialog.Close** (back in [IntroModal.tsx](components/pokedex/IntroModal.tsx)). **Button** in [components/ui/button.tsx](components/ui/button.tsx) uses **Slot**. Do not reintroduce native-only patterns where Radix already solves a11y and focus.
- **Radix Themes** — [components/pokedex/PokemonCatalogSkeleton.tsx](components/pokedex/PokemonCatalogSkeleton.tsx) uses **`@radix-ui/themes`** `Theme` + `Skeleton` for the main grid Suspense fallback (scoped `Theme`, `hasBackground={false}`); styles imported in that module.
- **Styling** — [app/pokedex.css](app/pokedex.css) (layout, cards, modal, types bar, catalog meta row, tab rail); [app/globals.css](app/globals.css) (theme tokens, view transitions); Tailwind v4 via `@import "tailwindcss"` in globals.

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

- **Default types:** `[]` in [PokedexRoot.tsx](components/pokedex/PokedexRoot.tsx) — **no selection = all Pokémon** (national list from `/pokemon?limit={count}`). User may select **multiple types**; catalog uses **intersection (AND)** of each type’s Pokémon list. **Clear all types** resets to `[]`.
- **Type bar** — outer `.types-bar` + inner `.types-bar__scroller` (horizontal scroll without clipping the active ring). Active state uses class **`types-bar__item--active`** (Radix TooltipTrigger overwrites `data-state` on the toggle). Allow empty ToggleGroup value.
- **Catalog meta** — [PokemonDataSection.tsx](components/pokedex/PokemonDataSection.tsx): total and “Selected types” summary on one row (see `.pokedex-catalog-meta`); chips + **Clear all types** when filtering.
- **Search:** **`useDeferredValue`** on the query string; filters ref list by name / id / padded id. Radix **Label** on search field.
- **Pagination:** **Radix Toolbar** in [Pagination.tsx](components/pokedex/Pagination.tsx).
- **Modal** — `z-index` on `.overlay` / `.modal`; **TooltipContent** default **`z-[400]`** so tooltips appear above the dialog. Type badges in **IntroModal** and **AboutTab** use Tooltip.
- **Modal tabs** — active uses `data-state="active"` styles.
- **Modal intro image** — no shake/blur entrance on open.
- **Theme toggle** — View Transitions when supported ([components/theme/ThemeToggle.tsx](components/theme/ThemeToggle.tsx)).
- **Demo assets** — Screenshots for the README live under **`public/images/demo/`** (`1.png`–`5.png`); replace placeholders when updating marketing captures.

## Documentation

- [docs/pokedex.md](docs/pokedex.md), [docs/pokedex-plan.md](docs/pokedex-plan.md).
- PokéAPI: [https://pokeapi.co/docs/v2](https://pokeapi.co/docs/v2).
- Contributor-facing overview: [README.md](README.md).
