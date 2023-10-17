import { chainDescriptor } from "../keplr";

export const path = (parts: string[], params: Record<string, any> = {}) => {
  const path = parts.join("/");
  const u = new URL("/"+path, chainDescriptor.rest);
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined) {
      continue;
    }
    u.searchParams.set(k, v.toString());
  }
  return u;
};

export const query = async (u: URL) => {
  const res = await fetch(u.toString());
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return (await res.json());
};

export interface PaginatedResponse {
  pagination: {
    next_key: string | null;
    total: string;
  };
}
