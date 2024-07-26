import {
	TokenIcons,
	NetworkIconsTransparent,
} from "@/components/ui/icons-crypto";
import { AssetPlaceholder } from "@/features/assets/AssetRow";
import { Icons } from "@/features/dashboard/icons";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useMemo, useRef, useState } from "react";
import { Icons as IconsAssets } from "@/components/ui/icons-assets";
import { BalanceEntry } from "@/features/assets/types";
import clsx from "clsx";
import { bigintToFixed, bigintToFloat } from "@/lib/math";
import { useCurrency } from "@/hooks/useCurrency";
import { FIAT_FORMAT } from "@/hooks/useFiatConversion";
import { useAssetQueries } from "@/features/assets/hooks";
import { useModalState } from "../state";

type Currency = keyof typeof FIAT_FORMAT;

const SelectAsset = ({
	hideSelectAsset,
	currentNetwork,
	chains,
	changeNetwork,
	results,
	withBalance,
	spaceId,
	changeSearchValue,
	searchValue,
}: {
	hideSelectAsset: () => void;
	currentNetwork: string;
	chains: string[];
	changeNetwork: (network: string) => void;
	results: BalanceEntry[];
	withBalance: string[];
	spaceId: string;
	changeSearchValue: (value: string) => void;
	searchValue: string;
}) => {
	const { setData: setModal, data } = useModalState();
	const curr = useCurrency();
	const [isNetworkDropdown, setIsNetworkDropdown] = useState(false);

	const networksRef = useRef<HTMLDivElement | null>(null);

	useClickOutside(networksRef, () => setIsNetworkDropdown(false));

	const currency = curr.currency as Currency;
	const formatter = FIAT_FORMAT[currency];

	const { queryPrices } = useAssetQueries(spaceId);

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

	function networkLogo(network: string) {
		const Network = NetworkIconsTransparent[network] ?? AssetPlaceholder;
		return <Network className="w-4 h-4 object-contain" />;
	}

	return (
		<div className="px-8 flex flex-col gap-6">
			<div className="flex items-center justify-between relative z-30">
				<button onClick={hideSelectAsset} className="p-1">
					<Icons.arrLeft />
				</button>

				<div className="relative" ref={networksRef}>
					<div
						onClick={() => setIsNetworkDropdown(!isNetworkDropdown)}
						className="flex cursor-pointer items-center gap-[6px] p-1 pr-2 bg-fill-quaternary rounded-[20px] relative z-30"
					>
						{networkLogo(currentNetwork)}

						{currentNetwork ? currentNetwork : "All Networks"}
						<Icons.chevronDown
							className={isNetworkDropdown ? "rotate-180" : ""}
						/>
					</div>
					{isNetworkDropdown && (
						<div className="w-[248px] bg-fill-quaternary text-sm rounded-lg  py-2 absolute z-10 bottom-[-8px] right-0 whitespace-nowrap backdrop-blur-[30px] translate-y-[100%] ">
							{chains.map((chainName) => {
								const Network =
									NetworkIconsTransparent[chainName] ??
									AssetPlaceholder;
								return (
									<div
										onClick={() => {
											setIsNetworkDropdown(false);
											changeNetwork(chainName);
										}}
										className="cursor-pointer h-10 px-4 flex items-center gap-3"
										key={chainName}
									>
										<Network className="w-6 h-6 object-contain cursor-pointer" />
										{chainName}

										{currentNetwork === chainName && (
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
						onChange={(e) => changeSearchValue(e.target.value)}
						value={searchValue}
						placeholder="Name"
					/>
				</div>

				{searchValue && (
					<button
						type="button"
						className="p-1 ml-auto"
						onClick={() => changeSearchValue("")}
					>
						<IconsAssets.xCircle />
					</button>
				)}
			</div>

			<div>
				{!searchValue &&
				results.filter(({ token }) => withBalance.includes(token))
					.length ? (
					<div className="bg-fill-quaternary rounded-2xl p-4 no-scrollbar overflow-scroll max-h-[280px]">
						<div className="font-bold mb-5 text-xl">
							Your assets
						</div>
						<div className="flex flex-col gap-4">
							{results
								.filter(({ token }) =>
									withBalance.includes(token),
								)
								.map((item, key) => {
									const Token =
										TokenIcons[item.token] ??
										AssetPlaceholder;
									return (
										<div
											className="py-1 cursor-pointer flex items-center gap-3"
											key={key}
											onClick={() => {
												setModal({
													params: {
														...data?.params,
														token: item.token,
													},
												});
												hideSelectAsset();
											}}
										>
											<Token className="w-10 h-10" />

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

											<div className="h-6 border-[1px] border-border-secondary border-solid flex items-center gap-1 text-xs text-label-secondary rounded p-1 pr-2">
												{networkLogo(item.chainName)}
												{item.chainName
													.charAt(0)
													.toUpperCase() +
													item.chainName.slice(1)}
											</div>
										</div>
									);
								})}
						</div>
					</div>
				) : (
					<></>
				)}

				<div className="flex flex-col mt-4 no-scrollbar overflow-scroll max-h-[240px] -mb-4 pb-4">
					{results.map((item, key) => {
						const Token =
							TokenIcons[item.token] ?? AssetPlaceholder;
						return (
							<div
								className="p-4 border-t-[1px] border-solid border-border-quaternary first:border-[0px] cursor-pointer flex items-center gap-3"
								key={key}
								onClick={() => {
									setModal({
										params: {
											...data?.params,
											token: item.token,
										},
									});
									hideSelectAsset();
								}}
							>
								<Token className="w-10 h-10" />

								<div>
									<div>{item.token}</div>
									<div className="text-label-secondary text-xs">
										{item.title}
									</div>
								</div>

								<div className="h-6 border-[1px] ml-auto border-border-secondary border-solid flex items-center gap-1 text-xs text-label-secondary rounded p-1 pr-2">
									{networkLogo(item.chainName)}
									{item.chainName.charAt(0).toUpperCase() +
										item.chainName.slice(1)}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default SelectAsset;
