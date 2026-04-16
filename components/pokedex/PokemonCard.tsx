"use client";

import type { FormattedPokemon } from "@/lib/pokemon/format";
import { getPublicTypeIconSrc } from "@/lib/pokemon/format";

import { usePokemonModal } from "./pokemon-modal-context";

type PokemonCardProps = {
  pokemon: FormattedPokemon;
};

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const { openModal } = usePokemonModal();
  const { paddedId, name, types, imgSrc } = pokemon;
  const primaryType = types[0]?.name ?? "normal";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => {
        openModal(pokemon);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModal(pokemon);
        }
      }}
      className={`pokemon-card ${primaryType}`}
    >
      <div>
        <span className="id-number">{`#${paddedId}`}</span>
        <span className="pokemon-name">{name}</span>

        <div className="types">
          {types.map(({ name: typeName }) => (
            <div key={typeName} className={typeName}>
              <img src={getPublicTypeIconSrc(typeName)} alt="" />
              <span className="type-name">{typeName}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pokeball-bg" />
      <img className="pokemon-image" src={imgSrc} alt="" />
    </div>
  );
}
