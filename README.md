# pokeapi-nextjs

A **Pokédex** web app built with **Next.js 16** (App Router), **TypeScript**, **Tailwind CSS v4**, and **Radix UI**. It loads live data from [PokéAPI v2](https://pokeapi.co/docs/v2): **multi-select types**, **search** (name / number), **paginated** grid, detail **Dialog** with **Tabs**, and **light / dark** theme with a circular reveal animation.

## Features

- **Search** + **multi-type** filter (AND: Pokémon must have every selected type), Radix **ToggleGroup** + **Tooltip**, paginated card grid, total count
- **TanStack Query** — `useSuspenseQuery` for types and catalog pages ([hooks/usePokemonsForTypes.ts](hooks/usePokemonsForTypes.ts) `usePokemonCatalogPage`: type refs cached, full `/pokemon/{id}` only for the visible page)
- Strict API and domain types (`lib/pokeapi`, `lib/pokemon`, `lib/pokedex`)
- Static artwork under `public/images` (Pokéball masks, type icons)
- **Roboto** + **Pokémon Solid** (logo) in [app/layout.tsx](app/layout.tsx)

## Requirements

- Node.js **20+**
- **pnpm** `10.x` (see `packageManager` in [package.json](package.json))

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command      | Description                                  |
| ------------ | -------------------------------------------- |
| `pnpm dev`   | Development server (Turbopack)               |
| `pnpm build` | Production build + typecheck                 |
| `pnpm start` | Run production build locally                 |
| `pnpm lint`  | `tsc --noEmit` + ESLint ([eslint.config.mjs](eslint.config.mjs)) |

### Optional environment

Set **`NEXT_PUBLIC_SITE_URL`** (no trailing slash) for [app/sitemap.ts](app/sitemap.ts) in production.

## Project layout

```
app/                      # App Router: layout, page, globals, pokedex.css
components/
  pokedex/                # PokedexRoot, toolbar, grid, dialog, tabs, context
  theme/                  # ThemeProvider, ThemeToggle
  ui/                     # button, tooltip
hooks/                    # useTypes, usePokemonsForTypes (catalog page), useEvolution
lib/
  pokeapi/                # HTTP client + API types
  pokemon/                # formatters (stats, evolution, sprites)
  pokedex/                # type refs, per-page Pokémon fetch, typeLabel helper
public/images/            # SVGs for UI chrome and type icons
docs/                     # pokedex.md, pokedex-plan.md
AGENTS.md                 # Agent / contributor conventions
```

## Agent / contributor notes

See **[AGENTS.md](AGENTS.md)** for architecture, lint/build, and PR conventions.

## License

MIT (see [LICENSE](LICENSE) if present).
