import { useSuspenseQuery } from "@tanstack/react-query";

import { apiFetchJson } from "@/lib/pokeapi/client";
import type { PokemonResponse, TypeDetailResponse } from "@/lib/pokeapi/types";
import { formatPokemonData } from "@/lib/pokemon/format";

export function usePokemons(type: string) {
  return useSuspenseQuery({
    queryKey: ["pokemons", type],
    queryFn: async () => {
      const { pokemon: pokemonList } = await apiFetchJson<TypeDetailResponse>(
        `/type/${type}`,
      );

      const pokemons = await Promise.all(
        pokemonList.map(async ({ pokemon: ref }) => {
          const res = await fetch(ref.url);
          if (!res.ok) {
            throw new Error(`Failed to load Pokémon: ${res.status}`);
          }
          const data = (await res.json()) as PokemonResponse;
          return formatPokemonData(data);
        }),
      );

      return pokemons;
    },
  });
}
