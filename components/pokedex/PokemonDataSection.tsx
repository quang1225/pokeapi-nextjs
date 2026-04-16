"use client";

import { useDeferredValue, useEffect, useMemo } from "react";

import {
  POKEMON_CATALOG_PAGE_SIZE,
  usePokemonCatalogPage,
} from "@/hooks/usePokemonsForTypes";
import { formatTypeLabel } from "@/lib/pokedex/typeLabel";

import { Pagination } from "./Pagination";
import { PokemonCard } from "./PokemonCard";

type PokemonDataSectionProps = {
  selectedTypes: string[];
  searchQuery: string;
  page: number;
  onPageChange: (page: number) => void;
  onClearTypes: () => void;
};

export function PokemonDataSection({
  selectedTypes,
  searchQuery,
  page,
  onPageChange,
  onClearTypes,
}: PokemonDataSectionProps) {
  const deferredSearch = useDeferredValue(searchQuery.trim().toLowerCase());
  const { data } = usePokemonCatalogPage(
    selectedTypes,
    page,
    deferredSearch,
  );
  const { items, total } = data;

  const pageCount = useMemo(
    () => Math.max(1, Math.ceil(total / POKEMON_CATALOG_PAGE_SIZE)),
    [total],
  );

  useEffect(() => {
    if (page > pageCount) {
      onPageChange(pageCount);
    }
  }, [page, pageCount, onPageChange]);

  return (
    <>
      <div className="pokedex-catalog-meta">
        <p className="pokedex-total" aria-live="polite">
          Total: <strong>{String(total)}</strong> Pokémon
          {selectedTypes.length === 0 ? (
            <span className="pokedex-total__hint pokedex-total__hint--all">
              {" "}
              · No type filter — showing all Pokémon
            </span>
          ) : null}
        </p>
        {selectedTypes.length > 0 ? (
          <div className="pokedex-type-filter-summary">
            <span className="pokedex-type-filter-summary__label">
              Selected types
            </span>
            <ul className="pokedex-type-filter-summary__chips" aria-label="Selected types">
              {selectedTypes.map((t) => (
                <li key={t} className={`pokedex-type-chip ${t}`}>
                  {formatTypeLabel(t)}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="pokedex-clear-types"
              onClick={onClearTypes}
            >
              Clear all types
            </button>
          </div>
        ) : null}
      </div>
      <div className="pokemons-container">
        {items.length === 0 ? (
          <p className="pokedex-empty">No Pokémon match this search.</p>
        ) : (
          items.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        )}
      </div>
      <Pagination
        page={page}
        pageCount={pageCount}
        totalItems={total}
        pageSize={POKEMON_CATALOG_PAGE_SIZE}
        onPageChange={onPageChange}
      />
    </>
  );
}
