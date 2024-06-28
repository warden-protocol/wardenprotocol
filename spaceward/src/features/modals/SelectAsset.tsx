import clsx from "clsx";
import { Icons } from "@/components/ui/icons-assets";
import { useState } from "react";
import AssetRow from "../assets/AssetRow";

const ASSETS = [
	{
		name: "ETH",
		fullName: "Ethereum",
		balance: 1234.45,
		icon: "/images/eth.png",
		network: "/images/b-eth.png",
	},
	{
		name: "USDC",
		fullName: "USD Coin",
		balance: 120,
		icon: "/images/arb-icon.png",
		network: "/images/b-arb.png",
	},
	{
		name: "Galxe",
		fullName: "Gal",
		balance: undefined,
		icon: "/images/galaxe.png",
		network: "/images/b-arb.png",
	},
];

export default function SelectAssetModal() {
	const [searchValue, setSearchValue] = useState("");
	const [emptyResults, setEmptyResults] = useState(false);
	const [networksDropdown, setNetworksDropdown] = useState(false);

	return (
		<div className="max-w-[520px] w-[520px] text-center tracking-wide pb-5">
			<div className="font-bold text-5xl mb-12 leading-[56px]">
				Select an asset
			</div>

			<div className="relative h-[60px] z-50 text-left bg-secondary-bg rounded-lg pl-4 pr-3 flex items-center gap-3">
				<Icons.search />
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
								<Icons.ethBadge className=" w-6 h-6" />
								<Icons.arbBadge className="mx-[-8px] w-6 h-6" />
								<Icons.polygonBadge className=" w-6 h-6" />
							</div>

							<div>All Networks</div>

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
									onClick={() => setNetworksDropdown(false)}
									className="flex cursor-pointer items-center text-sm gap-3 border-b-[1px] border-muted-foreground py-[8px] mb-1"
								>
									All Networks
									<Icons.check className="ml-auto" />
								</div>

								<div
									onClick={() => setNetworksDropdown(false)}
									className="flex cursor-pointer items-center text-sm gap-3 py-[8px]"
								>
									<Icons.ethRound className="w-6 h-6" />
									Ethereum
								</div>
								<div
									onClick={() => setNetworksDropdown(false)}
									className="flex cursor-pointer items-center text-sm gap-3 py-[8px]"
								>
									<img
										src="/images/arb-icon.png"
										alt=""
										className="w-6 h-6"
									/>
									Arbitrum
								</div>
								<div
									onClick={() => setNetworksDropdown(false)}
									className="flex cursor-pointer items-center text-sm gap-3 py-[8px]"
								>
									<img
										src="/images/polygon.png"
										alt=""
										className="w-6 h-6"
									/>
									Polygon
								</div>
								<div
									onClick={() => setNetworksDropdown(false)}
									className="flex cursor-pointer items-center text-sm gap-3 py-[8px]"
								>
									<img
										src="/images/polygon.png"
										alt=""
										className="w-6 h-6"
									/>
									Polygon
								</div>
								<div
									onClick={() => setNetworksDropdown(false)}
									className="flex cursor-pointer items-center text-sm gap-3 py-[8px]"
								>
									<img
										src="/images/polygon.png"
										alt=""
										className="w-6 h-6"
									/>
									Polygon
								</div>
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
					{ASSETS.map((item, key) => (
						<AssetRow asset={item} key={key} />
					))}
				</div>
			)}
		</div>
	);
}
