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

const USDollar = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

const Euro = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "EUR",
});

const GBP = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "GBP",
});

export const FIAT_FORMAT = {
	usd: USDollar,
	eur: Euro,
	gbp: GBP,
} as const;
