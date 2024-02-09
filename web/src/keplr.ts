import { Chain } from "@evmos/transactions";
import { useEffect, useState } from "react";

export const bech32Prefix = "warden";

export const chain: Chain = {
  chainId: import.meta.env.VITE_WARDEN_CHAIN_ID_NUM || 257,
  cosmosChainId: import.meta.env.VITE_WARDEN_CHAIN_ID || 'wardenprotocol_121-1',
}

const WARDEN_RPC_URL = import.meta.env.VITE_WARDEN_RPC_URL || "http://127.0.0.1:26657";
const WARDEN_REST_URL = import.meta.env.VITE_WARDEN_REST_URL || "http://127.0.0.1:1317";

export const chainDescriptor = {
  chainId: chain.cosmosChainId,
  chainName: import.meta.env.VITE_WARDEN_CHAIN_NAME || "Warden Protocol",
  rpc: WARDEN_RPC_URL,
  rest: WARDEN_REST_URL,
  bip44: {
    coinType: 60,
  },
  bech32Config: {
    bech32PrefixAccAddr: bech32Prefix,
    bech32PrefixAccPub: bech32Prefix + "pub",
    bech32PrefixValAddr: bech32Prefix + "valoper",
    bech32PrefixValPub: bech32Prefix + "valoperpub",
    bech32PrefixConsAddr: bech32Prefix + "valcons",
    bech32PrefixConsPub: bech32Prefix + "valconspub",
  },
  currencies: [
    {
      coinDenom: "WARD",
      coinMinimalDenom: "nward",
      coinDecimals: 9,
    },
  ],
  features: ["eth-address-gen", "eth-key-sign"],
  feeCurrencies: [
    {
      coinDenom: "WARD",
      coinMinimalDenom: "nward",
      coinDecimals: 9,
      gasPriceStep: {
        low: 25,
        average: 50,
        high: 100,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: "WARD",
    coinMinimalDenom: "nward",
    coinDecimals: 9,
  },
}

export async function enableKeplr() {
  if (!window.keplr) {
    // alert("Please install keplr extension");
    return
  }

  await window.keplr.experimentalSuggestChain(chainDescriptor);
  await window.keplr.enable(chain.cosmosChainId);
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function useKeplrAddress() {
  const [addr, setAddr] = useState("");

  useEffect(() => {
    const updateAddr = async () => {
      if (!window.keplr) {
        await sleep(1000);
      }

      if (!window.keplr) {
        //alert("Keplr not found. Please install keplr extension.");
        return
      }
      const key = await window.keplr.getKey(chain.cosmosChainId);
      setAddr(key.bech32Address);
    }

    window.addEventListener("keplr_keystorechange", updateAddr);
    updateAddr();
    return () => {
      window.removeEventListener("keplr_keystorechange", updateAddr);
    }
  }, []);
  return addr;
}
