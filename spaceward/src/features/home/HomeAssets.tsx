import useWardenWardenV1Beta2 from "@/hooks/useWardenWardenV1Beta2";
import { Skeleton } from "@/components/ui/skeleton";
import AddressAvatar from "@/components/AddressAvatar";
import { WalletType } from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden.v1beta2/rest";
import { ethers } from "ethers";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { MoveUpRight, KeyIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useSpaceId } from "@/hooks/useSpaceId";
import { NewKeyButton } from "@/features/keys";
import { ReceiveAssetButton } from "@/features/assets";
import { Copy } from "@/components/ui/copy";
// import { fromBech32, toBech32 } from "@cosmjs/encoding";
import { Fragment, useMemo } from "react";

const url = "https://rpc2.sepolia.org";
const provider = new ethers.JsonRpcProvider(url);

async function getEthBalance(address: string) {
	const balance = await provider.getBalance(address);
	return balance;
}

export function HomeAssets() {
	const { spaceId } = useSpaceId();

	const { QueryKeysBySpaceId } = useWardenWardenV1Beta2();
	const query = QueryKeysBySpaceId(
		{
			derive_wallets: WalletType.WALLET_TYPE_ETH,
			space_id: spaceId,
		},
		{
			enabled: !!spaceId,
		},
		10,
	);

	// todo would be great to query all supported wallet types
	const queryCosmos = QueryKeysBySpaceId(
		{
			derive_wallets: WalletType.WALLET_TYPE_OSMOSIS,
			space_id: spaceId,
		},
		{
			enabled: !!spaceId,
		},
		10,
	);

	if (query.status === "loading") {
		return (
			<div className="flex h-60 flex-col space-y-1 items-center place-content-center">
				<span className="text-muted-foreground">Loading...</span>
			</div>
		);
	}

	if (query.data?.pages[0].keys?.length === 0) {
		return (
			<div className="flex h-60 flex-col space-y-1 items-center place-content-center">
				<KeyIcon className="h-10 w-10" />
				<span className="pt-4">No keys found in this space</span>
				<span className="text-muted-foreground text-sm pb-4">
					Add a key to start receiving assets
				</span>
				<NewKeyButton />
			</div>
		);
	}

	return (
		<>
			{query.data?.pages.flatMap((page, i) => {
				return page.keys?.map((key, ii) => {
					return (
						<div className="flex flex-col border m-4 rounded-lg">
							<div>
								<div className="space-y-3">
									{key.wallets?.map((wallet, iii) => {
										// fixme
										const cosmos =
											queryCosmos.data?.pages[i].keys?.[
												ii
											].wallets?.[iii];

										return (
											<Fragment key={wallet.address}>
												<Address
													address={
														wallet.address || ""
													}
													key_id={key.key?.id || ""}
													type={
														wallet.type
															? WalletType[
																	wallet.type
																]
															: undefined
													}
												/>
												<Address
													address={
														cosmos?.address || ""
													}
													key_id={key.key?.id || ""}
													type={
														cosmos?.type
															? WalletType[
																	cosmos.type
																]
															: undefined
													}
												/>
											</Fragment>
										);
									})}
								</div>
							</div>
						</div>
					);
				});
			})}
		</>
	);
}

const isCosmosWallet = (type?: WalletType) =>
	type &&
	[WalletType.WALLET_TYPE_CELESTIA, WalletType.WALLET_TYPE_OSMOSIS].includes(
		type,
	);

function Address(address: {
	address: string;
	key_id: string;
	type?: WalletType;
}) {
	return (
		<div className="">
			<div className="py-1 hover:no-underline border-0 font-normal font-sans">
				<div className="flex flex-col md:flex-row justify-between w-full mr-4 gap-4 p-4">
					<div className="flex flex-row items-center gap-4">
						<AddressAvatar seed={address.address} />
						<div className="font-sans flex flex-col text-left">
							<span className="text-muted-foreground text-xs">
								Wallet Address
							</span>
							<div className="flex flex-row gap-2 items-center">
								<Copy value={address.address} split={true} />
							</div>
						</div>
					</div>
					<div className="flex flex-row items-center">
						<ReceiveAssetButton address={address.address} />
					</div>
				</div>
			</div>
			<div>
				<div className="space-y-4">
					{address.type === WalletType.WALLET_TYPE_ETH ? (
						<Sepolia
							address={address.address}
							key_id={address.key_id}
						/>
					) : isCosmosWallet(address.type) ? (
						<CosmosLike
							address={address.address}
							key_id={address.key_id}
						/>
					) : null}
				</div>
			</div>
		</div>
	);
}

function CosmosLike({ address }: { address: string; key_id: string }) {
	// TODO show osmosis balance
	return <div style={{ display: "none " }}>{address}</div>;
}

function Sepolia(address: { address: string; key_id: string }) {
	const query = useQuery({
		queryKey: ["eth-balance", address.address],
		queryFn: () => getEthBalance(address.address || "0"),
	});

	if (query.status === "loading") {
		return (
			<div className="flex flex-col md:flex-row justify-between px-4 py-4 border-t">
				<div className="flex flex-row gap-4 items-center min-w-72">
					<Skeleton className="h-10 w-10 rounded-full" />
					<Skeleton className="h-4 w-[200px]" />
				</div>
				<div className="flex flex-row gap-4 items-center w-20">
					<Skeleton className="h-4 w-[50px]" />
				</div>
			</div>
		);
	}

	const eth = ethers.formatEther(query?.data || 0);

	return (
		<div className="flex flex-col md:flex-row justify-between gap-4 p-4 border-t">
			<div className="flex flex-row gap-4 items-center">
				<div className="bg-white rounded-full w-8 h-8 overflow-clip p-1 flex items-center place-content-center">
					<img
						src="/logos/sepolia.png"
						alt="Sepolia"
						className="w-auto h-6"
					/>
				</div>
				<div className="flex flex-col">
					<span className="text-muted-foreground text-xs">
						Sepolia Ether
					</span>
					<span>{eth} ETH</span>
				</div>
			</div>
			<div>
				<Button
					size="sm"
					variant="default"
					className="gap-2 text-sm w-28"
					disabled={eth === "0.0"}
				>
					<Link
						className="flex flex-row gap-4 items-center"
						to={`/new-transaction?key=${address.key_id}`}
					>
						<MoveUpRight className="h-4 w-4" />
						Send
					</Link>
				</Button>
			</div>
		</div>
	);
}
