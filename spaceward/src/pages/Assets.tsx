import { Assets } from "@/features/assets";
import { useSpaceId } from "@/hooks/useSpaceId";
import { useCurrency } from "@/hooks/useCurrency";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { NoSpaces } from "@/features/spaces";
import { useState } from "react";
import clsx from "clsx";
import SelectKeyModal from "@/features/assets/SelectKeyModal";
import AssetTransactionModal from "@/features/assets/AssetTransactionModal.tsx";
import SignTranactionModal from "@/features/assets/SignTransactionModal";
import DepositFinalModal from "@/features/assets/DepositFinalModal";
import { Icons } from "@/components/ui/icons-assets";

export function AssetsPage() {
	// const { state, error, keyRequest, reset } = useRequestKey();

	const [dateInterval, setDateInterval] = useState(30);

	const { spaceId } = useSpaceId();
	const { currency, setCurrency } = useCurrency();

	const [isAllKeysVisible, setAllKeysVisible] = useState(false);
	const [isAllNetworksVisible, setAllNetworksVisible] = useState(false);

	const [noAssets, setNoAssets] = useState(false);

	const [isSelectKeyModal, setIsSelectKeyModal] = useState(false);
	const [isDopositFinalModal, setIsDepositFinalModal] = useState(false);

	const [isSignTransactionModal, setIsSignTransactionModal] = useState(false);

	const [isShowTransactionModal, setIsShowTransactionModal] = useState({
		isShown: false,
		type: "deposit",
	});

	if (noAssets) {
		return (
			<div className="h-[calc(100vh_-_206px)] min-h-[550px] flex flex-col justify-center items-center text-center">
				<img
					src="/images/noassets.png"
					alt=""
					className="w-[128px] h-[128px] object-contain"
				/>
				<div className="text-5xl font-bold">No assets yet</div>
				<div className="h-6" />
				<div className="">Deposit assets to SpaceWard</div>
				<div className="h-12" />
				<button className="text-black bg-white h-[56px] rounded-lg justify-center text-base font-medium flex items-center gap-2 py-1 px-6">
					<Icons.arrowDown />
					Receive
				</button>
			</div>
		);
	}

	return (
		<div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
			<div className="flex items-center justify-between pb-4 space-y-2">
				<div>
					<h2 className="text-5xl font-bold">Assets</h2>
					<p className="text-muted-foreground"></p>
				</div>
				{/* <div>
					<Select value={currency} onValueChange={setCurrency}>
						<SelectTrigger className="w-[100px]">
							<SelectValue placeholder="Currency" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="usd">USD</SelectItem>
								<SelectItem value="eur">EUR</SelectItem>
								<SelectItem value="gbp">GBP</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div> */}
			</div>
			<div className="grid grid-cols-[320px_1fr] gap-[24px]">
				<div className="bg-tertiary-bg relative isolate py-6 px-8 rounded-xl">
					<img
						src="/images/asset-decor.png"
						alt=""
						className="absolute right-0 top-0 h-full w-auto z-[-5]"
					/>
					<div className="flex items-baseline gap-[6px]">
						<div className="text-2xl font-bold">$4,085.76</div>
						<Select value={currency} onValueChange={setCurrency}>
							<SelectTrigger className="flex gap-[4px] w-fit bg-[transparent] border-0 outline-none focus:!otline-none shadow-none focus:!shadow-none p-0 !shadow-transparent text-sm text-secondary-text h-auto">
								<SelectValue
									placeholder="Currency"
									className=""
								/>
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="usd">USD</SelectItem>
									<SelectItem value="eur">EUR</SelectItem>
									<SelectItem value="gbp">GBP</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<div className="h-[72px]" />

					<div className="grid grid-cols-2 gap-2">
						<button
							onClick={() => setIsSelectKeyModal(true)}
							className="w-full text-black bg-white flex items-center h-10 rounded gap-2 justify-center text-base font-medium"
						>
							<Icons.arrowDown />
							Receive
						</button>
						<button
							onClick={() => setIsSelectKeyModal(true)}
							className="w-full text-secondary-text flex items-center h-10 rounded gap-2 justify-center text-base font-medium"
						>
							<Icons.send />
							Send
						</button>
					</div>
				</div>
				<div className="bg-tertiary rounded-xl border-border-secondary border-[1px] py-6 px-8">
					<div className="flex justify-between items-center">
						<div className="text-2xl font-bold tracking-[0.12px]">
							Performance
						</div>
						<div className="flex gap-2">
							<div
								onClick={() => setDateInterval(1)}
								className={clsx(
									"cursor-pointer text-xs bg-secondary-bg rounded-3xl py-1 px-2",
									dateInterval == 1
										? "text-white"
										: "text-secondary-text",
								)}
							>
								1d
							</div>

							<div
								onClick={() => setDateInterval(30)}
								className={clsx(
									"cursor-pointer text-xs bg-secondary-bg rounded-3xl py-1 px-2",
									dateInterval === 30
										? "text-white"
										: "text-secondary-text",
								)}
							>
								30d
							</div>

							<div
								onClick={() => setDateInterval(90)}
								className={clsx(
									"cursor-pointer text-xs bg-secondary-bg rounded-3xl py-1 px-2",
									dateInterval === 90
										? "text-white"
										: "text-secondary-text",
								)}
							>
								90d
							</div>
						</div>
					</div>

					<img
						src="/images/graph.png"
						alt=""
						className="h-[107px] object-contain"
					/>
				</div>
			</div>

			<div className="bg-tertiary rounded-xl border-border-secondary border-[1px] px-8 py-6">
				<div className="flex justify-between items-center">
					<div className="text-2xl font-bold tracking-[0.12px]">
						Balances
					</div>

					<div className="flex gap-2">
						<div className="gap-2">
							<div
								onClick={() =>
									setAllKeysVisible(!isAllKeysVisible)
								}
								className="cursor-pointer group relative h-8 rounded-2xl bg-secondary-bg py-2 px-3 text-xs text-white flex items-center gap-[2px]"
							>
								All Keys
								<Icons.chevronDown
									className={
										isAllKeysVisible ? "rotate-180" : ""
									}
								/>
								{isAllKeysVisible && (
									<div className="w-[248px] bg-secondary-bg text-white text-sm rounded-lg  py-2 absolute z-10 bottom-[-8px] right-0 whitespace-nowrap backdrop-blur-[30px] translate-y-[100%] ">
										<div className="cursor-pointer h-10 px-4 flex items-center gap-3">
											<img
												src="/images/key.png"
												className="w-6 h-6 object-contain cursor-pointer"
												alt=""
											/>
											All Keys
											<Icons.check className="ml-auto" />
										</div>
										<div className="cursor-pointer h-10 px-4 flex items-center gap-3">
											<img
												src="/images/somewallet.png"
												className="w-6 h-6 object-contain cursor-pointer"
												alt=""
											/>
											Key #1,234
										</div>
										<div className="cursor-pointer h-10 px-4 flex items-center gap-3">
											<img
												src="/images/somewallet.png"
												className="w-6 h-6 object-contain cursor-pointer"
												alt=""
											/>
											Key #1,234
										</div>
										<div className="cursor-pointer h-10 px-4 flex items-center gap-3">
											<img
												src="/images/somewallet.png"
												className="w-6 h-6 object-contain cursor-pointer"
												alt=""
											/>
											Key #1,234
										</div>
									</div>
								)}
							</div>
						</div>

						<div className="gap-2">
							<div
								onClick={() =>
									setAllNetworksVisible(!isAllNetworksVisible)
								}
								className="cursor-pointer group relative h-8 rounded-2xl bg-secondary-bg py-2 px-3 text-xs text-white flex items-center gap-[2px]"
							>
								All Networks
								<Icons.chevronDown
									className={
										isAllNetworksVisible ? "rotate-180" : ""
									}
								/>
								{isAllNetworksVisible && (
									<div className="w-[248px] bg-secondary-bg text-white text-sm rounded-lg  py-2 absolute z-10 bottom-[-8px] right-0 whitespace-nowrap backdrop-blur-[30px] translate-y-[100%] ">
										<div className="cursor-pointer h-10 px-4 flex items-center gap-3">
											<img
												src="/images/networks.png"
												className="w-6 h-6 object-contain cursor-pointer"
												alt=""
											/>
											All Networks
											<Icons.check className="ml-auto" />
										</div>
										<div className="cursor-pointer h-10 px-4 flex items-center gap-3">
											<img
												src="/images/arb.png"
												className="w-6 h-6 object-contain cursor-pointer"
												alt=""
											/>
											Arbitrum
										</div>
										<div className="cursor-pointer h-10 px-4 flex items-center gap-3">
											<img
												src="/images/eth.png"
												className="w-6 h-6 object-contain cursor-pointer"
												alt=""
											/>
											Ethereum
										</div>
										<div className="cursor-pointer h-10 px-4 flex items-center gap-3">
											<img
												src="/images/polygon.png"
												className="w-6 h-6 object-contain cursor-pointer"
												alt=""
											/>
											Polygon
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>

				<div className="h-4" />

				<div className="grid grid-cols-[1fr_100px_100px_280px] h-[72px]">
					<div className="flex items-center gap-3">
						<div className="relative">
							<img
								src="/images/eth.png"
								alt=""
								className="w-10 h-10 object-contain"
							/>
							<img
								src="/images/b-eth.png"
								alt=""
								className="w-[18px] h-[18px] object-contain absolute right-[-4px] bottom-[-4px]"
							/>
						</div>
						<div>
							<div>ETH</div>
							<div className="text-xs text-secondary-text">
								Ethereum
							</div>
						</div>
					</div>

					<div className="text-right flex flex-col justify-center">
						<div>...xsd1</div>
						<div className="text-xs text-secondary-text">
							Key #1,234
						</div>
					</div>

					<div className="text-right flex flex-col justify-center">
						<div>0.12</div>
						<div className="text-xs text-secondary-text">
							$356,67
						</div>
					</div>

					<div className="flex items-center justify-end gap-2">
						<button className=" text-white bg-secondary-bg h-8 rounded justify-center font-medium py-1 px-4">
							Receive
						</button>
						<button className=" text-white bg-secondary-bg h-8 rounded justify-center font-medium py-1 px-4">
							Send
						</button>
					</div>
				</div>

				<div className="grid grid-cols-[1fr_100px_100px_280px] h-[72px]  border-t-[1px] border-secondary-bg">
					<div className="flex items-center gap-3">
						<div className="relative">
							<img
								src="/images/arb-icon.png"
								alt=""
								className="w-10 h-10 object-contain"
							/>
							<img
								src="/images/b-arb.png"
								alt=""
								className="w-[18px] h-[18px] object-contain absolute right-[-4px] bottom-[-4px]"
							/>
						</div>
						<div>
							<div>USDC</div>
							<div className="text-xs text-secondary-text">
								USD Coin
							</div>
						</div>
					</div>

					<div className="text-right flex flex-col justify-center">
						<div>...xsd1</div>
						<div className="text-xs text-secondary-text">
							Key #1,234
						</div>
					</div>

					<div className="text-right flex flex-col justify-center">
						<div>0.12</div>
						<div className="text-xs text-secondary-text">
							$356,67
						</div>
					</div>

					<div className="flex items-center justify-end gap-2">
						<button className=" text-white bg-secondary-bg h-8 rounded justify-center font-medium py-1 px-4">
							Receive
						</button>
						<button className=" text-white bg-secondary-bg h-8 rounded justify-center font-medium py-1 px-4">
							Send
						</button>
					</div>
				</div>

				<div className="grid grid-cols-[1fr_100px_100px_280px] h-[72px] border-t-[1px] border-secondary-bg">
					<div className="flex items-center gap-3">
						<div className="relative">
							<img
								src="/images/matic.png"
								alt=""
								className="w-10 h-10 object-contain"
							/>
							<img
								src="/images/b-eth.png"
								alt=""
								className="w-[18px] h-[18px] object-contain absolute right-[-4px] bottom-[-4px]"
							/>
						</div>
						<div>
							<div>MATIC</div>
							<div className="text-xs text-secondary-text">
								Polygon
							</div>
						</div>
					</div>

					<div className="text-right flex flex-col justify-center">
						<div>...xsd1</div>
						<div className="text-xs text-secondary-text">
							Key #1,234
						</div>
					</div>

					<div className="text-right flex flex-col justify-center">
						<div>0.12</div>
						<div className="text-xs text-secondary-text">
							$356,67
						</div>
					</div>

					<div className="flex items-center justify-end gap-2">
						<button className=" text-white bg-secondary-bg h-8 rounded justify-center font-medium py-1 px-4">
							Receive
						</button>
						<button className=" text-white bg-secondary-bg h-8 rounded justify-center font-medium py-1 px-4">
							Send
						</button>
					</div>
				</div>

				<div className="grid grid-cols-[1fr_100px_100px_280px] h-[72px] border-t-[1px] border-secondary-bg">
					<div className="flex items-center gap-3">
						<div className="relative">
							<img
								src="/images/uni.png"
								alt=""
								className="w-10 h-10 object-contain"
							/>
							<img
								src="/images/b-eth.png"
								alt=""
								className="w-[18px] h-[18px] object-contain absolute right-[-4px] bottom-[-4px]"
							/>
						</div>
						<div>
							<div>UNI</div>
							<div className="text-xs text-secondary-text">
								Uniswap
							</div>
						</div>
					</div>

					<div className="text-right flex flex-col justify-center">
						<div>...xsd1</div>
						<div className="text-xs text-secondary-text">
							Key #1,234
						</div>
					</div>

					<div className="text-right flex flex-col justify-center">
						<div>0.12</div>
						<div className="text-xs text-secondary-text">
							$356,67
						</div>
					</div>

					<div className="flex items-center justify-end gap-2">
						<button className=" text-white bg-secondary-bg h-8 rounded justify-center font-medium py-1 px-4">
							Receive
						</button>
						<button className=" text-white bg-secondary-bg h-8 rounded justify-center font-medium py-1 px-4">
							Send
						</button>
					</div>
				</div>
			</div>

			{/* <div className="h-full flex-1 flex-col space-y-8 flex">
				{spaceId ? (
					<>
						<Assets spaceId={spaceId} />
					</>
				) : (
					<NoSpaces />
				)}
			</div> */}

			{isSelectKeyModal && (
				<SelectKeyModal
					onHide={() => setIsSelectKeyModal(false)}
					showTransactionModal={(type) =>
						setIsShowTransactionModal({
							isShown: true,
							type: type,
						})
					}
				/>
			)}

			{isShowTransactionModal.isShown && (
				<AssetTransactionModal
					onHide={() =>
						setIsShowTransactionModal({
							isShown: false,
							type: "send",
						})
					}
					onHideAll={() => {
						setIsShowTransactionModal({
							isShown: false,
							type: "send",
						});
						setIsSelectKeyModal(false);
					}}
					type={isShowTransactionModal.type}
				/>
			)}

			{isSignTransactionModal && (
				<SignTranactionModal
					onHide={() => setIsSignTransactionModal(false)}
				/>
			)}

			{isDopositFinalModal && (
				<DepositFinalModal
					onHide={() => setIsDepositFinalModal(false)}
				/>
			)}
		</div>
	);
}
