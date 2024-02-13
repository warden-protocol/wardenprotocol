import { useMemo } from "react";
import useCosmosBankV1Beta1 from "../hooks/useCosmosBankV1Beta1";
import { useAddressContext } from "./addressContext";
import { useDenomContext } from "./denomContext";

export const useAssets = (perPage: number) => {
  // composables
  const { address } = useAddressContext();
  const { QueryAllBalances } = useCosmosBankV1Beta1();
  const enabled = useMemo(() => {
    return address != "";
  }, [address]);
  const query = QueryAllBalances(address, {}, { enabled }, perPage);
  type HelperBalances = NonNullable<NonNullable<Required<typeof query.data>>["pages"][0]["balances"]>;

  const balancesRaw = query.data?.pages.reduce((bals, page) => {
    if (page.balances) {
      return bals.concat(page.balances);
    } else {
      return bals;
    }
  }, [] as HelperBalances);

  const balances = useMemo(() => {
    return {
      assets: balancesRaw ?? [],
      isLoading: query.isLoading,
    };
  }, [balancesRaw]);

  return {
    balancesRaw,
    balances,
    isLoading: query.isLoading,
    fetch: query.fetchNextPage,
    hasMore: query.hasNextPage,
  };
};
