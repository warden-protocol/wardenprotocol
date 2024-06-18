import { Icons } from "@/components/ui/icons-assets";
import clsx from "clsx";
import { useState } from "react";
import SelectKeyModal from "../assets/SelectKeyModal";
import { useQueryHooks } from "@/hooks/useClient";
import { AddressType } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta2/key";
import { PageRequest } from "@wardenprotocol/wardenjs/codegen/cosmos/base/query/v1beta1/pagination";
import { useSpaceId } from "@/hooks/useSpaceId";
import TotalAssetsChart from "./Chart";

const DashboardGraph = () => {
	const [graphInterval, setGraphInterval] = useState<7 | 30 | 90>(30);
	const [isSelectKeyModal, setIsSelectKeyModal] = useState(false);

	const { spaceId } = useSpaceId();

	const { useKeysBySpaceId, isReady } = useQueryHooks();

	const assetsQuery = useKeysBySpaceId({
		request: {
			spaceId: BigInt(spaceId || ""),
			deriveAddresses: [
				AddressType.ADDRESS_TYPE_ETHEREUM,
				AddressType.ADDRESS_TYPE_OSMOSIS,
			],
			pagination: PageRequest.fromPartial({
				limit: BigInt(10),
			}),
		},
		options: {
			enabled: isReady && !!spaceId,
		},
	});

	const assetsArray = assetsQuery?.data?.keys.flatMap(
		(item) => item.addresses,
	);

	return (
		<div className="relative group cursor-pointer bg-card  p-6 pb-0 border-[1px] border-border-secondary rounded-2xl">
			<div className="flex items-start justify-between mb-1">
				<div className="font-bold text-[32px] flex items-center gap-3">
					$4,085.76
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

			<div className="-mx-6 w-[calc(100%_+_48px)] max-w-none h-[272px] overflow-hidden rounded-lg">
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
					onClick={() => setIsSelectKeyModal(true)}
					className="rounded h-10 px-5 font-semibold bg-secondary-bg duration-300 ease-out hover:bg-pink-secondary"
				>
					Receive
				</button>
			</div>

			{isSelectKeyModal && (
				<SelectKeyModal
					onHide={() => setIsSelectKeyModal(false)}
					addresses={assetsArray}
				/>
			)}
		</div>
	);
};

export default DashboardGraph;
