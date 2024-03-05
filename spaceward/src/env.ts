const apiURL = import.meta.env.VITE_WARDEN_REST_URL ?? "http://127.0.0.1:1317";
const rpcURL = import.meta.env.VITE_WARDEN_RPC_URL ?? "http://127.0.0.1:26657";
const prefix = import.meta.env.VITE_ADDRESS_PREFIX ?? "warden";
const faucetURL = import.meta.env.VITE_FAUCET_URL ?? "/api/faucet";
const chainName =
	import.meta.env.VITE_WARDEN_CHAIN_NAME || "Warden Protocol (local)";
const chainId = import.meta.env.VITE_WARDEN_CHAIN_ID || "wardenprotocol";
const maintenance = import.meta.env.VITE_WARDEN_MAINTENANCE || false;

export const env = {
	apiURL,
	rpcURL,
	prefix,
	faucetURL,
	chainName,
	chainId,
	maintenance,
};
