import { Icons } from "@/components/ui/icons-assets";
import clsx from "clsx";
import { useContext, useState } from "react";
import { useQueryHooks } from "@/hooks/useClient";
import { AddressType } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta2/key";
import { PageRequest } from "@wardenprotocol/wardenjs/codegen/cosmos/base/query/v1beta1/pagination";
import { useSpaceId } from "@/hooks/useSpaceId";
import TotalAssetsChart from "./Chart";
import { useQueries } from "@tanstack/react-query";

import { formatEther } from "ethers";
import { getProvider } from "@/lib/eth";
import { ModalContext } from "@/context/modalContext";
import { AddressResponse } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta2/query";

const chainId = 11155111;
const provider = getProvider("sepolia");
const USDollar = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

async function getEthBalance(address: string) {
	const balance = await provider.getBalance(address);
	return balance;
}

const DashboardGraph = ({ addresses }: { addresses?: AddressResponse[] }) => {
	const { dispatch } = useContext(ModalContext);
	const [graphInterval, setGraphInterval] = useState<7 | 30 | 90>(30);

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

	const keysQ = useKeysBySpaceId({
		request: {
			spaceId: BigInt(spaceId || ""),
			deriveAddresses: [AddressType.ADDRESS_TYPE_ETHEREUM],
			pagination: PageRequest.fromPartial({
				limit: BigInt(10),
			}),
		},
		options: {
			enabled: isReady && !!spaceId,
		},
	});

	const totalBalanceQuery = useQueries({
		queries: keysQ.data
			? keysQ.data.keys
					.map((key) => key?.addresses?.[0]?.address)
					.map((ethAddr) => ({
						queryKey: ["eth-balance", chainId, ethAddr],
						queryFn: () => getEthBalance(ethAddr),
						enabled: !!ethAddr,
					}))
			: [],
	});

	const totalBalance = totalBalanceQuery.reduce(
		(partialSum, result) => partialSum + BigInt(result.data || 0),
		BigInt(0),
	);

	return (
		<div className="relative group cursor-pointer bg-card  p-6 pb-0 border-[1px] border-border-secondary rounded-2xl">
			<div className="flex items-start justify-between mb-1">
				<div className="font-bold text-[32px] flex items-center gap-3">
					{USDollar.format(
						parseFloat(formatEther(totalBalance)) * 2940,
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
					className="rounded h-10 px-5 font-semibold bg-secondary-bg duration-300 ease-out hover:bg-pink-secondary"
				>
					Receive
				</button>
			</div>
		</div>
	);
};

export default DashboardGraph;
