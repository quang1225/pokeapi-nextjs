# pokeapi-nextjs

A **Pokédex** web app built with **Next.js 16** (App Router), **TypeScript**, **Tailwind CSS v4**, and **Radix UI**. It loads live data from [PokéAPI v2](https://pokeapi.co/docs/v2): browse Pokémon by type, open detail modals (About, Stats, Evolution), and switch **light / dark** theme with a circular reveal animation.

## Features

- Type filter (Radix **ToggleGroup**), responsive card grid, detail **Dialog** with **Tabs** and **ScrollArea**
- **TanStack Query** for caching and suspense-friendly loading (`useSuspenseQuery` for types and per-type lists)
- Strict typing for API responses and formatted models (`lib/pokeapi`, `lib/pokemon`)
- Static assets under `public/images` (Pokéball masks, type icons)
- **Roboto** + **Pokémon Solid** (logo) fonts; see [app/layout.tsx](app/layout.tsx)

## Requirements

- Node.js **20+** (recommended; matches modern Next.js)
- **pnpm** `10.x` (see `packageManager` in [package.json](package.json))

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command        | Description                                      |
| -------------- | ------------------------------------------------ |
| `pnpm dev`     | Development server (Turbopack)                 |
| `pnpm build`   | Production build + typecheck                     |
| `pnpm start`   | Run production build locally                     |
| `pnpm lint`    | `tsc --noEmit` + ESLint (see [eslint.config.mjs](eslint.config.mjs)) |

### Optional environment

Set **`NEXT_PUBLIC_SITE_URL`** to your canonical site origin (no trailing slash) so [app/sitemap.ts](app/sitemap.ts) and metadata can use the right base in production.

## Project layout

```
app/                    # App Router: layout, page, globals, pokedex styles
  components/           # ThemeProvider, ThemeToggle
components/
  pokedex/              # PokedexRoot, dialog, cards, tabs, modal context
  ui/                   # Shared primitives (button, scroll-area)
hooks/                  # useTypes, usePokemons, useEvolution
lib/
  pokeapi/              # HTTP client + API types
  pokemon/              # formatPokemonData, stats, evolution chain
public/images/          # SVGs for UI chrome and type icons
docs/                   # pokedex.md, pokedex-plan.md
```

## Agent / contributor notes

See **[AGENTS.md](AGENTS.md)** for tooling, lint/build expectations, and PR conventions.

## License

MIT (see [LICENSE](LICENSE) if present).
