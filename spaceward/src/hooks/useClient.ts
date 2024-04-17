import {
	createRpcQueryHooks,
	getRpcClient,
	useRpcClient,
	warden,
} from "@wardenprotocol/wardjs";
import { Client } from "warden-protocol-wardenprotocol-client-ts";
import { env } from "../env";

const useClientInstance = () => {
	const client = new Client(env);
	return client;
};
let clientInstance: ReturnType<typeof useClientInstance>;

export const useClient = () => {
	if (!clientInstance) {
		clientInstance = useClientInstance();
	}
	return clientInstance;
};

export function useQueryHooks() {
	const rpcQuery = useRpcClient({ rpcEndpoint: env.rpcURL });
	const rpc = rpcQuery.data;
	return createRpcQueryHooks({ rpc });
}

export function getClient() {
	return warden.ClientFactory.createRPCQueryClient({
		rpcEndpoint: env.rpcURL,
	});
}
