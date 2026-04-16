"use client";

import "@radix-ui/themes/styles.css";

import { Skeleton, Theme } from "@radix-ui/themes";

import { POKEMON_CATALOG_PAGE_SIZE } from "@/hooks/usePokemonsForTypes";

/**
 * Radix Themes {@link Skeleton} for the main grid suspense fallback.
 * `Theme` is scoped to this subtree only (unmounts when data resolves).
 */
export function PokemonCatalogSkeleton() {
  return (
    <Theme appearance="inherit" hasBackground={false} accentColor="gray">
      <div className="pokemons-container pokemons-container--catalog-skeleton">
        {Array.from({ length: POKEMON_CATALOG_PAGE_SIZE }, (_, i) => (
          <Skeleton
            key={i}
            loading
            className="pokemon-catalog-skeleton-slot"
            height="clamp(140px, 28vw, 200px)"
          />
        ))}
      </div>
    </Theme>
  );
}
