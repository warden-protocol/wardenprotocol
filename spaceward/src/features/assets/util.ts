import { Chain } from "@chain-registry/types";
import { chains } from "chain-registry";
import { InterfaceAbi, JsonFragment } from "ethers";

type UnwrapArray<T> = T extends readonly (infer U)[] ? U : never;
type FilterByName<T extends {}, N extends string> = T extends { name: N }
	? T
	: never;
type GetAbiItem<ABI extends InterfaceAbi, F extends string> = FilterByName<
	UnwrapArray<ABI>,
	F
>;

export function getInterface<T extends JsonFragment>(item: T) {
	const { inputs, outputs, type, name, stateMutability } = item;

	// todo typing
	const inputsTypes = (inputs ?? []).map((input) => input.type).join(", ");

	// todo typing
	const outputsTypes = (outputs ?? [])
		.map((output) => output.type)
		.join(", ");

	return `${type as T["type"]} ${name as T["name"]}(${inputsTypes}) ${stateMutability as T["stateMutability"]} returns (${outputsTypes})` as const;
}

export function getAbiItem<ABI extends InterfaceAbi, F extends string>(
	abi: ABI,
	name: F,
) {
	if (!Array.isArray(abi)) {
		throw new Error("ABI is not an array");
	}

	const item = abi.find((item) => item.name === name) as GetAbiItem<ABI, F>;

	if (!item) {
		throw new Error(`No ABI item found with name ${name}`);
	}

	return item
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
