"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { FormattedPokemon } from "@/lib/pokemon/format";

type ModalState = { isOpen: boolean; pokemon: FormattedPokemon | null };

export type PokemonModalContextValue = {
  currentPokemon: FormattedPokemon | null;
  openModal: (pokemon: FormattedPokemon) => void;
  isModalOpen: boolean;
  closeModal: () => void;
};

const PokemonModalContext = createContext<PokemonModalContextValue | null>(
  null,
);

export function PokemonModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    pokemon: null,
  });

  const openModal = useCallback((pokemon: FormattedPokemon) => {
    setModal({ isOpen: true, pokemon });
  }, []);

  const closeModal = useCallback(() => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const value = useMemo<PokemonModalContextValue>(
    () => ({
      currentPokemon: modal.pokemon,
      openModal,
      isModalOpen: modal.isOpen,
      closeModal,
    }),
    [modal.isOpen, modal.pokemon, openModal, closeModal],
  );

  return (
    <PokemonModalContext.Provider value={value}>
      {children}
    </PokemonModalContext.Provider>
  );
}

export function usePokemonModal(): PokemonModalContextValue {
  const ctx = useContext(PokemonModalContext);
  if (!ctx) {
    throw new Error("usePokemonModal must be used within PokemonModalProvider");
  }
  return ctx;
}
