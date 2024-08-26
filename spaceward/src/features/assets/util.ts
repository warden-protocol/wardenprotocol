import { Chain } from "@chain-registry/types";
import { chains } from "chain-registry";
import { InterfaceAbi } from "ethers";

type UnwrapArray<T> = T extends readonly (infer U)[] ? U : never;
type FilterByName<T extends {}, N extends string> = T extends { name: N }
	? T
	: never;
type GetAbiItem<ABI extends InterfaceAbi, F extends string> = FilterByName<
	UnwrapArray<ABI>,
	F
>;

export function getAbiItem<ABI extends InterfaceAbi, F extends string>(
	abi: ABI,
	name: F,
): GetAbiItem<ABI, F> | undefined {
	if (!Array.isArray(abi)) {
		return undefined;
	}

	return abi.find((item) => item.name === name) as GetAbiItem<ABI, F>;
}

const _chains: Record<string, Chain | undefined | false> = {};

/** @deprecated fixme chain names */
export const isOsmosis = (chainName?: string) => {
	if (!chainName) {
		return false;
	}

	if (typeof _chains[chainName] === "undefined") {
		const entry = chains.find((chain) => chain.chain_name === chainName);
		_chains[chainName] = entry ?? false;
	}

	return typeof _chains[chainName] === "object";
};

export const getCosmosChain = (chainName?: string) => {
	if (!chainName) {
		return;
	}

	if (typeof _chains[chainName] === "undefined") {
		const entry = chains.find((chain) => chain.chain_name === chainName);
		_chains[chainName] = entry ?? false;
	}

	return _chains[chainName] || undefined;
};
