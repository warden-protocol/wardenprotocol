import { createContext, ReactNode, useContext, useState } from "react";
import { env } from "@/env";
import { useClient } from "@/hooks/useClient";
import type { Wallet, Nullable, EncodedWallet } from "../utils/interfaces";
import { useSpaceId } from "@/hooks/useSpaceId";
import { useActiveWallet } from "@/hooks/useActiveWallet";
import { useWallet, useWalletClient, useChain } from "@cosmos-kit/react";

interface Props {
    children?: ReactNode;
}

const initState = {
    wallets:
        (JSON.parse(
            window.localStorage.getItem("wallets") ?? "null"
        ) as Array<EncodedWallet>) || ([] as Array<EncodedWallet>),
    activeWallet: null as Nullable<Wallet>,
    activeClient: null as Nullable<ReturnType<typeof useClient>>,
};

type WalletDispatch = {
    connectWallet: () => Promise<void>;
    getActiveWallet: () => void;
    signOut: () => void;
};

const WalletContext = createContext(initState);
const WalletDispatchContext = createContext({} as WalletDispatch);

export const useWalletContext = () => useContext(WalletContext);
export const useDispatchWalletContext = () => useContext(WalletDispatchContext);

export default function WalletProvider({ children }: Props) {
    const client = useClient();
    const connectedWallet = useWallet();
    const walletClient = useWalletClient();

    const [wallets, setWallets] = useState([] as Array<EncodedWallet>);

    const { chain } = useChain(env.cosmoskitChainName);

    // const [activeWallet, setActiveWallet] = useState(null as Nullable<Wallet>);
    const { activeWallet, setActiveWallet } = useActiveWallet();

    const [activeClient, setActiveClient] = useState(
        null as Nullable<ReturnType<typeof useClient>>
    );
    const { setSpaceId } = useSpaceId();

    const connectWallet = async () => {
        const chainId = chain.chain_id ?? "alfama";

        try {
            const wallet: Wallet = {
                name: connectedWallet.wallet?.prettyName ?? "",
                mnemonic: null,
                HDpath: null,
                password: null,
                prefix: client.env.prefix ?? "warden",
                pathIncrement: null,
                accounts: [],
            };

            if (
                walletClient.client &&
                walletClient.client.getOfflineSignerDirect
            ) {
                client.useSigner(
                    walletClient.client.getOfflineSignerDirect(chainId)
                );
            } else {
                throw new Error("walletClient.client undefined");
            }

            if (!client.signer) {
                throw new Error("client.signer undefined");
            }
            const [account] = await client.signer.getAccounts();
            wallet.accounts.push({
                address: account.address,
                pathIncrement: null,
            });

            setActiveWallet(wallet);
            window.localStorage.setItem("lastWallet", wallet.name);
            if (
                activeWallet?.name == "Leap Integration" &&
                !activeWallet.password
            ) {
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
        client.removeSigner();
        setSpaceId("");
        setActiveClient(null);
        setActiveWallet(undefined);
    };
    const getActiveWallet = () => {
        return activeWallet;
    };
    return (
        <WalletContext.Provider value={{ wallets, activeWallet, activeClient }}>
            <WalletDispatchContext.Provider
                value={{
                    connectWallet,
                    getActiveWallet,
                    signOut,
                }}
            >
                {children}
            </WalletDispatchContext.Provider>
        </WalletContext.Provider>
    );
}
