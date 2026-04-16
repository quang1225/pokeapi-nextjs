import { apiFetchJson } from "@/lib/pokeapi/client";
import type {
  NamedApiResource,
  PokemonNamedResourceListResponse,
  TypeDetailResponse,
} from "@/lib/pokeapi/types";

export type PokemonListRef = {
  id: number;
  name: string;
  url: string;
};

export function parsePokemonIdFromUrl(url: string): number | null {
  const m = url.match(/\/pokemon\/(\d+)\/?$/);
  return m ? Number(m[1]) : null;
}

/** Full national dex index (two paginated list requests). */
export async function fetchAllPokemonRefsFromIndex(): Promise<PokemonListRef[]> {
  const meta = await apiFetchJson<PokemonNamedResourceListResponse>(
    "/pokemon?limit=1&offset=0",
  );
  const { count } = meta;
  const { results } = await apiFetchJson<PokemonNamedResourceListResponse>(
    `/pokemon?limit=${count}&offset=0`,
  );
  return namedResourcesToSortedRefs(results);
}

function namedResourcesToSortedRefs(
  results: NamedApiResource[],
): PokemonListRef[] {
  const byId = new Map<number, PokemonListRef>();
  for (const r of results) {
    const id = parsePokemonIdFromUrl(r.url);
    if (id == null) {
      continue;
    }
    byId.set(id, { id, name: r.name, url: r.url });
  }
  return Array.from(byId.values()).sort((a, b) => a.id - b.id);
}

export async function fetchTypePokemonRefs(
  type: string,
): Promise<PokemonListRef[]> {
  const { pokemon } = await apiFetchJson<TypeDetailResponse>(`/type/${type}`);
  const byId = new Map<number, PokemonListRef>();
  for (const { pokemon: p } of pokemon) {
    const id = parsePokemonIdFromUrl(p.url);
    if (id == null) {
      continue;
    }
    byId.set(id, { id, name: p.name, url: p.url });
  }
  return Array.from(byId.values()).sort((a, b) => a.id - b.id);
}

/** Pokémon that appear in every list (AND / dual-type filter). */
export function intersectPokemonRefs(
  lists: PokemonListRef[][],
): PokemonListRef[] {
  if (lists.length === 0) {
    return [];
  }
  if (lists.length === 1) {
    return [...lists[0]].sort((a, b) => a.id - b.id);
  }
  const sorted = [...lists].sort((a, b) => a.length - b.length);
  const idSets = sorted.map((list) => new Set(list.map((r) => r.id)));
  const smallest = sorted[0];
  const result: PokemonListRef[] = [];
  for (const ref of smallest) {
    if (idSets.every((s) => s.has(ref.id))) {
      result.push(ref);
    }
  }
  return result.sort((a, b) => a.id - b.id);
}

export function filterRefsBySearch(
  refs: PokemonListRef[],
  query: string,
): PokemonListRef[] {
  const q = query.trim().toLowerCase();
  if (!q) {
    return refs;
  }
  return refs.filter((ref) => matchesPokemonRefSearch(ref, q));
}

export function matchesPokemonRefSearch(
  ref: PokemonListRef,
  q: string,
): boolean {
  const display = ref.name.replace(/-/g, " ").toLowerCase();
  const api = ref.name.toLowerCase();
  const idStr = String(ref.id);
  const padded = idStr.padStart(3, "0");
  return (
    display.includes(q) ||
    api.includes(q) ||
    idStr.includes(q) ||
    padded.includes(q)
  );
}
