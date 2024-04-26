import {
	createRpcQueryHooks,
	useRpcClient,
	warden,
} from "@wardenprotocol/wardenjs";
import { Client } from "warden-protocol-wardenprotocol-client-ts";
import { env } from "../env";

const useClientInstance = () => {
	const client = new Client(env);
	return client;
};
let clientInstance: ReturnType<typeof useClientInstance>;

export const useClient = () => {
	if (!clientInstance) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		clientInstance = useClientInstance();
	}
	return clientInstance;
};

export function useQueryHooks() {
	const rpcQuery = useRpcClient({ rpcEndpoint: env.rpcURL });
	const rpc = rpcQuery.data;
	const isReady = !!rpcQuery.data;

	return {
		isReady,
		...createRpcQueryHooks({ rpc }),
	};
}

export function getClient() {
	return warden.ClientFactory.createRPCQueryClient({
		rpcEndpoint: env.rpcURL,
	});
}
