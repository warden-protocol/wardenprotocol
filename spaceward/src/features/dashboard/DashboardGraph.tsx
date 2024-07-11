import clsx from "clsx";
import { useMemo, useState } from "react";
import type { AddressResponse } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta2/query";
import TotalAssetsChart from "./Chart";

import { Icons } from "@/components/ui/icons-assets";
import { useModalContext } from "@/context/modalContext";
import { useSpaceId } from "@/hooks/useSpaceId";
import { useAssetQueries } from "../assets/hooks";
import { FIAT_FORMAT } from "../assets/util";
import { useCurrency } from "@/hooks/useCurrency";
import { bigintToFloat } from "@/lib/math";

type Currency = keyof typeof FIAT_FORMAT;

const DashboardGraph = ({
	addresses,
}: {
	addresses?: (AddressResponse & { keyId: bigint })[];
}) => {
	const curr = useCurrency();
	const currency = curr.currency as Currency;
	const formatter = FIAT_FORMAT[currency];
	const { dispatch } = useModalContext();
	const [graphInterval, setGraphInterval] = useState<7 | 30 | 90>(30);

	const { spaceId } = useSpaceId();
	const { queryBalances, queryPrices } = useAssetQueries(spaceId);
	const results = queryBalances.flatMap((item) => item.data?.results);

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

	const totalBalance = useMemo(() => {
		const targetDecimals = 2;

		const total = results.reduce((acc, item) => {
			if (!item) {
				return acc;
			}

			const decimals = item.decimals + item.priceDecimals;

			const usd =
				(item.balance * item.price) /
				BigInt(10) ** BigInt(decimals - targetDecimals);

			return acc + usd;
		}, BigInt(0));

		return total;
	}, [results]);

	return (
		<div className="relative group cursor-pointer bg-card  p-6 pb-0 border-[1px] border-border-secondary rounded-2xl">
			<div className="flex items-start justify-between mb-1">
				<div className="font-bold text-[32px] flex items-center gap-3">
					{formatter.format(
						bigintToFloat(
							fiatConversion
								? (totalBalance *
										BigInt(10) **
											BigInt(fiatConversion.decimals)) /
										fiatConversion.value
								: BigInt(0),
							2,
						),
					)}

					<Icons.buttonArrow className="group-hover:opacity-100 opacity-0 ease-out duration-300" />
				</div>

				<div className="flex gap-2">
					<div
						onClick={() => setGraphInterval(7)}
						className={clsx(
							"text-xs text-pixel-pink py-1 px-2 rounded-3xl cursor-pointer ease-out duration-200",
							graphInterval == 7 &&
								"bg-pink-secondary pointer-events-none",
						)}
					>
						7D
					</div>
					<div
						onClick={() => setGraphInterval(30)}
						className={clsx(
							"text-xs text-pixel-pink py-1 px-2 rounded-3xl cursor-pointer ease-out duration-200",
							graphInterval == 30 &&
								"bg-pink-secondary pointer-events-none",
						)}
					>
						1M
					</div>
					<div
						onClick={() => setGraphInterval(90)}
						className={clsx(
							"text-xs text-pixel-pink py-1 px-2 rounded-3xl cursor-pointer ease-out duration-200",
							graphInterval == 90 &&
								"bg-pink-secondary pointer-events-none",
						)}
					>
						3M
					</div>
				</div>
			</div>

			<div className="text-muted-foreground">In total</div>

			<div className="-mx-6 w-[calc(100%_+_48px)] max-w-none h-[191px] overflow-hidden rounded-lg">
				<TotalAssetsChart />
			</div>

			<div className="absolute left-6 bottom-6 flex w-[calc(100%_-_48px)] justify-between">
				<div className="flex items-center gap-3">
					<div className="flex">
						<img
							className="w-10 h-10 object-contain"
							src="/images/eth.png"
							alt=""
						/>

						<img
							className="w-10 h-10 object-contain -ml-3"
							src="/images/arb-icon.png"
							alt=""
						/>

						<img
							className="w-10 h-10 object-contain -ml-3"
							src="/images/polygon.png"
							alt=""
						/>
					</div>
					5 assets
				</div>
				<button
					onClick={dispatch.bind(null, {
						type: "set",
						payload: {
							type: "select-key",
							params: { addresses, next: "receive" },
						},
					})}
					className="rounded bg-fill-quaternary h-10 px-5 font-semibold  duration-300 ease-out hover:bg-pink-secondary"
				>
					Receive
				</button>
			</div>
		</div>
	);
};

export default DashboardGraph;
