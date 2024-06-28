import { createContext, ReactNode } from "react";
import { useChain } from "@cosmos-kit/react";
import { env } from "@/env";

interface Props {
	children?: ReactNode;
}

export const AddressContext = createContext({
	address: "",
	shortAddress: "",
});

export function AddressProvider({ children }: Props) {
	let { address } = useChain(env.cosmoskitChainName);
	const shortAddress = address ?
		address.substring(0, 10) + "..." + address.slice(-4) :
		"";
	address = address || "";
	return <AddressContext.Provider value={{ address, shortAddress }}>{children}</AddressContext.Provider>;
}
