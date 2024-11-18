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
import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import clsx from "clsx";
import DepositFinalModal from "@/features/assets/DepositFinalModal";
import { Icons } from "@/components/ui/icons-assets";
import { useAssetQueries } from "@/features/assets/hooks";
import { NewKeyButton } from "@/features/keys";
import { AddressType } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/key";
import { bigintToFloat, displayPagination } from "@/lib/math";
import { FIAT_FORMAT } from "@/hooks/useFiatConversion";
import { AssetIcon } from "@/features/assets/AssetRow";
import { useClickOutside } from "@/hooks/useClickOutside";
import { commonReducer } from "@/utils/common";
import { useModalState } from "@/features/modals/state";
import { KeysDropdownItem } from "@/features/keys/KeysDropdown";
import AssetTableRow from "@/features/assets/AssetTableRow";
import { useKeySettingsState } from "@/features/keys/state";
import { capitalize } from "@/features/modals/util";

type Currency = keyof typeof FIAT_FORMAT;

interface AssetPageState {
	keyFilter: string;
	networkFilter: string;
	isKeyDropdown: boolean;
	isNetworkDropdown: boolean;
}

export function AssetsPage() {

	const [state, dispatch] = useReducer(commonReducer<AssetPageState>, {
		keyFilter: "",
		networkFilter: "",
		isKeyDropdown: false,
		isNetworkDropdown: false,
	});

	const curr = useCurrency();
	const currency = curr.currency as Currency;
	const setCurrency = curr.setCurrency as (currency: Currency) => void;
	const formatter = FIAT_FORMAT[currency];
	const { setData: setModal } = useModalState();
	const { spaceId } = useSpaceId();
	// fixme we have a situation where balances did not fetch on this page but were ok in receive modal
	// possible caused error did cancel query update?
	const { queryKeys, queryBalances, queryPrices } = useAssetQueries(spaceId);
	const keys = queryKeys.data?.[0];

	const _results = queryBalances
		.filter((q) => Boolean(q.data?.results.length))
		.flatMap(({ data }) => {
			return data!.results.map((result) => ({
				...result,
				key: data?.key,
			}));
		});

	const results = _results.filter((item) => {
		if (state.keyFilter) {
			if (item.key?.key.id.toString() !== state.keyFilter) {
				return false;
			}
		}

		if (state.networkFilter) {
			if (item.chainName !== state.networkFilter) {
				return false;
			}
		}

		return Boolean(item.balance);
	});

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

	const [isDopositFinalModal, setIsDepositFinalModal] = useState(false);

	const keysRef = useRef<HTMLDivElement | null>(null);
	const networksRef = useRef<HTMLDivElement | null>(null);

	useClickOutside(keysRef, () =>
		dispatch({
			type: "isKeyDropdown",
			payload: false,
		}),
	);

	useClickOutside(networksRef, () =>
		dispatch({
			type: "isNetworkDropdown",
			payload: false,
		}),
	);

	const { chains, totalBalance, noAssets } = useMemo(() => {
		let noAssets = true;
		const targetDecimals = 2;
		const chains = new Set<string>();

		const totalBalance = _results.reduce((acc, item) => {
			if (item.balance) {
				noAssets = false;
			}

			const decimals = item.decimals + item.priceDecimals;
			chains.add(item.chainName);

			const usd =
				(item.balance * item.price) /
				BigInt(10) ** BigInt(decimals - targetDecimals);

			return acc + usd;
		}, BigInt(0));

		return { chains: Array.from(chains), totalBalance, noAssets };
	}, [results]);

	const noKeys = !keys?.length;

	const { data } = useKeySettingsState();
	const settings = data?.settings[state.keyFilter.toString()];
	const name = settings?.name ?? `Key #${state.keyFilter.toString()}`;
	const total = results.length;
	const perPage = 20;
	const pages = Math.ceil(total / perPage);
	const [page, setPage] = useState(0);
	const pagination = displayPagination(page, pages, 3);
	const items = results.slice(page * perPage, (page + 1) * perPage);

	useEffect(() => {
		setPage(0);
	}, [pages]);

	if (noKeys) {
		return (
			<div className="h-[calc(100vh_-_106px)] min-h-[550px] flex flex-col justify-center items-center text-center">
				<Icons.noAssetsKey className="mb-[72px] invert dark:invert-0" />

				<div className="text-5xl font-bold font-display tracking-[0.24px]">
					No Keys found
				</div>

				<div className="h-6" />

				<div className="">
					First add a key to start receiving assets
				</div>

				<div className="h-12" />

				<NewKeyButton />
			</div>
		);
	}

	return (
		<div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
			<div className="flex items-center justify-between pb-4 space-y-2">
				<div>
					<h2 className="text-5xl font-bold tracking-[0.24px]">
						Assets
					</h2>
					<p className="text-muted-foreground"></p>
				</div>
			</div>

			{/* <div className="grid grid-cols-[320px_1fr] gap-[24px]"> */}
			<div className="">
				<div className="before:content-[' '] before:bg-contain before:bg-right-bottom before:bg-no-repeat before:bg-[url('/images/asset-decor-light.png')] before:h-full before:w-[367px] before:z-[-5] before:absolute before:right-0 before:bottom-0 bg-fill-accent-secondary relative overflow-hidden flex flex-col justify-between isolate py-6 px-8 rounded-xl min-h-[220px]">
					<div className="flex items-baseline gap-[6px] select-none">
						<div className="text-2xl font-bold">
							{formatter.format(
								bigintToFloat(
									fiatConversion
										? (totalBalance *
											BigInt(10) **
											BigInt(
												fiatConversion.decimals,
											)) /
										fiatConversion.value
										: BigInt(0),
									2,
								),
							)}
						</div>

						{!noAssets ? (
							<Select
								value={currency}
								onValueChange={setCurrency}
							>
								<SelectTrigger className="flex gap-[4px] w-fit bg-[transparent] border-0 outline-none focus:!otline-none shadow-none focus:!shadow-none p-0 !shadow-transparent text-sm text-muted-foreground h-auto select-none">
									<SelectValue
										placeholder="Currency"
										className=""
									/>
								</SelectTrigger>
								<SelectContent className="select-none" >
									<SelectGroup>
										<SelectItem value="usd">USD</SelectItem>
										<SelectItem value="eur">EUR</SelectItem>
										<SelectItem value="gbp">GBP</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						) : null}
					</div>

					<div className="grid grid-cols-2 gap-2 max-w-[320px]">
						<button
							className="w-full text-black bg-white flex items-center h-10 rounded gap-2 justify-center text-base font-medium"
							onClick={setModal.bind(null, {
								type: "receive",
								params: {},
							})}
						>
							<Icons.arrowDown />
							Receive
						</button>
						{!noAssets ? (
							<button
								onClick={() => {
									const item = results[0] ?? _results[0];

									setModal({
										type: "send",
										params: {
											chainName: item.chainName,
											keyResponse: item.key,
											token: item.token,
											type: item.type.startsWith(
												"eip155:",
											)
												? AddressType.ADDRESS_TYPE_ETHEREUM
												: AddressType.ADDRESS_TYPE_OSMOSIS,
										},
									});
								}}
								className="w-full text-muted-foreground flex items-center h-10 rounded gap-2 justify-center text-base font-medium"
							>
								<Icons.send />
								Send
							</button>
						) : null}
					</div>
				</div>
				{/* <div className="bg-card  rounded-xl min-h-[220px] border-border-edge border-[1px] py-6 px-8">
					<div className="flex justify-between items-center">
						<div className="text-2xl font-bold tracking-[0.12px]">
							Performance
						</div>
						<div className="flex gap-2">
							<div
								onClick={() => setGraphInterval(7)}
								className={clsx(
									"text-xs text-label-accent py-1 px-2 rounded-3xl cursor-pointer ease-out duration-200",
									graphInterval == 7 &&
										"bg-fill-accent-secondary pointer-events-none",
								)}
							>
								7D
							</div>
							<div
								onClick={() => setGraphInterval(30)}
								className={clsx(
									"text-xs text-label-accent py-1 px-2 rounded-3xl cursor-pointer ease-out duration-200",
									graphInterval == 30 &&
										"bg-fill-accent-secondary pointer-events-none",
								)}
							>
								1M
							</div>
							<div
								onClick={() => setGraphInterval(90)}
								className={clsx(
									"text-xs text-label-accent py-1 px-2 rounded-3xl cursor-pointer ease-out duration-200",
									graphInterval == 90 &&
										"bg-fill-accent-secondary pointer-events-none",
								)}
							>
								3M
							</div>
						</div>
					</div>

					<img
						src="/images/graph.png"
						alt=""
						className="h-[107px] object-contain"
					/>
				</div> */}
			</div>

			<div className="bg-card  rounded-xl border-border-edge border-[1px] px-8 py-6">
				{noAssets ? (
					<div className="min-h-[280px] flex flex-col items-center justify-center text-center">
						<div className="text-2xl font-bold tracking-[0.12px] mb-1">
							No Assets yet
						</div>
						<div className="text-muted-foreground">
							Deposit assets to SpaceWard
						</div>
						<button
							className="text-black mt-6 bg-fill-primary h-[40px] text-label-invert rounded justify-center text-base font-semibold py-1 px-5 duration-300 ease-out hover:bg-fill-accent-primary"
							onClick={setModal.bind(null, {
								type: "receive",
								params: {},
							})}
						>
							Receive
						</button>
					</div>
				) : (
					<div>
						<div className="flex justify-between items-center">
							<div className="text-2xl font-bold tracking-[0.12px]">
								Balances
							</div>

							<div className="flex gap-2">
								<div className="gap-2">
									<div
										ref={keysRef}
										onClick={() =>
											dispatch({
												type: "isKeyDropdown",
												payload: !state.isKeyDropdown,
											})
										}
										className="cursor-pointer group relative h-8 rounded-2xl bg-fill-quaternary py-2 px-3 text-xs fill-quaternary flex items-center gap-[2px]"
									>
										<div className="max-w-[124px] whitespace-nowrap overflow-hidden text-ellipsis ">
											{state.keyFilter
												? name
												: "All Keys"}
										</div>
										<Icons.chevronDown
											className={clsx(
												"invert dark:invert-0",
												{
													"rotate-180":
														state.isKeyDropdown,
												},
											)}
										/>
										{state.isKeyDropdown && (
											<div className="w-[248px] bg-fill-quaternary text-sm rounded-lg  py-2 absolute z-10 bottom-[-8px] right-0 whitespace-nowrap backdrop-blur-[30px] translate-y-[100%] ">
												<div
													className="cursor-pointer h-10 px-4 flex items-center gap-3"
													onClick={() =>
														dispatch({
															type: "keyFilter",
															payload: "",
														})
													}
												>
													<img
														src="/images/key.png"
														className="w-6 h-6 object-contain cursor-pointer invert dark:invert-0"
														alt=""
													/>
													All Keys
													{!state.keyFilter && (
														<Icons.check className="ml-auto invert dark:invert-0" />
													)}
												</div>
												{keys?.map((item) => (
														<KeysDropdownItem
															keyResponse={item}
															onClick={() => {
																dispatch({
																	type: "keyFilter",
																	payload:
																		item.key.id.toString(),
																});
															}}
															isActive={
																state.keyFilter ===
																item.key.id.toString()
															}
														/>
													),
												)}
											</div>
										)}
									</div>
								</div>

								<div className="gap-2">
									<div
										ref={networksRef}
										onClick={() =>
											dispatch({
												type: "isNetworkDropdown",
												payload:
													!state.isNetworkDropdown,
											})
										}
										className="cursor-pointer group relative h-8 rounded-2xl bg-fill-quaternary py-2 px-3 text-xs  flex items-center gap-[2px]"
									>
										{state.networkFilter
											? capitalize(state.networkFilter)
											: "All Networks"}

										<Icons.chevronDown
											className={clsx(
												"invert dark:invert-0",
												state.isNetworkDropdown
													? "rotate-180"
													: "",
											)}
										/>
										{state.isNetworkDropdown && (
											<div className="w-[248px] bg-fill-quaternary text-sm rounded-lg  py-2 absolute z-10 bottom-[-8px] right-0 whitespace-nowrap backdrop-blur-[30px] translate-y-[100%] ">
												<div
													onClick={() =>
														dispatch({
															type: "networkFilter",
															payload: "",
														})
													}
													className="cursor-pointer h-10 px-4 flex items-center gap-3"
												>
													<img
														src="/images/networks.png"
														className="w-6 h-6 object-contain cursor-pointer"
														alt=""
													/>
													All Networks
													{!state.networkFilter && (
														<Icons.check className="ml-auto invert dark:invert-0" />
													)}
												</div>
												{chains.map((chainName) => {
													return (
														<div
															onClick={() =>
																dispatch({
																	type: "networkFilter",
																	payload:
																		chainName,
																})
															}
															className="cursor-pointer h-10 px-4 flex items-center gap-3"
															key={chainName}
														>
															<AssetIcon
																type="network"
																value={
																	chainName
																}
																className="w-6 h-6 object-contain cursor-pointer"
															/>
															{capitalize(
																chainName,
															)}

															{state.networkFilter ===
																chainName && (
																	<Icons.check className="ml-auto" />
																)}
														</div>
													);
												})}
											</div>
										)}
									</div>
								</div>
							</div>
						</div>

						<div className="h-4" />

						{items.map(({ key, ...item }) => {
							return (
								<AssetTableRow
									item={item}
									keyResponse={key}
									key={`${item.token}:${item.chainName}:${item.address}`}
								/>
							);
						})}

						<div className="h-4" />
						{pagination.length > 1 ? (
							<div className="flex items-center px-2">
								{pagination.map((p, i) => {
									return (
										<div
											className={clsx({
												"ml-auto": !i,
											})}
											key={p}
										>
											{i > 0 &&
												p - 1 !== pagination[i - 1] ? (
												<span className="px-1">
													...
												</span>
											) : null}
											<span
												className={clsx("px-1", {
													"underline cursor-pointer":
														page !== p,
												})}
												onClick={() => {
													if (page !== p) {
														setPage(p);
													}
												}}
											>
												{p + 1}
											</span>
										</div>
									);
								})}
							</div>
						) : null}
					</div>
				)}
			</div>

			{isDopositFinalModal && (
				<DepositFinalModal
					onHide={() => setIsDepositFinalModal(false)}
				/>
			)}
		</div>
	);
}
