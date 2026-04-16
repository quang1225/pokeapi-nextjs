"use client";

import { Suspense } from "react";

import { PokemonSearch } from "./PokemonSearch";
import { TypeFilter } from "./TypeFilter";

type PokedexToolbarProps = {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedTypes: string[];
  onTypesChange: (types: string[]) => void;
};

export function PokedexToolbar({
  searchQuery,
  onSearchChange,
  selectedTypes,
  onTypesChange,
}: PokedexToolbarProps) {
  return (
    <div className="pokedex-toolbar">
      <PokemonSearch value={searchQuery} onChange={onSearchChange} />
      <div className="types-bar-wrap">
        <Suspense
          fallback={
            <div
              className="types-bar types-bar--skeleton"
              aria-hidden
            />
          }
        >
          <TypeFilter value={selectedTypes} onChange={onTypesChange} />
        </Suspense>
      </div>
    </div>
  );
}
