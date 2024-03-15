import { createContext, ReactNode, useContext, useState } from "react";
import { env } from "@/env";
import { useClient } from "@/hooks/useClient";
import type { Wallet, Nullable, EncodedWallet } from "../utils/interfaces";
import { useSpaceAddress } from "@/hooks/useSpaceAddress";
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
    // connectWithKeplr: () => Promise<void>;
    // connectWithLeap: () => Promise<void>;
    // connectWithCosmostation: () => Promise<void>;
    getActiveWallet: () => void;
    signOut: () => void;
};

const WalletContext = createContext(initState);
const WalletDispatchContext = createContext({} as WalletDispatch);
export const useWalletContext = () => useContext(WalletContext);
export const useDispatchWalletContext = () => useContext(WalletDispatchContext);

export default function WalletProvider({ children }: Props) {
    const [wallets, setWallets] = useState([] as Array<EncodedWallet>);

    const { chain } = useChain(env.cosmoskitChainName);

    // const [activeWallet, setActiveWallet] = useState(null as Nullable<Wallet>);
    const { activeWallet, setActiveWallet } = useActiveWallet();

    const [activeClient, setActiveClient] = useState(
        null as Nullable<ReturnType<typeof useClient>>
    );
    const { setSpaceAddress } = useSpaceAddress();

    const connectWallet = async () => {
        const client = useClient();
        // const chainId = client.env.chainId;
        const chainId = chain.chain_id ?? "alfama";
        try {
            const connectedWallet = useWallet();

            const wallet: Wallet = {
                name: connectedWallet.wallet?.prettyName ?? "",
                mnemonic: null,
                HDpath: null,
                password: null,
                prefix: client.env.prefix ?? "warden",
                pathIncrement: null,
                accounts: [],
            };

            const walletClient = useWalletClient();

            // window.leap.enable(chainId);
            // const offlineSigner = window.leap.getOfflineSigner(chainId);
            client.useSigner(
                walletClient.client?.getOfflineSignerDirect(chainId)
            );

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

    // const connectWithKeplr = async () => {
    // 	const client = useClient();

    // 	try {
    // 		const wallet: Wallet = {
    // 			name: "Keplr",
    // 			mnemonic: null,
    // 			HDpath: null,
    // 			password: null,
    // 			prefix: client.env.prefix ?? "warden",
    // 			pathIncrement: null,
    // 			accounts: [],
    // 		};
    // 		await client.useKeplr({
    // 			chainName: env.chainName,
    // 			bip44: {
    // 				coinType: 118,
    // 			},
    // 			currencies: [
    // 				{
    // 					coinDenom: "WARD",
    // 					coinMinimalDenom: "uward",
    // 					coinDecimals: 6,
    // 				},
    // 			],
    // 			feeCurrencies: [
    // 				{
    // 					coinDenom: "WARD",
    // 					coinMinimalDenom: "uward",
    // 					coinDecimals: 6,
    // 					gasPriceStep: {
    // 						low: 25,
    // 						average: 50,
    // 						high: 100,
    // 					},
    // 				},
    // 			],
    // 			stakeCurrency: {
    // 				coinDenom: "WARD",
    // 				coinMinimalDenom: "uward",
    // 				coinDecimals: 6,
    // 			},
    // 		});
    // 		if (!client.signer) {
    // 			throw new Error("client.signer undefined");
    // 		}
    // 		const [account] = await client.signer.getAccounts();
    // 		wallet.accounts.push({
    // 			address: account.address,
    // 			pathIncrement: null,
    // 		});

    // 		setActiveWallet(wallet);
    // 		window.localStorage.setItem("lastWallet", wallet.name);
    // 		// if (activeWallet && activeWallet.name && activeWallet.password) {
    // 		//   setWallets([
    // 		//     ...wallets,
    // 		//     {
    // 		//       name: activeWallet.name,
    // 		//       wallet: CryptoJS.AES.encrypt(JSON.stringify(activeWallet), activeWallet.password).toString(),
    // 		//     },
    // 		//   ]);
    // 		// }
    // 		if (
    // 			activeWallet?.name == "Keplr Integration" &&
    // 			!activeWallet.password
    // 		) {
    // 			setWallets([
    // 				...wallets,
    // 				{
    // 					name: activeWallet.name,
    // 					wallet: JSON.stringify(activeWallet),
    // 				},
    // 			]);
    // 		}

    // 		setActiveClient(client);
    // 	} catch (e) {
    // 		console.error(e);
    // 	}
    // 	window.localStorage.setItem("wallets", JSON.stringify(wallets));
    // };

    // const connectWithLeap = async () => {
    // 	const client = useClient();
    // 	const chainId = client.env.chainId;

    // 	try {
    // 		const wallet: Wallet = {
    // 			name: "Leap",
    // 			mnemonic: null,
    // 			HDpath: null,
    // 			password: null,
    // 			prefix: client.env.prefix ?? "warden",
    // 			pathIncrement: null,
    // 			accounts: [],
    // 		};
    // 		await window.leap.experimentalSuggestChain({
    // 			chainId: chainId,
    // 			chainName: client.env.chainName,
    // 			rest: client.env.apiURL,
    // 			rpc: client.env.rpcURL,
    // 			bip44: {
    // 				coinType: 118,
    // 			},
    // 			bech32Config: {
    // 				bech32PrefixAccAddr: client.env.prefix ?? "warden",
    // 				bech32PrefixAccPub: client.env.prefix ?? "warden" + "pub",
    // 				bech32PrefixValAddr:
    // 					client.env.prefix ?? "warden" + "valoper",
    // 				bech32PrefixValPub:
    // 					client.env.prefix ?? "warden" + "valoperpub",
    // 				bech32PrefixConsAddr:
    // 					client.env.prefix ?? "warden" + "valcons",
    // 				bech32PrefixConsPub:
    // 					client.env.prefix ?? "warden" + "valconspub",
    // 			},
    // 			currencies: [
    // 				{
    // 					coinDenom: "WARD",
    // 					coinMinimalDenom: "uward",
    // 					coinDecimals: 6,
    // 					coinGeckoId: "WARD",
    // 				},
    // 			],
    // 			feeCurrencies: [
    // 				{
    // 					coinDenom: "WARD",
    // 					coinMinimalDenom: "uward",
    // 					coinDecimals: 6,
    // 					coinGeckoId: "WARD",
    // 					gasPriceStep: {
    // 						low: 0.01,
    // 						average: 0.03,
    // 						high: 0.05,
    // 					},
    // 				},
    // 			],
    // 			stakeCurrency: {
    // 				coinDenom: "WARD",
    // 				coinMinimalDenom: "uward",
    // 				coinDecimals: 6,
    // 				coinGeckoId: "WARD",
    // 			},
    // 			image: "",
    // 			theme: {
    // 				primaryColor: "#fff",
    // 				gradient:
    // 					"linear-gradient(180deg, rgba(255, 255, 255, 0.32) 0%, rgba(255, 255, 255, 0) 100%)",
    // 			},
    // 		});

    // 		window.leap.enable(chainId);
    // 		const offlineSigner = window.leap.getOfflineSigner(chainId);
    // 		client.useSigner(offlineSigner);

    // 		if (!client.signer) {
    // 			throw new Error("client.signer undefined");
    // 		}
    // 		const [account] = await client.signer.getAccounts();
    // 		wallet.accounts.push({
    // 			address: account.address,
    // 			pathIncrement: null,
    // 		});

    // 		setActiveWallet(wallet);
    // 		window.localStorage.setItem("lastWallet", wallet.name);
    // 		if (
    // 			activeWallet?.name == "Leap Integration" &&
    // 			!activeWallet.password
    // 		) {
    // 			setWallets([
    // 				...wallets,
    // 				{
    // 					name: activeWallet.name,
    // 					wallet: JSON.stringify(activeWallet),
    // 				},
    // 			]);
    // 		}

    // 		setActiveClient(client);
    // 	} catch (e) {
    // 		console.error(e);
    // 	}
    // 	window.localStorage.setItem("wallets", JSON.stringify(wallets));
    // };
    // const connectWithCosmostation = async () => {
    // 	const client = useClient();
    // 	const chainId = client.env.chainId;

    // 	try {
    // 		const wallet: Wallet = {
    // 			name: "Cosmostation",
    // 			mnemonic: null,
    // 			HDpath: null,
    // 			password: null,
    // 			prefix: client.env.prefix ?? "warden",
    // 			pathIncrement: null,
    // 			accounts: [],
    // 		};

    // 		await window.cosmostation.cosmos.request({
    // 			method: "cos_addChain",
    // 			params: {
    // 				chainId: chainId,
    // 				chainName: client.env.chainName,
    // 				addressPrefix: client.env.prefix ?? "warden",
    // 				baseDenom: "uward",
    // 				displayDenom: "WARD",
    // 				restURL: client.env.apiURL,
    // 				decimals: 6, // optional
    // 				coinType: "118", // optional
    // 			},
    // 		});

    // 		await window.cosmostation.providers.keplr.enable(chainId);
    // 		const offlineSigner =
    // 			window.cosmostation.providers.keplr.getOfflineSigner(chainId);
    // 		client.useSigner(offlineSigner);

    // 		if (!client.signer) {
    // 			throw new Error("client.signer undefined");
    // 		}
    // 		const [account] = await client.signer.getAccounts();
    // 		wallet.accounts.push({
    // 			address: account.address,
    // 			pathIncrement: null,
    // 		});

    // 		setActiveWallet(wallet);
    // 		window.localStorage.setItem("lastWallet", wallet.name);
    // 		if (
    // 			activeWallet?.name == "Cosmostation Integration" &&
    // 			!activeWallet.password
    // 		) {
    // 			setWallets([
    // 				...wallets,
    // 				{
    // 					name: activeWallet.name,
    // 					wallet: JSON.stringify(activeWallet),
    // 				},
    // 			]);
    // 		}

    // 		setActiveClient(client);
    // 	} catch (e) {
    // 		console.error(e);
    // 	}
    // 	window.localStorage.setItem("wallets", JSON.stringify(wallets));
    // };
    const signOut = () => {
        const client = useClient();
        client.removeSigner();
        setSpaceAddress("");
        setActiveClient(null);
        setActiveWallet(null);
    };
    const getActiveWallet = () => {
        return activeWallet;
    };
    return (
        <WalletContext.Provider value={{ wallets, activeWallet, activeClient }}>
            <WalletDispatchContext.Provider
                value={{
                    connectWallet,
                    // connectWithKeplr,
                    // connectWithLeap,
                    // connectWithCosmostation,
                    getActiveWallet,
                    signOut,
                }}
            >
                {children}
            </WalletDispatchContext.Provider>
        </WalletContext.Provider>
    );
}
