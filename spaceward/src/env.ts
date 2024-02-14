const apiURL = import.meta.env.VITE_API_COSMOS ?? "http://127.0.0.1:1317";
const rpcURL = import.meta.env.VITE_WS_TENDERMINT ?? "http://127.0.0.1:26657";
const prefix = import.meta.env.VITE_ADDRESS_PREFIX ?? "warden";

export const env = {
  apiURL,
  rpcURL,
  prefix,
};
