import { createContext, ReactNode } from "react";
import { useConnectWallet } from "@web3-onboard/react";
import { toBytes } from "viem";
import { toBech32 } from "@cosmjs/encoding";

interface Props {
	children?: ReactNode;
}

export const AddressContext = createContext({
	address: "",
	evmAddress: undefined as `0x${string}` | undefined,
	shortAddress: "",
});

export function AddressProvider({ children }: Props) {
	//let { address } = useChain(env.cosmoskitChainName);
	const [{ wallet }] = useConnectWallet();
	const evmAddress = wallet?.accounts?.[0]?.address;
	const address = evmAddress ? toBech32("warden", toBytes(evmAddress)) : "";
	const shortAddress = address ?
		address.substring(0, 10) + "..." + address.slice(-4) :
		"";

	return <AddressContext.Provider value={{ address, evmAddress, shortAddress }}>{children}</AddressContext.Provider>;
}
