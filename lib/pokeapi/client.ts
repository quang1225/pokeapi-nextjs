const BASE = "https://pokeapi.co/api/v2";

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiFetchJson<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE}${endpoint}`);
  if (res.status === 404) {
    throw new ApiError(404, res.statusText);
  }
  if (!res.ok) {
    throw new ApiError(res.status, res.statusText);
  }
  return (await res.json()) as T;
}

export async function fetchJsonUrl<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (res.status === 404) {
    throw new ApiError(404, res.statusText);
  }
  if (!res.ok) {
    throw new ApiError(res.status, res.statusText);
  }
  return (await res.json()) as T;
}
