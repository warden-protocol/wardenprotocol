import FaucetButton from "./faucet-button";
import { Button } from "@/components/ui/button";
import { AlertCircle, ChevronsUpDown, Copy } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import AddressAvatar from "./address-avatar";
import { useAddressContext } from "@/def-hooks/addressContext";
import useKeplr from "@/def-hooks/useKeplr";
import { useAsset } from "@/def-hooks/useAsset";

export function ConnectWallet() {
	const { connectToKeplr } = useKeplr();
	const { address } = useAddressContext();

	const { balance } = useAsset("uward");
	const ward = parseInt(balance?.amount || "0") / 10 ** 6;

	return (
		<Popover>
			<PopoverTrigger asChild>
				{address ? (
					<Button
						asChild
						variant="outline"
						role="combobox"
						className="justify-between h-16 border-t-0 border-b-0 rounded-none gap-4 min-w-0"
					>
						<div>
							<AddressAvatar seed={address} />
							<div className="flex flex-col text-left text-xs">
								<span className="block text-sm truncate">
									{address.slice(0, 8) + "..." + address.slice(-8)}
								</span>
								<span className="block text-sm truncate">
									{ward.toFixed(2)} WARD
								</span>
							</div>
							<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
						</div>
					</Button>
				) : (
					<Button
						variant="outline"
						role="combobox"
						className="justify-between h-16 border-t-0 border-b-0 rounded-none gap-4"
						onClick={() => connectToKeplr(() => null, () => null)}
					>
						<div>
							<AlertCircle className="ml-2 h-8 w-8 shrink-0" />
						</div>
						<div className="flex flex-col text-left text-xs">
							<span>Not Connected</span>
							<span>Connect Wallet</span>
						</div>
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				)}
			</PopoverTrigger>

			<PopoverContent className="w-80">
				{address ? (
					<div className="grid gap-4">
						<div className="flex flex-row text-left text-xs gap-2 justify-between items-center">
							<span className="block text-base">
								{address.slice(0, 12) + "..." + address.slice(-12)}
							</span>
							<span>
								<Copy className="h-4 w-4" />
							</span>
						</div>
						<div className="border rounded-lg">
							<div className="px-6 py-3 text-sm border-b flex justify-between">
								<span>Wallet</span>
								<span>Keplr</span>
							</div>
							<div className="px-6 py-3 text-sm flex justify-between">
								<span>Balance</span>
								<span>{ward.toFixed(2)} WARD</span>
							</div>
						</div>
						<div className="flex flex-grow">
							<FaucetButton />
						</div>
					</div>
				) : (
					<div className="grid gap-4">
						<div>
							<AlertCircle className="h-24 w-24 mx-auto shrink-0" />
						</div>
						<div>
							<Button
								onClick={() => connectToKeplr(() => null, () => null)}
								size="lg"
								className="mx-auto w-full"
							>
								Connect Wallet
							</Button>
						</div>
					</div>
				)}
			</PopoverContent>
		</Popover>
	);
}
