"use client";

import { getPublicTypeIconSrc } from "@/lib/pokemon/format";
import { formatTypeLabel } from "@/lib/pokedex/typeLabel";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { DataRow } from "../DataRow";
import { usePokemonModal } from "../pokemon-modal-context";

export function AboutTab() {
  const { currentPokemon } = usePokemonModal();

  if (!currentPokemon) {
    return null;
  }

  return (
    <>
      <h4>Pokédex Data</h4>

      <table>
        <tbody>
          <DataRow category="height" value={currentPokemon.height} />
          <DataRow category="weight" value={currentPokemon.weight} />

          <tr>
            <td className="category">Abilities</td>
            <td>
              <ol>
                {currentPokemon.abilities.map(({ ability, is_hidden }) =>
                  is_hidden ? (
                    <li key={ability.name}>
                      <small>
                        {ability.name.replace(/-/g, " ")} (hidden ability)
                      </small>
                    </li>
                  ) : (
                    <li key={ability.name}>
                      {ability.name.replace(/-/g, " ")}
                    </li>
                  ),
                )}
              </ol>
            </td>
          </tr>

          <tr className="about-types-row">
            <td className="category about-types-row__label">Types</td>
            <td className="about-types-row__icons">
              {currentPokemon.types.map(({ name }) => (
                <Tooltip key={name}>
                  <TooltipTrigger asChild>
                    <span className="about-types-row__icon-wrap">
                      <img
                        className={`${name} about-types-row__type-img`}
                        src={getPublicTypeIconSrc(name)}
                        alt={formatTypeLabel(name)}
                      />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    {formatTypeLabel(name)}
                  </TooltipContent>
                </Tooltip>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
