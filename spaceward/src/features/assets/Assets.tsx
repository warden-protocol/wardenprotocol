import { Skeleton } from "@/components/ui/skeleton";
import AddressAvatar from "@/components/AddressAvatar";
import { ethers } from "ethers";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/hooks/useCurrency";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { MoveUpRight, KeyIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ReceiveAssetButton } from "@/features/assets";
import { Copy } from "@/components/ui/copy";
import { NewKeyButton } from "@/features/keys";
import { useQueryHooks } from "@/hooks/useClient";
import { PageRequest } from "@wardenprotocol/wardenjs/codegen/cosmos/base/query/v1beta1/pagination";
import { AddressType } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/key";
import { getProvider } from "@/lib/eth";

const provider = getProvider("sepolia");

const USDollar = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});
const Euro = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "EUR",
});
const GBP = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "GBP",
});

async function getEthBalance(address: string) {
	const balance = await provider.getBalance(address);
	return balance;
}

export function Assets({ spaceId }: { spaceId: string }) {
	const { useKeysBySpaceId, isReady } = useQueryHooks();
	const query = useKeysBySpaceId({
		request: {
			spaceId: BigInt(spaceId),
			deriveAddresses: [
				AddressType.ADDRESS_TYPE_ETHEREUM,
				AddressType.ADDRESS_TYPE_OSMOSIS,
			],
			pagination: PageRequest.fromPartial({
				limit: BigInt(10),
			}),
		},
		options: {
			enabled: isReady,
		},
	});

	if (query.status === "loading") {
		return <div>Loading...</div>;
	}

	if (query.data?.keys?.length === 0) {
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
			{query.data?.keys?.map((key) => (
				<div
					className="flex flex-col min-w-[600px]"
					key={key.key.id.toString()}
				>
					<div className="flex flex-row justify-between px-4 py-4">
						<div className="flex flex-row items-center gap-4">
							<div className="relative w-10">
								<AddressAvatar seed={key.key.publicKey} />
							</div>

							<span className="font-sans flex flex-col">
								<span className="text-muted-foreground">
									Key #{key.key.id.toString()}
								</span>
							</span>
						</div>
					</div>
					<div>
						<div className="space-y-3">
							{key.addresses?.map((addr) => {
								return (
									<Address
										key={addr.address}
										address={addr.address}
										type={addr.type}
										keyId={key.key.id}
									/>
								);
							})}
						</div>
					</div>
				</div>
			))}
		</>
	);
}

function Address({
	address,
	type,
	keyId,
}: {
	address: string;
	type: AddressType;
	keyId: bigint;
}) {
	if (type !== AddressType.ADDRESS_TYPE_ETHEREUM) {
		return null;
	}

	return (
		<div className="rounded-xl bg-card pb-2">
			<div className="border-0 p-4">
				<div className="wallet-row">
					<div className="flex flex-row items-center gap-4">
						<div className="relative">
							<AddressAvatar seed={address} />
							<div className="flex flex-row absolute bottom-0 right-0">
								<Avatar className="bg-white p-1 border h-6 w-6">
									<AvatarImage
										src="/logos/ethereum.svg"
										alt="Ethereum"
									/>
								</Avatar>
							</div>
						</div>
						<div className="font-sans flex flex-col text-left">
							<span className="text-muted-foreground text-xs">
								Wallet Address
							</span>
							<div className="flex flex-row gap-2 items-center text-sm">
								<Copy value={address} split={true} />
							</div>
						</div>
					</div>
					<div className="flex flex-col"></div>
					<div></div>
					<div className="flex flex-row">
						<ReceiveAssetButton address={address} />
					</div>
				</div>
			</div>
			<div className="mx-2">
				<Sepolia address={address} keyId={keyId} />
			</div>
		</div>
	);
}

function Sepolia({ address, keyId }: { address: string; keyId: bigint }) {
	const { currency } = useCurrency();
	const query = useQuery({
		queryKey: ["eth-balance", address],
		queryFn: () => getEthBalance(address || "0"),
	});

	if (query.status === "loading") {
		return (
			<div className="flex flex-row justify-between px-6 py-4 border-t">
				<div className="flex flex-row gap-4 items-center">
					<Skeleton className="h-10 w-10 rounded-full" />
					<Skeleton className="h-4 w-[200px]" />
				</div>
				<div className="flex flex-row gap-4 items-center">
					<Skeleton className="h-4 w-[150px]" />
				</div>
				<div className="flex flex-row gap-4 items-center">
					<Skeleton className="h-4 w-[150px]" />
				</div>
				<div className="flex flex-row gap-4 items-center">
					<Skeleton className="h-4 w-[50px]" />
				</div>
			</div>
		);
	}

	return (
		<div className="bg-background wallet-row p-4 rounded-lg">
			<div className="flex flex-row gap-4 items-center">
				<div className="bg-white rounded-full w-10 h-10 overflow-clip p-1 flex items-center place-content-center">
					<img
						src="/logos/sepolia.png"
						alt="Sepolia"
						className="w-auto h-8"
					/>
				</div>
				<span className="text-sm">Sepolia Ether</span>
			</div>
			<div className="flex flex-row gap-4 items-center text-sm">
				{ethers.formatEther(query?.data || 0)} ETH
			</div>
			<div className="flex flex-row gap-4 items-center text-sm">
				{currency === "usd" &&
					USDollar.format(
						parseFloat(ethers.formatEther(query?.data || 0)) * 2940,
					)}
				{currency === "eur" &&
					Euro.format(
						parseFloat(ethers.formatEther(query?.data || 0)) * 2756,
					)}
				{currency === "gbp" &&
					GBP.format(
						parseFloat(ethers.formatEther(query?.data || 0)) * 2358,
					)}
			</div>
			<div className="flex flex-row gap-4 items-center">
				<Link to={`/new-transaction?key=${keyId}`}>
					<Button
						size="sm"
						variant="ghost"
						className="gap-2 w-[110px] text-sm hover:bg-foreground hover:text-background border-foreground"
					>
						<MoveUpRight className="h-4 w-4" />
						Send
					</Button>
				</Link>
			</div>
		</div>
	);
}
