"use client";

import { useMemo } from "react";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

import { fetchFormattedPokemonPage } from "@/lib/pokedex/fetchPokemonFormatted";
import {
  fetchAllPokemonRefsFromIndex,
  fetchTypePokemonRefs,
  filterRefsBySearch,
  intersectPokemonRefs,
  type PokemonListRef,
} from "@/lib/pokedex/pokemonRefs";
import type { FormattedPokemon } from "@/lib/pokemon/format";

export const POKEMON_CATALOG_PAGE_SIZE = 18;

export type PokemonCatalogPage = {
  items: FormattedPokemon[];
  total: number;
};

function sortedTypesKey(types: string[]): string {
  return [...types].sort().join(",");
}

/**
 * Type refs are cached (intersection = AND). Only the current page loads
 * full `/pokemon/{id}` resources (PokéAPI list pagination applies to index
 * endpoints; type payloads are lists of refs we slice client-side).
 */
export function usePokemonCatalogPage(
  types: string[],
  page: number,
  search: string,
) {
  const queryClient = useQueryClient();
  const typesKey = useMemo(() => sortedTypesKey(types), [types]);

  return useSuspenseQuery({
    queryKey: ["pokemon-catalog", typesKey, page, search],
    staleTime: 30_000,
    queryFn: async (): Promise<PokemonCatalogPage> => {
      const refs =
        types.length === 0
          ? await queryClient.ensureQueryData({
              queryKey: ["pokemon-all-refs"],
              queryFn: fetchAllPokemonRefsFromIndex,
              staleTime: Infinity,
            })
          : await queryClient.ensureQueryData({
              queryKey: ["pokemon-type-refs", typesKey],
              queryFn: async (): Promise<PokemonListRef[]> => {
                const lists = await Promise.all(
                  types.map((t) => fetchTypePokemonRefs(t)),
                );
                return intersectPokemonRefs(lists);
              },
              staleTime: 5 * 60_000,
            });

      const filtered = filterRefsBySearch(refs, search);
      const total = filtered.length;
      const pageCount = Math.max(
        1,
        Math.ceil(total / POKEMON_CATALOG_PAGE_SIZE),
      );
      const safePage = Math.min(Math.max(1, page), pageCount);
      const start = (safePage - 1) * POKEMON_CATALOG_PAGE_SIZE;
      const slice = filtered.slice(start, start + POKEMON_CATALOG_PAGE_SIZE);
      const items = await fetchFormattedPokemonPage(slice);

      return { items, total };
    },
  });
}
