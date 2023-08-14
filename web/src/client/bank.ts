import { PaginatedResponse, path, query } from "./common";

export type Balance = {
  denom: string;
  amount: string;
};

export type BalancesResponse = PaginatedResponse & {
  balances: Balance[];
};

export function balances(addr: string): Promise<BalancesResponse> {
  return query(path(["cosmos", "bank", "v1beta1", "balances", addr]));
}
