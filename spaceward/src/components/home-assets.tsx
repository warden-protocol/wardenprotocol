import useWardenWarden from "@/hooks/useWardenWarden";
import { Skeleton } from "@/components/ui/skeleton";
import AddressAvatar from "@/components/address-avatar";
import { WalletType } from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden/rest";
import { ethers } from "ethers";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { MoveDownLeft, MoveUpRight, KeyIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useSpaceId } from "@/hooks/useSpaceId";
import NewKeyButton from "./new-key-button";
import ReceiveAssetButton from "@/components/receive-asset-button";
import { Copy } from "@/components/ui/copy";

const url = "https://rpc2.sepolia.org";
const provider = new ethers.JsonRpcProvider(url);

async function getEthBalance(address: string) {
	const balance = await provider.getBalance(address);
	return balance;
}

function HomeAssets() {
	const { spaceId } = useSpaceId();

	const { QueryKeys } = useWardenWarden();
	const query = QueryKeys(
		{
			type: WalletType.WALLET_TYPE_ETH,
			space_id: spaceId,
		},
		{},
		10
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
			{query.data?.pages.flatMap((page) =>
				page.keys?.map((key) => {
					return (
						<div className="flex flex-col border m-4 rounded-lg">
							<div>
								<div className="space-y-3">
									{key.wallets?.map((wallet) => {
										return (
											<Address
												address={wallet.address || ""}
												key_id={key.key?.id || ""}
											/>
										);
									})}
								</div>
							</div>
						</div>
					);
				})
			)}
		</>
	);
}

function Address(address = { address: string, key_id: string }) {
	return (
		<div className="">
			<div className="py-1 hover:no-underline border-0 font-normal font-sans p-4">
				<div className="flex flex-row justify-between w-full mr-4">
					<div className="flex flex-row items-center gap-4 py-4">
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
					<Sepolia
						address={address.address}
						key_id={address.key_id}
					/>
				</div>
			</div>
		</div>
	);
}

function Sepolia(address = { address: string, key_id: string }) {
	const query = useQuery({
		queryKey: ["eth-balance", address.address],
		queryFn: () => getEthBalance(address.address || "0"),
	});

	if (query.status === "loading") {
		return (
			<div className="flex flex-row justify-between px-4 py-4 border-t">
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
		<div className="flex flex-row justify-between p-4 border-t">
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

export default HomeAssets;
