import { useQueries } from "@tanstack/react-query";
import { useCurrency } from "./useCurrency";
import { fiatPricesQuery } from "@/features/assets/queries";
import { useMemo } from "react";

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

type Currency = keyof typeof FIAT_FORMAT;

export default function useFiatConversion() {
	const currency = useCurrency().currency as Currency;
	const formatter = FIAT_FORMAT[currency];
	const queryPrices = useQueries(fiatPricesQuery(true))

	const fiatConversion = useMemo(() => {
		if (currency === "usd") {
			return {
				name: "usd",
				value: BigInt(1),
				decimals: 0,
			};
		}

		for (const entry of queryPrices) {
			if (!entry.data) {
				continue;
			}

			if (entry.data.name === currency) {
				return entry.data;
			}
		}
	}, [queryPrices, currency]);

	return {
		currency,
		formatter,
		fiatConversion,
	}
}
