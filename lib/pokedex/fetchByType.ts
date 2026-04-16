/**
 * Type-scoped Pokémon lists (refs from `/type/{name}` only).
 * Full `/pokemon/{id}` payloads are loaded per page via
 * {@link fetchFormattedPokemonPage} — see PokéAPI `limit` / `offset` on
 * resource index endpoints: https://pokeapi.co/docs/v2#resource-listspagination-section
 */

export {
  fetchTypePokemonRefs,
  intersectPokemonRefs,
  type PokemonListRef,
} from "@/lib/pokedex/pokemonRefs";

export { fetchFormattedPokemonById, fetchFormattedPokemonPage } from "@/lib/pokedex/fetchPokemonFormatted";
