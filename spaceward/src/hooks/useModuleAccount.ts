import { ModuleAccount } from "@wardenprotocol/wardenjs/codegen/cosmos/auth/v1beta1/auth";
import { useQueryHooks } from "./useClient";

export function useModuleAccount(name: string) {
	const { cosmos, isReady } = useQueryHooks();
	const { data, status } = cosmos.auth.v1beta1.useModuleAccounts({
		options: {
			enabled: isReady,
			staleTime: Infinity,
		},
	});
	const account = data?.accounts
		.filter((a) => a.typeUrl === "/cosmos.auth.v1beta1.ModuleAccount")
		.map((a) => ModuleAccount.decode(a.value))
		.find((a) => a.name === name);
	return { account, status };
}
