import { fromBech32 } from "@cosmjs/encoding";

export const isSet = <T>(value?: T | null | undefined): value is T =>
	Boolean(value);

export const isValidBech32 = (address?: string): address is string => {
	if (!address) {
		return false;
	}

	try {
		return Boolean(fromBech32(address));
	} catch {
		return false;
	}
};

const ethRegex = /^0x[a-f0-9]{40}$/i;

export const isValidEth = (address?: string): address is `0x${string}` => {
	if (!address) {
		return false;
	}

	return ethRegex.test(address);
};

export const hasKey = <K extends string>(key: K, obj: any): obj is Record<K, any> => Boolean(obj?.[key]);
