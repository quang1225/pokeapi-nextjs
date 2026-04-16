"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, useEffect, useMemo, useState } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";

import { PokemonCatalogSkeleton } from "./PokemonCatalogSkeleton";
import { PokemonDataSection } from "./PokemonDataSection";
import { PokemonDialog } from "./PokemonDialog";
import { PokedexToolbar } from "./PokedexToolbar";
import { PokemonModalProvider } from "./pokemon-modal-context";

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
      },
    },
  });
}

export function PokedexRoot() {
  const [queryClient] = useState(createQueryClient);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const typesKey = useMemo(
    () => [...selectedTypes].sort().join(","),
    [selectedTypes],
  );

  useEffect(() => {
    setPage(1);
  }, [typesKey, searchQuery]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PokemonModalProvider>
          <div className="pokedex-page">
            <div className="wrapper">
              <h1 className="logo-pokemon">Pokédex</h1>
              <PokedexToolbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedTypes={selectedTypes}
                onTypesChange={setSelectedTypes}
              />
              <Suspense key={typesKey} fallback={<PokemonCatalogSkeleton />}>
                <PokemonDataSection
                  selectedTypes={selectedTypes}
                  searchQuery={searchQuery}
                  page={page}
                  onPageChange={setPage}
                  onClearTypes={() => {
                    setSelectedTypes([]);
                  }}
                />
              </Suspense>
            </div>
            <PokemonDialog />
          </div>
        </PokemonModalProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
