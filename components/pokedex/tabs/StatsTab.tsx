"use client";

import { formatStats } from "@/lib/pokemon/format";

import { DataRow } from "../DataRow";
import { usePokemonModal } from "../pokemon-modal-context";

export function StatsTab() {
  const { currentPokemon } = usePokemonModal();

  if (!currentPokemon) {
    return null;
  }

  const stats = formatStats(currentPokemon.stats);

  return (
    <>
      <h4>Base Stats</h4>

      <table>
        <tbody>
          {stats.map((stat) => (
            <DataRow
              key={stat.name}
              category={stat.name}
              value={stat.value}
              max={stat.max}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
