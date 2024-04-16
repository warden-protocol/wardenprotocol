import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SiteHeader } from "@/layouts/site-header";
import { Sidebar } from "@/layouts/sidebar";
import { RightSidebar } from "@/layouts/right-sidebar";
import { Icons } from "@/components/ui/icons";
import { env } from "@/env";
import Plausible from "plausible-tracker";
import { Wallet } from "@/features/wallet";
import { useChain } from "@cosmos-kit/react";
import useWallet from "@/hooks/useWallet";
import { useAddressContext } from "@/hooks/useAddressContext";
import { storyblokInit, apiPlugin, useStoryblok } from "@storyblok/react";

storyblokInit({
	accessToken: env.storyblokToken,
	use: [apiPlugin],
});

export function Root() {
	const { connectToWallet, signOut } = useWallet();
	const { status, address } = useChain(env.cosmoskitChainName);

	const story = useStoryblok("config", { version: "published" });

	const { address: connectedAddress } = useAddressContext();

	if (
		(status === "Connected" && !connectedAddress) ||
		(address && address !== connectedAddress)
	) {
		connectToWallet(
			() => null,
			() => null,
		);
	}
	if (status === "Disconnected" && address) {
		signOut();
	}

	const { enableAutoPageviews } = Plausible();
	enableAutoPageviews();

	if (
		(env.spacewardEnv === "production" && env.maintenance) ||
		(env.spacewardEnv === "production" &&
			story.content &&
			story.content.maintenance)
	) {
		return (
			<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
				<div className="w-full min-h-screen flex flex-col gap-2 items-center place-content-center px-8">
					<Icons.logo className="h-12 w-auto mb-10" />
					<h1 className="text-2xl font-bold">Upgrade in progress</h1>
					<p className="text-muted-foreground text-center">
						We are currently upgrading SpaceWard to a new version.
						Please check back later.
					</p>
				</div>
			</ThemeProvider>
		);
	}

	return (
		<>
			<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
				<div className="min-h-screen">
					{!address ? (
						<>
							<main className="pt-10 pb-10 h-screen">
								<div className="px-4 sm:px-6 lg:px-8 flex flex-row md:gap-6 h-full">
									<div className="hidden w-1/2 xl:w-4/12 border border-accent bg-[url(/landing-bg.svg)] bg-card dark:bg-[url(/landing-bg-dark.svg)] bg-cover bg-no-repeat p-8 md:flex flex-col place-content-end relative overflow-clip">
										<div className="">
											<h1 className="text-5xl text-accent">
												Welcome to SpaceWard. Unlock the
												Potential of Warden Protocol.
											</h1>
										</div>
									</div>
									<div className="w-full md:w-1/2 xl:w-8/12 p-8 flex flex-col place-content-center">
										<div className="flex items-center place-content-center pb-12">
											<Icons.logo className="h-6 w-auto" />
										</div>
										<div className="flex items-center place-content-center pb-4">
											<h1 className="text-3xl md:text-5xl text-center">
												Connect Wallet
											</h1>
										</div>
										<div className="flex items-center place-content-center pb-6">
											<p className="mx-auto text-center max-w-92">
												Connect your wallet to get
												started with SpaceWard.
											</p>
										</div>
										<div className="flex items-center place-content-center pb-6">
											<Wallet />
										</div>
									</div>
									<Toaster />
								</div>
							</main>
						</>
					) : (
						<>
							<SiteHeader />
							<Sidebar />
							<main className="pb-10 pt-16 md:pt-24 pl-0 md:pl-20 xl:pl-80 max-w-full h-screen md:pr-20 pr-0 overflow-x-hidden no-scrollbar">
								<div className="px-0 md:px-8">
									<Outlet />
									<Toaster />
								</div>
							</main>
							<RightSidebar />
						</>
					)}
				</div>
			</ThemeProvider>
		</>
	);
}
