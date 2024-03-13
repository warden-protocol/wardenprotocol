import { ThemeToggle } from "@/components/theme-toggle";
import { Notifications } from "@/components/notifications";
import { WalletConnect } from "@/components/walletconnect";
import { MetaMaskRequests } from "./metamask-requests";

export function RightSidebar() {
	return (
		<div className="flex flex-row top-[64px] fixed right-0 min-h-[calc(100vh-64px)] w-20">
			<div className="w-20 min-h-[calc(100vh-64px)] flex flex-col gap-4 overflow-scroll no-scrollbar h-screen pb-20 justify-between bg-card">
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
