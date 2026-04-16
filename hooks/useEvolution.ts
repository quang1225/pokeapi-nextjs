import { useQuery } from "@tanstack/react-query";

import { ApiError, apiFetchJson, fetchJsonUrl } from "@/lib/pokeapi/client";
import type {
  EvolutionChainResponse,
  PokemonSpeciesResponse,
} from "@/lib/pokeapi/types";
import { normalizeEvolutionChain } from "@/lib/pokemon/format";

export function useEvolution(id: number | undefined) {
  return useQuery({
    queryKey: ["chain", id],
    enabled: id !== undefined && id > 0,
    queryFn: async () => {
      if (id === undefined) {
        return [];
      }
      try {
        const species = await apiFetchJson<PokemonSpeciesResponse>(
          `/pokemon-species/${id}/`,
        );
        const chainData = await fetchJsonUrl<EvolutionChainResponse>(
          species.evolution_chain.url,
        );
        return normalizeEvolutionChain(chainData.chain);
      } catch (err) {
        if (err instanceof ApiError && err.status === 404) {
          return [];
        }
        throw err;
      }
    },
  });
}
