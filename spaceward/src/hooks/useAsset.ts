import { useAddressContext } from "./useAddressContext";
import { useQueryHooks } from "./useClient";

export const useAsset = (denom: string) => {
	const { address } = useAddressContext();
	const { useBalance } = useQueryHooks().cosmos.bank.v1beta1;
	const query = useBalance({
		request: {
			address,
			denom,
		},
		options: {
			enabled: !!address,
		}
	});
	return { balance: query.data?.balance, isLoading: query.isLoading };
};
