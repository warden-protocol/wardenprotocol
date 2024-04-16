import useCosmosBankV1Beta1 from "./useCosmosBankV1Beta1";
import { useAddressContext } from "./useAddressContext";

export const useAsset = (denom: string) => {
    const { address } = useAddressContext();
    const { QueryBalance } = useCosmosBankV1Beta1();
    const query = QueryBalance(
        address,
        { denom },
        {
            enabled: !!address,
        }
    );
    return { balance: query.data?.balance, isLoading: query.isLoading };
};
