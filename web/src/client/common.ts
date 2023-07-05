import { baseURL } from "./config";

export const path = (...parts: string[]) => {
  return new URL(baseURL + "/" + parts.join("/"));
}

export const query = async <ResT>(u: URL) => {
  const res = await fetch(u.toString());
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return await res.json() as ResT;
}

export interface PaginatedResponse {
  pagination: {
    next_key: string | null,
    total: string,
  }
}

