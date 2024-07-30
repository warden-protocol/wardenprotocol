import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Icons } from "@/components/ui/icons";
import * as Popover from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { WalletConnect } from "../features/walletconnect/WalletConnect";
import { InnerSidebar } from "./sidebar";

export function SiteHeader() {
	const [open, setOpen] = useState(false);

	const location = useLocation();

	useEffect(() => {
		setOpen(false);
	}, [location]);

	return (
		<header className="px-8 relative xl:absolute right-0 top-0 xl:top-8">
			<div className="flex h-16 items-center sm:justify-between sm:space-x-0">
				{/* Mobile Nav */}
				<div className="md:hidden flex flex-row">
					<div className="h-16 mr-4 flex items-center place-content-center">
						<Icons.icon className="h-6 w-auto" />
					</div>

					<Popover.Root
						modal={true}
						open={open}
						onOpenChange={() => setOpen(!open)}
					>
						<Popover.Trigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="bg-transparent hover:bg-transparent h-16"
							>
								<MenuIcon className="h-6 w-6" />
							</Button>
						</Popover.Trigger>
						<Popover.Portal>
							<Popover.Content
								side="bottom"
								className="bg-transparent w-screen rounded-none h-screen overflow-scroll no-scrollbar"
							>
								<div
									className="inset-0 bg-background/70 absolute"
									onClick={() => setOpen(false)}
								></div>
								<div className="pt-0 flex flex-col space-y-4 w-full md:w-80 max-w-full bg-background fixed h-[calc(100vh-64px)] top-0 left-0">
									{/* <MobileNav /> */}
									<InnerSidebar />
								</div>
							</Popover.Content>
						</Popover.Portal>
					</Popover.Root>
				</div>
				<div className="flex flex-1 items-center justify-end space-x-4">
					<div className="md:hidden block">
						<WalletConnect />
					</div>
				</div>
			</div>
		</header>
	);
}
