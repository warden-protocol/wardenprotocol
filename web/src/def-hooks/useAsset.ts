import useCosmosBankV1Beta1 from "../hooks/useCosmosBankV1Beta1";
import { useAddressContext } from "./addressContext";

export const useAsset = (denom: string) => {
  const { address } = useAddressContext();
  const { QueryBalance } = useCosmosBankV1Beta1();
  const query = QueryBalance(address, { denom }, {});
  return { balance: query.data?.balance, isLoading: query.isLoading };
};
