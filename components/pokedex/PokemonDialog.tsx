"use client";

import * as Dialog from "@radix-ui/react-dialog";

import { IntroModal } from "./IntroModal";
import { ModalTabs } from "./ModalTabs";
import { usePokemonModal } from "./pokemon-modal-context";

export function PokemonDialog() {
  const { isModalOpen, closeModal, currentPokemon } = usePokemonModal();

  const primaryType = currentPokemon?.types[0]?.name ?? "normal";

  return (
    <Dialog.Root
      open={isModalOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeModal();
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="overlay" />
        <Dialog.Content
          className={`modal ${primaryType}`}
          data-content={currentPokemon?.name ?? ""}
        >
          <Dialog.Title className="sr-only">
            {currentPokemon
              ? `${currentPokemon.name} — details`
              : "Pokémon details"}
          </Dialog.Title>
          {currentPokemon ? (
            <>
              <IntroModal />
              <ModalTabs pokemonId={currentPokemon.id} />
            </>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
