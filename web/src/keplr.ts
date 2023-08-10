import { Chain } from "@evmos/transactions";
import { useEffect, useState } from "react";

export const bech32Prefix = "qredo";

export const chain: Chain = {
  chainId: 420,
  cosmosChainId: 'fusion_420-1',
}

export const chainDescriptor = {
  chainId: chain.cosmosChainId,
  chainName: "Fusion Chain (localhost)",
  rpc: "http://localhost:27657",
  rest: "http://localhost:1717",
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
      coinDenom: "QRDO",
      coinMinimalDenom: "nQRDO",
      coinDecimals: 9,
    },
  ],
  features: ["eth-address-gen", "eth-key-sign"],
  feeCurrencies: [
    {
      coinDenom: "QRDO",
      coinMinimalDenom: "nQRDO",
      coinDecimals: 9,
      gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.04,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: "QRDO",
    coinMinimalDenom: "nQRDO",
    coinDecimals: 9,
  },
}

export async function enableKeplr() {
  if (!window.keplr) {
    alert("Please install keplr extension");
    return
  }

  await window.keplr.experimentalSuggestChain(chainDescriptor);
  await window.keplr.enable(chain.cosmosChainId);
}

export function useKeplrAddress() {
  const [addr, setAddr] = useState("");
  useEffect(() => {
    if (!window.keplr) {
      alert("Please install keplr extension");
      return
    }
    window.keplr.getKey(chain.cosmosChainId).then((key) => {
        setAddr(key.bech32Address);
    });
  }, []);
  return addr;
}
