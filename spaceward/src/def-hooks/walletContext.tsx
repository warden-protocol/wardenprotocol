import { createContext, ReactNode, useContext, useState } from "react";
import { env } from "@/env";
import { useClient } from "../hooks/useClient";
import type { Wallet, Nullable, EncodedWallet } from "../utils/interfaces";

interface Props {
  children?: ReactNode;
}
const initState = {
  wallets:
    (JSON.parse(window.localStorage.getItem("wallets") ?? "null") as Array<EncodedWallet>) ||
    ([] as Array<EncodedWallet>),
  activeWallet: null as Nullable<Wallet>,
  activeClient: null as Nullable<ReturnType<typeof useClient>>,
};
type WalletDispatch = {
  connectWithKeplr: () => Promise<void>;
  signOut: () => void;
};
const WalletContext = createContext(initState);
const WalletDispatchContext = createContext({} as WalletDispatch);
export const useWalletContext = () => useContext(WalletContext);
export const useDispatchWalletContext = () => useContext(WalletDispatchContext);
export default function WalletProvider({ children }: Props) {
  const [wallets, setWallets] = useState([] as Array<EncodedWallet>);
  const [activeWallet, setActiveWallet] = useState(null as Nullable<Wallet>);
  const [activeClient, setActiveClient] = useState(null as Nullable<ReturnType<typeof useClient>>);

  const connectWithKeplr = async () => {
    const client = useClient();

    try {
      const wallet: Wallet = {
        name: "Keplr Integration",
        mnemonic: null,
        HDpath: null,
        password: null,
        prefix: client.env.prefix ?? "warden",
        pathIncrement: null,
        accounts: [],
      };
      await client.useKeplr({
        chainName: env.chainName,
        bip44: {
          coinType: 118,
        },
        currencies: [
          {
            coinDenom: "WARD",
            coinMinimalDenom: "uward",
            coinDecimals: 6,
          },
        ],
        feeCurrencies: [
          {
            coinDenom: "WARD",
            coinMinimalDenom: "uward",
            coinDecimals: 6,
            gasPriceStep: {
              low: 25,
              average: 50,
              high: 100,
            },
          },
        ],
        stakeCurrency: {
          coinDenom: "WARD",
          coinMinimalDenom: "uward",
          coinDecimals: 6,
        },
      });
      if (!client.signer) {
        throw new Error("client.signer undefined");
      }
      const [account] = await client.signer.getAccounts();
      wallet.accounts.push({ address: account.address, pathIncrement: null });

      setActiveWallet(wallet);
      window.localStorage.setItem("lastWallet", wallet.name);
      // if (activeWallet && activeWallet.name && activeWallet.password) {
      //   setWallets([
      //     ...wallets,
      //     {
      //       name: activeWallet.name,
      //       wallet: CryptoJS.AES.encrypt(JSON.stringify(activeWallet), activeWallet.password).toString(),
      //     },
      //   ]);
      // }
      if (activeWallet?.name == "Keplr Integration" && !activeWallet.password) {
        setWallets([
          ...wallets,
          {
            name: activeWallet.name,
            wallet: JSON.stringify(activeWallet),
          },
        ]);
      }

      setActiveClient(client);
    } catch (e) {
      console.error(e);
    }
    window.localStorage.setItem("wallets", JSON.stringify(wallets));
  };
  const signOut = () => {
    const client = useClient();
    client.removeSigner();
    setActiveClient(null);
    setActiveWallet(null);
  };
  return (
    <WalletContext.Provider value={{ wallets, activeWallet, activeClient }}>
      <WalletDispatchContext.Provider value={{ connectWithKeplr, signOut }}>{children}</WalletDispatchContext.Provider>
    </WalletContext.Provider>
  );
}
