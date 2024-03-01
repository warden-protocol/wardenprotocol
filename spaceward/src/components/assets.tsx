import useWardenWarden from "@/hooks/useWardenWarden";
import { Skeleton } from "@/components/ui/skeleton";
import AddressAvatar from "@/components/address-avatar";
import { WalletType } from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden/rest";
import { ethers } from "ethers";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { useCurrency } from "@/hooks/useCurrency";
// import {
// 	Accordion,
// 	AccordionContent,
// 	AccordionItem,
// 	AccordionTrigger,
// } from "@/components/ui/accordion";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { MoveUpRight, KeyIcon } from "lucide-react";
import { Link } from "react-router-dom";
import ReceiveAssetButton from "./receive-asset-button";
import { Copy } from "@/components/ui/copy";
import NewKeyButton from "./new-key-button";

const url = "https://rpc2.sepolia.org";
const provider = new ethers.JsonRpcProvider(url);

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

function Assets({ spaceAddr }: { spaceAddr: string }) {
	const { QueryKeys } = useWardenWarden();
	const query = QueryKeys(
		{
			type: WalletType.WALLET_TYPE_ETH,
			space_addr: spaceAddr,
		},
		{},
		10
	);

	if (query.status === "loading") {
		return <div>Loading...</div>;
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
						<div className="flex flex-col flex-1 h-full">
							<div className="flex flex-row justify-between px-4 py-4">
								<div className="flex flex-row items-center gap-4">
									<div className="relative w-10">
										<AddressAvatar
											seed={key.key.public_key}
										/>
									</div>

									<span className="font-sans flex flex-col">
										<span className="text-muted-foreground text-sm">
											Key
										</span>
										<span>
											{key.key.public_key.slice(0, 8) +
												"..." +
												key.key.public_key.slice(-8)}
										</span>
									</span>
								</div>
							</div>
							<div>
								<div className="space-y-3">
									{key.wallets?.map((wallet) => {
										return (
											<Address
												address={wallet.address}
												key_id={key.key?.id}
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

function Address(address, key_id) {
	return (
		<div className="border rounded-lg bg-card">
			<div className="border-0 p-4">
				<div className="wallet-row">
					<div className="flex flex-row items-center gap-4">
						<div className="relative">
							<AddressAvatar seed={address.address} />
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
							<div className="flex flex-row gap-2 items-center">
								<Copy value={address.address} split={true} />
							</div>
						</div>
					</div>
					<div className="flex flex-col">
						{/* <div className="text-left">
							<span className="text-xs text-muted-foreground">
								Tokens
							</span>
						</div>
						<div className="flex flex-row">
							<div className="bg-white rounded-full w-6 h-6 overflow-clip p-1 flex items-center place-content-center z-20 border-2 border-card">
								<img
									src="/logos/sepolia.png"
									alt="Sepolia"
									className="w-auto h-4"
								/>
							</div>
							<div className="bg-border rounded-full w-6 h-6 overflow-clip p-1 flex items-center place-content-center -ml-2 z-10 border-2 border-card"></div>
							<div className="bg-border rounded-full w-6 h-6 overflow-clip p-1 flex items-center place-content-center -ml-2 z-0 border-2 border-card"></div>
						</div> */}
					</div>
					<div>
						{/* <div className="text-left">
							<span className="text-xs text-muted-foreground">
								Total Value
							</span>
						</div>
						<div className="text-left">
							<span className="text-sm">$XX.XX</span>
						</div> */}
					</div>
					<div className="flex flex-row">
						<ReceiveAssetButton address={address.address} />
					</div>
				</div>
			</div>
			<div>
				<Sepolia address={address.address} key_id={address.key_id} />
			</div>
		</div>
	);
}

function Sepolia(address, key_id) {
	const { currency } = useCurrency();
	const query = useQuery({
		queryKey: ["eth-balance", address.address],
		queryFn: () => getEthBalance(address.address || "0"),
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
		<div className="border-t wallet-row p-4">
			<div className="flex flex-row gap-4 items-center">
				<div className="bg-white rounded-full w-10 h-10 overflow-clip p-1 flex items-center place-content-center">
					<img
						src="/logos/sepolia.png"
						alt="Sepolia"
						className="w-auto h-8"
					/>
				</div>
				<span>Sepolia Ether</span>
			</div>
			<div className="flex flex-row gap-4 items-center">
				{ethers.formatEther(query?.data || 0)} ETH
			</div>
			<div className="flex flex-row gap-4 items-center">
				{currency === "usd" &&
					USDollar.format(
						ethers.formatEther(query?.data || 0) * 2940
					)}
				{currency === "eur" &&
					Euro.format(ethers.formatEther(query?.data || 0) * 2756)}
				{currency === "gbp" &&
					GBP.format(ethers.formatEther(query?.data || 0) * 2358)}
			</div>
			<div className="flex flex-row gap-4 items-center">
				<Link to={`/new-transaction?key=${address.key_id}`}>
					<Button
						size="sm"
						variant="default"
						className="gap-2 w-[110px] text-sm"
					>
						<MoveUpRight className="h-4 w-4" />
						Send
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default Assets;
