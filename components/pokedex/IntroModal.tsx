"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatTypeLabel } from "@/lib/pokedex/typeLabel";
import { getPublicTypeIconSrc } from "@/lib/pokemon/format";

import { usePokemonModal } from "./pokemon-modal-context";

export function IntroModal() {
  const { currentPokemon } = usePokemonModal();

  if (!currentPokemon) {
    return null;
  }

  return (
    <div className="pokemon-intro">
      <Dialog.Close asChild>
        <button type="button" className="modal-back-btn" aria-label="Back to list">
          <ArrowLeft className="modal-back-btn__icon" aria-hidden />
        </button>
      </Dialog.Close>

      <div className="current-pokemon">
        <img src={currentPokemon.imgSrc} alt={currentPokemon.name} />

        <div>
          <span className="id-number">{`#${currentPokemon.paddedId}`}</span>
          <span className="pokemon-name">{currentPokemon.name}</span>

          <div className="types types--inline">
            {currentPokemon.types.map(({ name }) => (
              <Tooltip key={name}>
                <TooltipTrigger asChild>
                  <div className={`${name} intro-type-badge`}>
                    <img src={getPublicTypeIconSrc(name)} alt="" />
                    <span className="type-name">{name}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                  {formatTypeLabel(name)}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
