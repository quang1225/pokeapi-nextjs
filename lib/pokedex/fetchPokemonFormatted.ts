import { apiFetchJson } from "@/lib/pokeapi/client";
import type { PokemonResponse } from "@/lib/pokeapi/types";
import { formatPokemonData, type FormattedPokemon } from "@/lib/pokemon/format";

export async function fetchFormattedPokemonById(
  id: number,
): Promise<FormattedPokemon> {
  const data = await apiFetchJson<PokemonResponse>(`/pokemon/${id}`);
  return formatPokemonData(data);
}

export async function fetchFormattedPokemonPage(
  refs: { id: number }[],
): Promise<FormattedPokemon[]> {
  if (refs.length === 0) {
    return [];
  }
  return Promise.all(refs.map((r) => fetchFormattedPokemonById(r.id)));
}
