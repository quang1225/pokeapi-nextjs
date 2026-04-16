"use client";

import { usePokemons } from "@/hooks/usePokemons";

import { PokemonCard } from "./PokemonCard";

type PokemonsContainerProps = {
  type: string;
};

export function PokemonsContainer({ type }: PokemonsContainerProps) {
  const { data: pokemons } = usePokemons(type);

  return (
    <div className="pokemons-container">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}
