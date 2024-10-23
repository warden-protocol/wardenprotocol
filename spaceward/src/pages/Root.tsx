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
import { NoSpaces } from "@/features/spaces";
import cn from "clsx";
import { useSpaceId } from "@/hooks/useSpaceId";
import { useQueryHooks } from "@/hooks/useClient";
import { PageRequest } from "@wardenprotocol/wardenjs/codegen/cosmos/base/query/v1beta1/pagination";
import MobileAssistant from "./MobileAssistant";
import ModalRoot from "@/features/modals";

storyblokInit({
	accessToken: env.storyblokToken,
	use: [apiPlugin],
});

const { enableAutoPageviews } = Plausible();
enableAutoPageviews();

export function Root() {
	const { connectToWallet, signOut } = useWallet();
	const { status, address } = useChain(env.cosmoskitChainName);
	const { spaceId, setSpaceId } = useSpaceId();

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

	const { useSpacesByOwner } = useQueryHooks();
	const { data: spacesQuery } = useSpacesByOwner({
		request: {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			owner: address!,
			pagination: PageRequest.fromPartial({
				limit: BigInt(100),
			}),
		},
		options: {
			enabled: !!address,
		},
	});

	const spaceCount = spacesQuery?.spaces?.length || 0;

	if (spaceCount > 0 && address && !spaceId) {
		setSpaceId(spacesQuery?.spaces?.[0]?.id.toString() || "");
	}

	const params = new URLSearchParams(window.location.search);
	const [ma, topic] = ["ma", "topic"].map((key) => params.get(key));

	if (ma && topic) {
		// display qr reader

		return (
			<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
				<MobileAssistant base64MultiAddress={ma} topic={topic} />
			</ThemeProvider>
		);
	}

	// TODO: remove once chaido is live
	if (env.spacewardEnv === "production" && env.chainId === "chiado_10010-1") {
		return (
			<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
				<div className="w-full min-h-screen flex flex-col gap-2 items-center place-content-center px-8">
					<Icons.logo className="h-12 w-auto mb-10" />
					<h1 className="text-2xl font-bold">Chiado Coming Soon</h1>
					<p className="text-muted-foreground text-center">
						We are currently upgrading SpaceWard to a new version.
						Please check back later.
					</p>
				</div>
			</ThemeProvider>
		);
	}

	// Maintenance mode enabled
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
		<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
			<div className={cn("min-h-screen flex flex-row")}>
				{!address ? (
					<>
						<main className="pt-10 pb-10 h-screen  bg-[url(/rail.png)] dark:bg-[url(/rail.png)] bg-cover bg-no-repeat">
							<div className="px-4 sm:px-6 lg:px-8 flex flex-row md:gap-6 h-full lg:grid lg:grid-cols-[1fr_556px]">
								<div className="hidden w-1/2 lg:w-auto rounded-xl md:flex flex-col justify-between relative overflow-clip">
									<Icons.logoHello />
									<h1 className="text-[52px] font-extrabold tracking-[0.24px] leading-[120%] uppercase">
										Welcome to SpaceWard
									</h1>
									<div className="text-label-accent text-xl uppercase font-spacemono">
										[&nbsp;.&nbsp;Unlock the Potential of
										Warden Protocol&nbsp;.&nbsp;]
									</div>
								</div>
								<div className="w-full md:w-1/2 lg:w-auto p-8 flex flex-col place-content-center bg-fill-accent-primary rounded-2xl	text-label-on-light">
									<div className="flex items-center place-content-center pb-12">
										<Icons.logo className="h-8 w-auto invert" />
									</div>
									<div className="flex items-center place-content-center pb-6">
										<h1 className="text-3xl md:text-5xl font-bold tracking-[0.24px] leading-[120%] text-center">
											Connect Wallet
										</h1>
									</div>
									<div className="flex items-center place-content-center pb-12">
										<p className="mx-auto text-center max-w-92">
											Connect your wallet to get started
											with SpaceWard.
										</p>
									</div>
									<div className="flex items-center place-content-center pb-6">
										<Wallet />
									</div>
								</div>
							</div>
							<Toaster />
						</main>
					</>
				) : (
					<>
						{spaceCount !== 0 && <Sidebar />}
						<main
							className={cn(
								"pb-2 pt-0 md:pt-[60px] max-w-full w-full h-screen pr-0 overflow-x-hidden no-scrollbar relative",
								spaceCount === 0 && "mx-2",
							)}
						>
							<SiteHeader />
							{spaceCount === 0 ? <NoSpaces /> : <Outlet />}
							<Toaster />
						</main>
						{spaceCount !== 0 && <RightSidebar />}
					</>
				)}
			</div>
			<ModalRoot />
		</ThemeProvider>
	);
}
