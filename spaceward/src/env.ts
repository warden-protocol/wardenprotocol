const apiURL = import.meta.env.VITE_WARDEN_REST_URL ?? "http://127.0.0.1:1317";
const rpcURL = import.meta.env.VITE_WARDEN_RPC_URL ?? "http://127.0.0.1:26657";
const prefix = import.meta.env.VITE_ADDRESS_PREFIX ?? "warden";
const faucetURL = import.meta.env.VITE_FAUCET_URL ?? "/api/faucet";
const chainName =
    import.meta.env.VITE_WARDEN_CHAIN_NAME || "Warden Protocol (local)";
const cosmoskitChainName =
    import.meta.env.VITE_WARDEN_COSMOSKIT_CHAIN_NAME || "wardenprotocollocal";
const chainId = import.meta.env.VITE_WARDEN_CHAIN_ID || "wardenprotocol";
const maintenance = import.meta.env.VITE_WARDEN_MAINTENANCE || false;
const snapOrigin =
    import.meta.env.VITE_WARDEN_SNAP_ORIGIN || "local:http://localhost:8123";
const spacewardEnv = import.meta.env.VITE_WARDEN_ENVIRONMENT || "development"; // development, production
const storyblokToken =
    import.meta.env.VITE_WARDEN_STORYBLOK_TOKEN || "LTh76K2yz5nU6jUThhFG3Qtt";

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
};
