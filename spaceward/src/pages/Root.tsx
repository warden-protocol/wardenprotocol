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
import useWardenWardenV1Beta2 from "@/hooks/useWardenWardenV1Beta2";
import { useSpaceId } from "@/hooks/useSpaceId";

storyblokInit({
	accessToken: env.storyblokToken,
	use: [apiPlugin],
});

interface SpacesQueryResult {
	pageParam: number;
	pagination?:
		| { next_key?: string | undefined; total?: string | undefined }
		| undefined;
	spaces?:
		| {
				id?: string | undefined;
				creator?: string | undefined;
				owners?: string[] | undefined;
				admin_intent_id?: string | undefined;
				sign_intent_id?: string | undefined;
		  }[]
		| undefined;
}

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

	const { enableAutoPageviews } = Plausible();
	enableAutoPageviews();

	const { QuerySpacesByOwner } = useWardenWardenV1Beta2();
	const { data: spacesQuery } = QuerySpacesByOwner(
		{ owner: address },
		{ enabled: !!address },
		100,
	);
	const spaceCount =
		((spacesQuery as any)?.pages[0] as SpacesQueryResult | undefined)
			?.spaces?.length || 0;

	if (spaceCount > 0 && address && !spaceId) {
		setSpaceId(
			((spacesQuery as any)?.pages[0] as SpacesQueryResult | undefined)
				?.spaces?.[0]?.id || "",
		);
	}

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
				<div
					className={cn(
						"min-h-screen flex flex-row",
						address && spaceCount === 0 ? "no-space" : "",
					)}
				>
					{!address ? (
						<>
							<main className="pt-10 pb-10 h-screen">
								<div className="px-4 sm:px-6 lg:px-8 flex flex-row md:gap-6 h-full">
									<div className="hidden w-1/2 xl:w-4/12 rounded-xl bg-[url(/landing-bg.svg)] border-2 border-accent bg-background dark:bg-[url(/landing-bg-dark.svg)] bg-cover bg-no-repeat p-8 md:flex flex-col place-content-end relative overflow-clip">
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
							<Sidebar />
							<main className="pb-2 pt-8 max-w-full w-full h-screen pr-0 overflow-x-hidden no-scrollbar relative">
								<SiteHeader />
								{spaceCount === 0 ? <NoSpaces /> : <Outlet />}
								<Toaster />
							</main>
							<RightSidebar />
						</>
					)}
				</div>
			</ThemeProvider>
		</>
	);
}
