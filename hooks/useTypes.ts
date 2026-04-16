import { useSuspenseQuery } from "@tanstack/react-query";

import { apiFetchJson } from "@/lib/pokeapi/client";
import type { TypeListResponse } from "@/lib/pokeapi/types";

export function useTypes() {
  return useSuspenseQuery({
    queryKey: ["types"],
    queryFn: async () => {
      const data = await apiFetchJson<TypeListResponse>("/type");
      return data.results.filter(
        ({ name }) =>
          name !== "unknown" &&
          name !== "shadow" &&
          name !== "stellar",
      );
    },
    staleTime: 1000 * 60 * 60,
  });
}
