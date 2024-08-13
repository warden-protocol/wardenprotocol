import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { AddressResponse } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/query";

import { Icons } from "@/components/ui/icons-assets";
import { useSpaceId } from "@/hooks/useSpaceId";
import { useCurrency } from "@/hooks/useCurrency";
import useFiatConversion from "@/hooks/useFiatConversion";
import { bigintToFloat } from "@/lib/math";
import TotalAssetsChart from "./Chart";
import { Icons as IconsAssets } from "./icons";
import { useAssetQueries } from "../assets/hooks";
import { useModalState } from "../modals/state";

const DashboardGraph = ({
	addresses,
}: {
	addresses?: (AddressResponse & { keyId: bigint })[];
}) => {
	const { fiatConversion, formatter } = useFiatConversion();
	const { setData: setModal } = useModalState();
	const [graphInterval, setGraphInterval] = useState<7 | 30 | 90>(30);

	const { spaceId } = useSpaceId();
	const { queryBalances, queryPrices } = useAssetQueries(spaceId);
	const results = queryBalances.flatMap((item) => item.data?.results);

	const totalBalance = useMemo(() => {
		const targetDecimals = 2;
		let noAssets = true;

		const total = results.reduce((acc, item) => {
			if (!item) {
				return acc;
			}

			if (item.balance) {
				noAssets = false;
			}

			const decimals = item.decimals + item.priceDecimals;

			const usd =
				(item.balance * item.price) /
				BigInt(10) ** BigInt(decimals - targetDecimals);

			return acc + usd;
		}, BigInt(0));

		return { total, noAssets };
	}, [results]);

	return (
		<div className="relative group cursor-pointer bg-card  p-6 pb-0 border-[1px] border-border-edge rounded-2xl overflow-hidden">
			<div className="flex items-start justify-between mb-1">
				<div className="font-bold text-[32px] flex items-center gap-3">
					{formatter.format(
						bigintToFloat(
							fiatConversion
								? (totalBalance.total *
										BigInt(10) **
											BigInt(fiatConversion.decimals)) /
										fiatConversion.value
								: BigInt(0),
							2,
						),
					)}
					<Link to="/assets">
						<Icons.buttonArrow className="group-hover:opacity-100 opacity-0 ease-out duration-300" />
					</Link>
				</div>

				{/* <div className="flex gap-2">
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
				</div> */}
			</div>

			<div className="text-muted-foreground">In total</div>

			<div className="-mx-6 w-[calc(100%_+_48px)] max-w-none h-[191px] overflow-hidden rounded-lg">
				<TotalAssetsChart
					balance={bigintToFloat(
						fiatConversion
							? (totalBalance.total *
									BigInt(10) **
										BigInt(fiatConversion.decimals)) /
									fiatConversion.value
							: BigInt(0),
						2,
					)}
				/>
			</div>

			<div className="absolute left-6 bottom-6 flex w-[calc(100%_-_48px)] justify-between items-center">
				{totalBalance.noAssets ? (
					<div>No assets yet</div>
				) : (
					<>
						{/* <div className="flex items-center gap-3">
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
				</div> */}
					</>
				)}

				<button
					onClick={setModal.bind(null, {
						type: "receive",
						params: {},
					})}
					className="flex items-center gap-2 rounded bg-fill-accent-secondary h-10 px-3 font-semibold  duration-300 ease-out hover:bg-pink-secondary"
				>
					<IconsAssets.arrInCircle className="invert dark:invert-0" />
					Receive
				</button>
			</div>
		</div>
	);
};

export default DashboardGraph;
