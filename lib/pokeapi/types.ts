export interface NamedApiResource {
  name: string;
  url: string;
}

export interface TypeListResponse {
  results: NamedApiResource[];
}

export interface TypeSlotEntry {
  pokemon: NamedApiResource;
  slot: number;
}

export interface TypeDetailResponse {
  pokemon: TypeSlotEntry[];
}

export interface PokemonAbility {
  is_hidden: boolean;
  ability: NamedApiResource;
}

export interface PokemonStat {
  base_stat: number;
  stat: { name: string; url: string };
}

export interface PokemonSprites {
  other?: {
    dream_world?: { front_default: string | null };
    "official-artwork"?: { front_default: string | null };
  };
}

export interface PokemonResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: PokemonAbility[];
  types: { slot: number; type: NamedApiResource }[];
  stats: PokemonStat[];
  sprites: PokemonSprites;
}

export interface PokemonSpeciesResponse {
  evolution_chain: { url: string };
}

export interface EvolutionSpecies {
  name: string;
  url: string;
}

export interface EvolutionDetails {
  min_level: number | null;
}

export interface EvolutionChainLink {
  species: EvolutionSpecies;
  evolves_to: EvolutionChainLink[];
  evolution_details: EvolutionDetails[];
}

export interface EvolutionChainResponse {
  chain: EvolutionChainLink;
}
