import type {
	KeyringRequest,
	KeyringSnapRpcClient,
} from "@metamask/keyring-api";

export const querySnapRequests = (
	client: KeyringSnapRpcClient,
	enabled: boolean,
) =>
	({
		queryKey: ["metamask-keyring-requests"],
		queryFn: () => client.listRequests(),
		refetchInterval: 1000,
		enabled,
	}) as const;

export const querySnapAccount = (
	client: KeyringSnapRpcClient,
	request: KeyringRequest,
) =>
	({
		queryKey: ["metamask-keyring-account", request.account],
		queryFn: () => client.getAccount(request.account),
		refetchInterval: Infinity,
	}) as const;
