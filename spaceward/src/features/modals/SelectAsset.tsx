import clsx from "clsx";
import { AddressType } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/key";
import { useMemo, useState } from "react";
import { Icons } from "@/components/ui/icons-assets";
import { useSpaceId } from "@/hooks/useSpaceId";
import AssetRow, { AssetIcon } from "../assets/AssetRow";
import { useAssetQueries } from "../assets/hooks";
import type { SelectAssetParams } from "./types";
import { useModalState } from "./state";
import { capitalize } from "./util";

const Network = ({ chainName }: { chainName: string }) => {
	return <AssetIcon type="network" value={chainName} className="w-6 h-6" />;
};

export default function SelectAssetModal(props: SelectAssetParams) {
	const { setData: setModal } = useModalState();
	const { spaceId } = useSpaceId();
	const [searchValue, setSearchValue] = useState("");
	const [currentNetwork, setCurrentNetwork] = useState("");
	const { queryBalances } = useAssetQueries(spaceId);

	const _results = queryBalances
		.filter((result) => {
			if (result.data?.key.key.id !== props.keyResponse?.key.id) {
				return false;
			}

			return true;
		})
		.flatMap((query) => query.data?.results ?? []);

	const { chains, results } = useMemo(() => {
		const chainNames = new Set<string>();

		const results = _results.filter(({ balance, chainName, token }) => {
			if (!balance) {
				return false;
			}

			chainNames.add(chainName);

			if (searchValue) {
				if (!token.includes(searchValue.toUpperCase())) {
					return false;
				}
			}

			if (currentNetwork) {
				if (chainName !== currentNetwork) {
					return false;
				}
			}

			return true;
		});

		return { chains: Array.from(chainNames), results };
	}, [_results, currentNetwork, searchValue]);

	const emptyResults = !results.length;
	const [networksDropdown, setNetworksDropdown] = useState(false);

	return (
		<div className="max-w-[520px] w-[520px] text-center tracking-wide pb-5">
			<div className="font-bold text-5xl mb-12 leading-[56px]">
				Select an asset
			</div>

			<div className="relative h-[60px] z-50 text-left bg-secondary-bg rounded-lg pl-4 pr-3 flex items-center gap-3">
				<Icons.search className="invert dark:invert-0" />
				<div>
					{searchValue && (
						<label
							className="text-muted-foreground text-xs"
							htmlFor="address"
						>
							Search asset
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
						placeholder="Search asset"
					/>
				</div>

				{searchValue && (
					<button
						type="button"
						className="p-1 ml-auto"
						onClick={() => setSearchValue("")}
					>
						<Icons.xCircle />
					</button>
				)}
			</div>

			<div className="mt-12 relative z-20">
				<div className="flex justify-between items-center">
					<div className="text-2xl font-bold">
						{searchValue ? "Search results" : "Your assets"}
					</div>

					<div className="relative">
						<div
							onClick={() =>
								setNetworksDropdown(!networksDropdown)
							}
							className=" bg-secondary-bg cursor-pointer rounded-[20px] flex gap-[6px] p-1 pr-2"
						>
							<div className="flex">
								{currentNetwork ? (
									<Network chainName={currentNetwork} />
								) : (
									chains
										.slice(0, 3)
										.map((chainName, key) => (
											<Network
												key={key}
												chainName={chainName}
											/>
										))
								)}
							</div>

							{currentNetwork
								? capitalize(currentNetwork)
								: "All Networks"}

							<Icons.chevronDown
								className={clsx(
									"w-6 h-6 -ml-2 ease-in duration-200",
									networksDropdown && "rotate-180",
								)}
							/>
						</div>

						{networksDropdown && (
							<div className="absolute right-0 -bottom-2 translate-y-full bg-secondary-bg py-[6px] px-4 min-w-[248px] rounded-xl backdrop-blur-[20px]">
								<div
									onClick={() => {
										setNetworksDropdown(false);
										setCurrentNetwork("");
									}}
									className="flex cursor-pointer items-center text-sm gap-3 border-b-[1px] border-muted-foreground py-[8px] mb-1"
								>
									All Networks
									{!currentNetwork && (
										<Icons.check className="ml-auto" />
									)}
								</div>
								{chains.map((chainName) => {
									return (
										<div
											onClick={() => {
												setNetworksDropdown(false);
												setCurrentNetwork(chainName);
											}}
											className="flex cursor-pointer items-center text-sm gap-3 py-[8px]"
										>
											<Network chainName={chainName} />
											{capitalize(chainName)}

											{currentNetwork === chainName && (
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

			{emptyResults ? (
				<div className="mt-6 bg-secondary-bg rounded-lg py-4 px-3 min-h-[200px] flex flex-col items-center justify-center text-center gap-3">
					<Icons.emptySearch className="mb-2" />
					<div className="text-2xl font-bold">No assets found</div>
					<button
						onClick={() => setSearchValue("")}
						className="h-8 px-2 flex items-center justify-center text-muted-foreground cursor-pointer font-semibold"
					>
						Clear Filters
					</button>
				</div>
			) : (
				<div className="mt-6 bg-secondary-bg rounded-lg py-4 px-3">
					{results.map((item, key) => {
						return (
							<AssetRow
								asset={item}
								key={key}
								onClick={setModal.bind(null, {
									type: "send",
									params: {
										keyResponse: props.keyResponse,
										chainName: item.chainName,
										token: item.token,
										type: item.type.startsWith("eip155:")
											? AddressType.ADDRESS_TYPE_ETHEREUM
											: AddressType.ADDRESS_TYPE_OSMOSIS,
									},
								})}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
}
