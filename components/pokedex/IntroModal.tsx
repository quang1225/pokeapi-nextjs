"use client";

import { getPublicTypeIconSrc } from "@/lib/pokemon/format";

import { usePokemonModal } from "./pokemon-modal-context";

export function IntroModal() {
  const { currentPokemon, closeModal } = usePokemonModal();

  if (!currentPokemon) {
    return null;
  }

  return (
    <div className="pokemon-intro">
      <button
        type="button"
        className="arrow-back"
        onClick={closeModal}
        aria-label="Back to list"
      />

      <div className="current-pokemon">
        <img src={currentPokemon.imgSrc} alt={currentPokemon.name} />

        <div>
          <span className="id-number">{`#${currentPokemon.paddedId}`}</span>
          <span className="pokemon-name">{currentPokemon.name}</span>

          <div className="types">
            {currentPokemon.types.map(({ name }) => (
              <div key={name} className={name}>
                <img src={getPublicTypeIconSrc(name)} alt="" />
                <span className="type-name">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
