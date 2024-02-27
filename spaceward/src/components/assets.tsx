import useWardenWarden from "@/hooks/useWardenWarden";
import { Skeleton } from "@/components/ui/skeleton";
import AddressAvatar from "@/components/address-avatar";
import { WalletType } from "wardenprotocol-warden-client-ts/lib/warden.warden/rest";
import { ethers } from "ethers";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { useCurrency } from "@/hooks/useCurrency";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

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
	const { currency } = useCurrency();
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

	return (
		<div className="flex flex-col flex-1 h-full border rounded-lg">
			<div>
				<Accordion type="single" collapsible className="space-y-3">
					{query.data?.pages.flatMap((page) =>
						page.keys?.map((key) => {
							const ethAddr = key.wallets?.find(
								(wallet) =>
									wallet.type === WalletType.WALLET_TYPE_ETH
							)?.address;

							return <Address address={ethAddr} />;
						})
					)}
					{/* <div className="flex flex-row justify-between px-6 py-4 bg-muted">
					<div className="flex flex-row gap-4 items-center min-w-72">
						<div className="bg-white rounded-full w-10 h-10 overflow-clip p-1 flex items-center place-content-center">
							<img
								src="/logos/sepolia.png"
								alt="Sepolia"
								className="w-auto h-8"
							/>
						</div>
						<span>Sepolia Ether</span>
					</div>
					<div className="flex flex-row gap-4 items-center text-right">
						0 ETH
					</div>
					<div className="flex flex-row gap-4 items-center text-right">
						{currency === "usd" && USDollar.format(0)}
						{currency === "eur" && Euro.format(0)}
						{currency === "gbp" && GBP.format(0)}
					</div>
					<div className="flex flex-row gap-4 items-center w-20"></div>
				</div> */}
				</Accordion>
			</div>
		</div>
	);
}

// function Address(address) {
// 	const { currency } = useCurrency();
// 	const query = useQuery({
// 		queryKey: ["eth-balance", address.address],
// 		queryFn: () => getEthBalance(address.address || "0"),
// 	});

// 	if (query.status === "loading") {
// 		return (
// 			<div className="flex flex-row justify-between px-6 py-4 border-t">
// 				<div className="flex flex-row gap-4 items-center min-w-72">
// 					<Skeleton className="h-10 w-10 rounded-full" />
// 					<Skeleton className="h-4 w-[200px]" />
// 				</div>
// 				<div className="flex flex-row gap-4 items-center text-right">
// 					<Skeleton className="h-4 w-[150px]" />
// 				</div>
// 				<div className="flex flex-row gap-4 items-center text-right">
// 					<Skeleton className="h-4 w-[150px]" />
// 				</div>
// 				<div className="flex flex-row gap-4 items-center w-20">
// 					<Skeleton className="h-4 w-[50px]" />
// 				</div>
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className="flex flex-row justify-between px-6 py-4 border-t">
// 			<div className="flex flex-row gap-4 items-center min-w-72">
// 				<AddressAvatar seed={address.address || ""} />
// 				<span className="">
// 					{address.address.slice(0, 10) +
// 						"..." +
// 						address.address.slice(-10)}
// 				</span>
// 			</div>
// 			<div className="flex flex-row gap-4 items-center text-right">
// 				{ethers.formatEther(query?.data || 0)} ETH
// 			</div>
// 			<div className="flex flex-row gap-4 items-center text-right">
// 				{currency === "usd" &&
// 					USDollar.format(
// 						ethers.formatEther(query?.data || 0) * 2940
// 					)}
// 				{currency === "eur" &&
// 					Euro.format(ethers.formatEther(query?.data || 0) * 2756)}
// 				{currency === "gbp" &&
// 					GBP.format(ethers.formatEther(query?.data || 0) * 2358)}
// 			</div>
// 			<div className="flex flex-row gap-4 items-center w-20">
// 				<Button size="sm" variant="default">
// 					Send
// 				</Button>
// 			</div>
// 		</div>
// 	);
// }

function Address(address) {
	return (
		<AccordionItem
			value={`item-${address.address.toString()}`}
			className="p-4"
		>
			<AccordionTrigger className="py-1">
				<div className="flex flex-row justify-between w-full mr-4">
					<div className="flex flex-row items-center gap-4">
						<AddressAvatar seed={address.address} />
						<span className="font-sans">
							{address.address.slice(0, 8) +
								"..." +
								address.address.slice(-8)}
						</span>
					</div>
					<div className="flex flex-row">
						{/* <Avatar className="bg-white p-2 border">
							<AvatarImage
								src="/logos/ethereum.svg "
								alt="Ethereum"
							/>
						</Avatar> */}
						{/* <Avatar className="bg-white p-0 -ml-2 border">
							<AvatarImage
								src="/logos/celestia.svg "
								alt="Celestia"
							/>
						</Avatar> */}
					</div>
				</div>
			</AccordionTrigger>
			<AccordionContent>
				<div className="space-y-4">
					<Sepolia address={address.address} />
				</div>
			</AccordionContent>
		</AccordionItem>
	);
}

function Sepolia(address) {
	const { currency } = useCurrency();
	const query = useQuery({
		queryKey: ["eth-balance", address.address],
		queryFn: () => getEthBalance(address.address || "0"),
	});

	if (query.status === "loading") {
		return (
			<div className="flex flex-row justify-between px-6 py-4 border-t">
				<div className="flex flex-row gap-4 items-center min-w-72">
					<Skeleton className="h-10 w-10 rounded-full" />
					<Skeleton className="h-4 w-[200px]" />
				</div>
				<div className="flex flex-row gap-4 items-center text-right">
					<Skeleton className="h-4 w-[150px]" />
				</div>
				<div className="flex flex-row gap-4 items-center text-right">
					<Skeleton className="h-4 w-[150px]" />
				</div>
				<div className="flex flex-row gap-4 items-center w-20">
					<Skeleton className="h-4 w-[50px]" />
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-row justify-between mt-4 py-4 border-t">
			<div className="flex flex-row gap-4 items-center min-w-72">
				<div className="bg-white rounded-full w-10 h-10 overflow-clip p-1 flex items-center place-content-center">
					<img
						src="/logos/sepolia.png"
						alt="Sepolia"
						className="w-auto h-8"
					/>
				</div>
				<span>Sepolia Ether</span>
			</div>
			<div className="flex flex-row gap-4 items-center text-right">
				{ethers.formatEther(query?.data || 0)} ETH
			</div>
			<div className="flex flex-row gap-4 items-center text-right">
				{currency === "usd" &&
					USDollar.format(
						ethers.formatEther(query?.data || 0) * 2940
					)}
				{currency === "eur" &&
					Euro.format(ethers.formatEther(query?.data || 0) * 2756)}
				{currency === "gbp" &&
					GBP.format(ethers.formatEther(query?.data || 0) * 2358)}
			</div>
			<div className="flex flex-row gap-4 items-center w-20">
				<Button size="sm" variant="default">
					Send
				</Button>
			</div>
		</div>
	);
}

export default Assets;
