import type {
  EvolutionChainLink,
  NamedApiResource,
  PokemonResponse,
  PokemonStat,
} from "@/lib/pokeapi/types";

export type FormattedPokemon = Omit<
  PokemonResponse,
  "types" | "name" | "weight" | "height"
> & {
  paddedId: string;
  weight: string;
  height: string;
  imgSrc: string;
  types: NamedApiResource[];
  name: string;
};

export function getPublicTypeIconSrc(typeName: string): string {
  return `/images/types-icons/${typeName}.svg`;
}

export function formatPokemonData(pokemon: PokemonResponse): FormattedPokemon {
  const weightInKg = `${pokemon.weight / 10}kg`;
  const heightInMeter = `${pokemon.height / 10}m`;
  const paddedId = String(pokemon.id).padStart(3, "0");
  const formattedTypes = pokemon.types.map(({ type }) => type);
  const dreamWorld =
    pokemon.sprites.other?.dream_world?.front_default ?? null;
  const officialArt =
    pokemon.sprites.other?.["official-artwork"]?.front_default ?? null;
  const imgSrc =
    dreamWorld ??
    officialArt ??
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  return {
    ...pokemon,
    paddedId,
    weight: weightInKg,
    height: heightInMeter,
    imgSrc,
    types: formattedTypes,
    name: removeHyphens(pokemon.name),
  };
}

export interface StatRow {
  name: string;
  value: number;
  max?: number;
}

const STATS_MAX: Record<string, number> = {
  hp: 714,
  attack: 714,
  defense: 614,
  "special-attack": 504,
  "special-defense": 614,
  speed: 504,
};

export function formatStats(stats: PokemonStat[]): StatRow[] {
  const statsObject = stats.map(({ stat, base_stat }) => ({
    name: removeHyphens(stat.name),
    value: base_stat,
    max: STATS_MAX[stat.name],
  }));

  const total = stats.reduce((acc, { base_stat }) => acc + base_stat, 0);

  return [...statsObject, { name: "total", value: total }];
}

export interface EvolutionPair {
  current: { name: string; image: string };
  next: { name: string; image: string };
}

function getPokemonImageFromSpeciesUrl(url: string): string {
  const match = url.match(/\/(\d+)\//);
  if (!match) {
    return "";
  }
  const id = Number(match[1]);
  const base =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other";

  if (id < 650) {
    return `${base}/dream-world/${id}.svg`;
  }

  return `${base}/official-artwork/${id}.png`;
}

export function normalizeEvolutionChain(
  evolutionChain: EvolutionChainLink,
): EvolutionPair[] {
  const { species, evolves_to: evolvesTo } = evolutionChain;

  if (!evolvesTo.length) {
    return [];
  }

  return evolvesTo.reduce<EvolutionPair[]>((chain, evolution) => {
    return [
      ...chain,
      {
        current: {
          name: species.name,
          image: getPokemonImageFromSpeciesUrl(species.url),
        },
        next: {
          name: evolution.species.name,
          image: getPokemonImageFromSpeciesUrl(evolution.species.url),
        },
      },
      ...normalizeEvolutionChain(evolution),
    ];
  }, []);
}

function removeHyphens(value: string): string {
  return value.replace(/-/g, " ");
}
