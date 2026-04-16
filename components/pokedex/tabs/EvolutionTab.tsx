"use client";

import { useEvolution } from "@/hooks/useEvolution";

import { Loader } from "../Loader";

type EvolutionTabProps = {
  id: number;
};

export function EvolutionTab({ id }: EvolutionTabProps) {
  const { data: chain, isPending } = useEvolution(id);

  if (isPending) {
    return <Loader />;
  }

  const evolutions = chain ?? [];

  if (!evolutions.length) {
    return (
      <strong className="error-msg">This Pokémon doesn&apos;t Evolve</strong>
    );
  }

  return (
    <>
      {evolutions.map((evolution, index) => {
        const { current, next } = evolution;
        return (
          <div
            className="evolution-container"
            key={`${next.name}-${String(index)}`}
          >
            <div>
              <div className="poke-img">
                <div className="pokeball-bg" />
                <img src={current.image} alt="" />
              </div>
              <span>{current.name.replace(/-/g, " ")}</span>
            </div>

            <span className="arrow" aria-hidden />

            <div>
              <div className="poke-img">
                <div className="pokeball-bg" />
                <img src={next.image} alt="" />
              </div>
              <span>{next.name.replace(/-/g, " ")}</span>
            </div>
          </div>
        );
      })}
    </>
  );
}
