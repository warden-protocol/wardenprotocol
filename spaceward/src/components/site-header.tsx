import { Icons } from "@/components/ui/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { Notifications } from "@/components/notifications";
import { WalletConnect } from "@/components/walletconnect";
import { ConnectWallet } from "@/components/connect-wallet";

export function SiteHeader() {
	return (
		<header className="fixed top-0 z-[60] w-full bg-card">
			<div className="mx-20 flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 border-b  ">
				<a href="/" className="flex items-center space-x-2">
					<Icons.logo className="h-6 w-auto" />
				</a>
				<div className="flex flex-1 items-center justify-end space-x-4">
					<nav className="flex items-center">
						<Notifications />
						<WalletConnect />
						<ConnectWallet />
						<ThemeToggle />
					</nav>
				</div>
			</div>
		</header>
	);
}
