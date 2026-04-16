"use client";

import { Label } from "@/components/ui/label";

type PokemonSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

const SEARCH_ID = "pokedex-search-input";

export function PokemonSearch({ value, onChange }: PokemonSearchProps) {
  return (
    <div className="pokedex-search">
      <Label htmlFor={SEARCH_ID} className="sr-only">
        Search Pokémon by name or number
      </Label>
      <input
        id={SEARCH_ID}
        type="search"
        className="pokedex-search__input"
        placeholder="Search by name or #…"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
}
