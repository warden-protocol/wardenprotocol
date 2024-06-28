import { ThemeToggle } from "@/components/ThemeToggle";
import { Notifications } from "@/features/notifications";
import { WalletConnect } from "@/features/walletconnect";
import { MetaMaskRequests } from "../features/metamask";

export function RightSidebar() {
	return (
		<div className="md:flex flex-row sticky top-0 min-h-screen w-20 hidden">
			<div className="w-16 m-2 flex flex-col gap-4 overflow-scroll no-scrollbar justify-between bg-card rounded-xl">
				<div>
					<Notifications />
					<MetaMaskRequests />
					<WalletConnect />
				</div>
				<ThemeToggle />
			</div>
		</div>
	);
}
