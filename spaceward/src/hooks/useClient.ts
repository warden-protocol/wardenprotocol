import { Client } from "warden-protocol-wardenprotocol-client-ts";
import { env } from "../env";

export type ClientInstance = ReturnType<typeof createInstance>;
let clientInstance: ClientInstance | undefined;

function createInstance() {
	return new Client(env);
}

export const useClient = () => {
	if (!clientInstance) {
		clientInstance = createInstance();
	}

	return clientInstance;
};
