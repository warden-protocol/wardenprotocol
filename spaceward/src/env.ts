const apiURL = import.meta.env.VITE_WARDEN_REST_URL ?? "http://127.0.0.1:1317";
const rpcURL = import.meta.env.VITE_WARDEN_RPC_URL ?? "http://127.0.0.1:26657";
const prefix = import.meta.env.VITE_ADDRESS_PREFIX ?? "warden";
const faucetURL = import.meta.env.VITE_FAUCET_URL ?? "http://127.0.0.1:8000";
const chainName =
	import.meta.env.VITE_WARDEN_CHAIN_NAME || "Warden Protocol (local)";
const cosmoskitChainName =
	import.meta.env.VITE_WARDEN_COSMOSKIT_CHAIN_NAME || "wardenprotocollocal";
const chainId = import.meta.env.VITE_WARDEN_CHAIN_ID || "warden";
const maintenance = import.meta.env.VITE_WARDEN_MAINTENANCE || false;
const snapOrigin =
	import.meta.env.VITE_WARDEN_SNAP_ORIGIN || "local:http://localhost:8123";
const spacewardEnv = import.meta.env.VITE_WARDEN_ENVIRONMENT || "development"; // development, production
const storyblokToken =
	import.meta.env.VITE_WARDEN_STORYBLOK_TOKEN || "LTh76K2yz5nU6jUThhFG3Qtt";
const ethereumAnalyzerContract =
	import.meta.env.VITE_WARDEN_ETHEREUM_ANALYZER_CONTRACT ||
	"warden14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9srt30us";
const aminoAnalyzerContract =
	import.meta.env.VITE_WARDEN_AMINO_ANALYZER_CONTRACT ||
	"warden1nc5tatafv6eyq7llkr2gv50ff9e22mnf70qgjlv737ktmt4eswrq075d7k";
const p2pRelayURL =
	import.meta.env.VITE_P2P_RELAY_URL || "https://127.0.0.1:3339";

export const env = {
	apiURL,
	rpcURL,
	prefix,
	faucetURL,
	chainName,
	chainId,
	maintenance,
	snapOrigin,
	spacewardEnv,
	storyblokToken,
	cosmoskitChainName,
	ethereumAnalyzerContract,
	aminoAnalyzerContract,
	p2pRelayURL,
};
