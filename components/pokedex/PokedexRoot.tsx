"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, useState } from "react";

import { Loader } from "./Loader";
import { PokemonDialog } from "./PokemonDialog";
import { PokemonModalProvider } from "./pokemon-modal-context";
import { PokemonsContainer } from "./PokemonsContainer";
import { TypesBar } from "./TypesBar";

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
  const [selectedType, setSelectedType] = useState("ice");

  return (
    <QueryClientProvider client={queryClient}>
      <PokemonModalProvider>
        <div className="pokedex-page">
          <div className="wrapper">
            <h1 className="logo-pokemon">Pokédex</h1>
            <Suspense
              fallback={
                <div
                  className="types-bar"
                  style={{ minHeight: "max(12vw, 4rem)" }}
                  aria-hidden
                />
              }
            >
              <TypesBar
                selectedType={selectedType}
                onTypeChange={setSelectedType}
              />
            </Suspense>
            <Suspense key={selectedType} fallback={<Loader />}>
              <PokemonsContainer type={selectedType} />
            </Suspense>
          </div>
          <PokemonDialog />
        </div>
      </PokemonModalProvider>
    </QueryClientProvider>
  );
}
