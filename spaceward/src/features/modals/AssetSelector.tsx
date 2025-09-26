import clsx from "clsx";
import { useMemo, useRef, useState } from "react";
import { AssetIcon } from "@/features/assets/AssetRow";
import { Icons } from "@/features/dashboard/icons";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Icons as IconsAssets } from "@/components/ui/icons-assets";
import { bigintToFixed, bigintToFloat } from "@/lib/math";
import useFiatConversion from "@/hooks/useFiatConversion";
import { useModalState } from "./state";
import { useAssetQueries } from "../assets/hooks";
import { capitalize } from "./util";
import { KeyModel } from "@/hooks/query/types";

const Network = ({
	className,
	color,
	network,
}: {
	className?: string;
	color?: boolean;
	network: string;
}) => {
	return (
		<AssetIcon
			type={color ? "network" : "network-transparent"}
			value={network}
			className={clsx(className, "w-4 h-4 object-contain")}
		/>
	);
};

const AssetSelector = ({
	onClose,
	spaceId,
	selectedKey,
}: {
	onClose: () => void;
	spaceId: string;
	selectedKey?: KeyModel;
}) => {
	const [searchValue, setSearchValue] = useState("");
	const { setData: setModal, data } = useModalState();
	const { formatter, fiatConversion } = useFiatConversion();
	const [isNetworkDropdown, setIsNetworkDropdown] = useState(false);
	const networksRef = useRef<HTMLDivElement | null>(null);
	useClickOutside(networksRef, () => setIsNetworkDropdown(false));

	const { queryBalances } = useAssetQueries(spaceId);

	const _results = queryBalances
		.filter(
			({ data }) =>
				data && selectedKey && data.key.key.id === selectedKey.key.id,
		)
		.flatMap(({ data }) => data!.results);

	const [filterByChain, setFilterByChain] = useState<string | undefined>();

	const { chains, results, withBalance } = useMemo(() => {
		const chainNames = new Set<string>();
		const withBalance: Record<
			string,
			Record<string, boolean | undefined> | undefined
		> = {};

		const results = _results.filter(({ balance, chainName, token }) => {
			chainNames.add(chainName);

			if (searchValue) {
				if (!token.includes(searchValue.toUpperCase())) {
					return false;
				}
			}

			if (filterByChain) {
				if (chainName !== filterByChain) {
					return false;
				}
			}

			if (balance) {
				if (!withBalance[chainName]) {
					withBalance[chainName] = {};
				}

				withBalance[chainName][token] = true;
			}

			return true;
		});

		return {
			chains: Array.from(chainNames),
			results,
			withBalance,
		};
	}, [_results, filterByChain, searchValue]);

	return (
		<div className="px-8 flex flex-col gap-6 max-h">
			<div className="flex items-center justify-between relative z-30">
				<button onClick={onClose} className="p-1 ">
					<Icons.arrLeft className="invert dark:invert-0" />
				</button>

				<div className="relative" ref={networksRef}>
					<div
						onClick={() => setIsNetworkDropdown(!isNetworkDropdown)}
						className="flex cursor-pointer items-center gap-[6px] p-1 pr-2 bg-fill-quaternary rounded-[20px] relative z-30"
					>
						{filterByChain ? (
							<Network
								color
								network={filterByChain}
								className="ml-1"
							/>
						) : (
							<div className="flex items-center">
								{chains.slice(0, 3).map((chain, i) => (
									<Network
										color
										network={chain}
										key={chain}
										className={clsx({ "ml-1": !i })}
									/>
								))}
							</div>
						)}

						{filterByChain
							? capitalize(filterByChain)
							: "All Networks"}
						<Icons.chevronDown
							className={
								isNetworkDropdown
									? "rotate-180 invert dark:invert-0"
									: "invert dark:invert-0 "
							}
						/>
					</div>
					{isNetworkDropdown && (
						<div className="w-60 bg-fill-quaternary text-sm rounded-lg  py-2 absolute z-10 bottom-[-8px] right-0 whitespace-nowrap backdrop-blur-[30px] translate-y-[100%] ">
							<div
								onClick={() => {
									setIsNetworkDropdown(false);
									setFilterByChain("");
								}}
								className="cursor-pointer h-10 px-4 flex items-center gap-3"
							>
								<div className="w-6 h-6 object-contain cursor-pointer" />
								All Networks
								{!filterByChain && (
									<IconsAssets.check className="ml-auto invert dark:invert-0" />
								)}
							</div>
							{chains.map((chain) => {
								return (
									<div
										onClick={() => {
											setIsNetworkDropdown(false);
											setFilterByChain(chain);
										}}
										className="cursor-pointer h-10 px-4 flex items-center gap-3"
										key={chain}
									>
										<AssetIcon
											type="network-transparent"
											value={chain}
											className="w-6 h-6 object-contain cursor-pointer invert dark:invert-0"
										/>
										{capitalize(chain)}

										{chain === filterByChain && (
											<IconsAssets.check className="ml-auto" />
										)}
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>

			<div className="relative h-[60px] text-left bg-secondary-bg rounded-lg pl-4 pr-3 flex items-center gap-3 z-10">
				<IconsAssets.search className="invert dark:invert-0" />
				<div>
					{searchValue && (
						<label
							className="text-muted-foreground text-xs"
							htmlFor="address"
						>
							Name
						</label>
					)}
					<input
						className={clsx(
							"block w-full  bg-transparent outline-none foces:outline-none",
							searchValue && "-translate-y-[3px]",
						)}
						id="address"
						onChange={(e) => setSearchValue(e.target.value)}
						value={searchValue}
						placeholder="Name"
					/>
				</div>

				{searchValue && (
					<button
						type="button"
						className="p-1 ml-auto invert dark:invert-0"
						onClick={() => setSearchValue("")}
					>
						<IconsAssets.xCircle />
					</button>
				)}
			</div>

			<div>
				{!searchValue && Object.keys(withBalance).length ? (
					<div className="bg-fill-quaternary rounded-2xl p-4 no-scrollbar overflow-scroll max-h-64">
						<div className="font-bold mb-5 text-xl">
							Your assets
						</div>
						<div className="flex flex-col gap-4">
							{results
								.filter(
									({ token, chainName }) =>
										withBalance[chainName]?.[token],
								)
								.map((item, key) => {
									return (
										<div
											className="py-1 cursor-pointer flex items-center gap-3"
											key={key}
											onClick={() => {
												setModal({
													params: {
														...data?.params,
														token: item.token,
														chainName:
															item.chainName,
													},
												});

												onClose();
											}}
										>
											<AssetIcon
												type="token"
												value={item.token}
												logo={item.logo}
												className="w-10 h-10 "
											/>

											<div>
												<div>{item.token}</div>
												<div className="text-label-secondary text-xs">
													{item.title}
												</div>
											</div>

											<div className="text-right ml-auto mr-[52px]">
												<div>
													{bigintToFixed(
														item.balance,
														{
															ceil: true,
															decimals:
																item.decimals,
															display: 2,
															format: true,
														},
													)}
												</div>
												<div className="text-label-secondary text-xs">
													{formatter.format(
														bigintToFloat(
															fiatConversion
																? (item.balance *
																	item.price *
																	BigInt(
																		10,
																	) **
																	BigInt(
																		fiatConversion.decimals,
																	)) /
																fiatConversion.value
																: BigInt(0),
															item.decimals +
															item.priceDecimals,
														),
													)}
												</div>
											</div>

											<div className="h-6 border-[1px] border-border-secondary border-solid flex items-center gap-1 text-xs text-label-secondary rounded p-1 pr-2 w-20">
												<Network
													network={item.chainName}
													className="invert dark:invert-0"
												/>
												<span className="max-w-14 text-ellipsis overflow-hidden">
													{item.chainName
														.charAt(0)
														.toUpperCase() +
														item.chainName.slice(1)}
												</span>
											</div>
										</div>
									);
								})}
						</div>
					</div>
				) : (
					<></>
				)}

				<div className="flex flex-col mt-4 no-scrollbar overflow-scroll max-h-56 -mb-4 pb-4">
					{results
						.filter(
							({ chainName, token }) =>
								!withBalance[chainName]?.[token],
						)
						.map((item, key) => {
							return (
								<div
									className="p-4 border-t-[1px] border-solid border-border-quaternary first:border-[0px] cursor-pointer flex items-center gap-3"
									key={key}
									onClick={() => {
										setModal({
											params: {
												...data?.params,
												token: item.token,
												chainName: item.chainName,
											},
										});

										onClose();
									}}
								>
									<AssetIcon
										type="token"
										value={item.token}
										logo={item.logo}
										className="w-10 h-10"
									/>

									<div>
										<div>{item.token}</div>
										<div className="text-label-secondary text-xs">
											{item.title}
										</div>
									</div>

									<div className="h-6 border ml-auto border-border-secondary border-solid flex items-center gap-1 text-xs text-label-secondary rounded p-1 pr-2 min-w-20">
										<Network
											network={item.chainName}
											className="invert dark:invert-0"
										/>
										<span className="max-w-14 text-ellipsis overflow-hidden">
											{item.chainName
												.charAt(0)
												.toUpperCase() +
												item.chainName.slice(1)}
										</span>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
};

export default AssetSelector;
