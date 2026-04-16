"use client";

import { getPublicTypeIconSrc } from "@/lib/pokemon/format";

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

          <tr>
            <td className="category">Types</td>
            <td>
              {currentPokemon.types.map(({ name }) => (
                <img
                  key={name}
                  className={name}
                  src={getPublicTypeIconSrc(name)}
                  alt=""
                />
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
