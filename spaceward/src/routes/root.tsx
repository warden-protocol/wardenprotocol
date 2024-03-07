import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import useKeplr from "@/def-hooks/useKeplr";
import useLeap from "@/def-hooks/useLeap";
import useCosmostation from "@/def-hooks/useCosmostation";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { useAddressContext } from "@/def-hooks/useAddressContext";
import useWardenWarden from "@/hooks/useWardenWarden";
import { useSpaceAddress } from "@/hooks/useSpaceAddress";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useActiveWallet } from "@/hooks/useActiveWallet";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/ui/icons";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import FaucetButton from "@/components/faucet-button";
import { useAsset } from "@/def-hooks/useAsset";
import { env } from "@/env";
import Plausible from "plausible-tracker";

export default function Root() {
	const { connectToKeplr, isKeplrAvailable } = useKeplr();
	const { connectToLeap, isLeapAvailable } = useLeap();
	const { connectToCosmostation, isCosmostationAvailable } =
		useCosmostation();

	const { enableAutoPageviews } = Plausible();
	enableAutoPageviews();

	const { balance } = useAsset("uward");
	const ward = parseInt(balance?.amount || "0") / 10 ** 6;

	const { address } = useAddressContext();
	const { activeWallet } = useActiveWallet();
	const { spaceAddress, setSpaceAddress } = useSpaceAddress();

	const [walletConnection, setWalletConnection] = useState({
		connecting: false,
		download: false,
		name: "",
	});

	if (!address && activeWallet && activeWallet.name !== "") {
		if (activeWallet.name === "Keplr") {
			connectToKeplr(
				() => null,
				() => null
			);
		}
		if (activeWallet.name === "Leap") {
			connectToLeap(
				() => null,
				() => null
			);
		}
		if (activeWallet.name === "Cosmostation") {
			connectToCosmostation(
				() => null,
				() => null
			);
		}
	}

	const { QuerySpacesByOwner } = useWardenWarden();
	const { data: spacesQuery } = QuerySpacesByOwner(
		{ owner: address },
		{ enabled: !!address },
		10
	);
	const spacecount = spacesQuery?.pages[0].spaces?.length || 0;

	// set the first space as the active one if none is set
	if (spacecount > 0 && spaceAddress === "") {
		setSpaceAddress(spacesQuery?.pages[0].spaces[0].address);
	}
	if (env.maintenance) {
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
				<div className="w-full min-h-screen md:hidden flex flex-col gap-2 items-center place-content-center">
					<Icons.logo className="h-12 w-auto mb-10" />
					<h1 className="text-2xl font-bold">Desktop Only</h1>
					<p className="text-muted-foreground">
						This testnet version of SpaceWard is only available on
						desktop.
					</p>
				</div>
				<div className="min-h-screen hidden md:block">
					{!address ? (
						<>
							<SiteHeader />
							<main className="pt-24 pb-10 h-[calc(100vh-64px)]">
								<div className="px-4 sm:px-6 lg:px-8 flex flex-row gap-6 h-full">
									<div className="w-5/12 border bg-[url(/landing-bg.svg)] dark:bg-[url(/landing-bg-dark.svg)] bg-[left_top_-10rem] bg-no-repeat p-8 flex flex-col place-content-end relative overflow-clip">
										<div className="">
											<h1 className="text-6xl text-accent">
												Welcome to SpaceWard. Unlock the
												Potential of Warden Protocol.
											</h1>
										</div>
									</div>
									<div className="w-7/12 rounded-2xl bg-background p-8 flex flex-col place-content-center">
										<div className="flex items-center place-content-center pb-4">
											<h1 className="text-5xl">
												Connect Wallet
											</h1>
										</div>
										<div className="flex items-center place-content-center pb-6">
											<p className="mx-auto text-center max-w-80">
												Connect your wallet to get
												started with SpaceWard, your
												cross-chain account aggregation
												portal.
											</p>
										</div>
										<div className="flex items-center place-content-center pb-6">
											<Dialog>
												<DialogTrigger asChild>
													<Button
														variant="outline"
														className="space-x-4 pl-2 border-muted-foreground hover:border-accent"
														onClick={() =>
															setWalletConnection(
																{
																	connecting:
																		false,
																	download:
																		false,
																	name: "",
																}
															)
														}
													>
														<div className="flex flex-row">
															<div className="h-8 w-8 rounded-full border-2 border-background overflow-clip">
																<img
																	src="/logos/keplr.svg"
																	className="object-fill"
																/>
															</div>
															<div className="h-8 w-8 rounded-full border-2 border-background overflow-clip -ml-2">
																<img
																	src="/logos/cosmostation-bg.svg"
																	className="object-fill"
																/>
															</div>
															<div className="h-8 w-8 rounded-full p-1 bg-white border-2 border-background overflow-clip -ml-2">
																<img
																	src="/logos/leap.svg"
																	className="object-cover"
																/>
															</div>
														</div>
														<span>Connect</span>
													</Button>
												</DialogTrigger>
												<DialogContent className="sm:max-w-[700px] p-0 rounded-3xl overflow-clip min-h-80">
													<div className="flex flex-row">
														<div className="w-5/12 border-r p-4 h-full">
															<div className="flex flex-col">
																<div className="">
																	<span className="text-xl font-bold">
																		Connect
																	</span>
																</div>
																<div className="flex flex-col space-y-4 pt-4 place-content-center">
																	<Button
																		onClick={() => {
																			isLeapAvailable
																				? (setWalletConnection(
																						{
																							connecting:
																								true,
																							download:
																								false,
																							name: "Leap",
																						}
																					),
																					connectToLeap(
																						() =>
																							null,
																						() =>
																							null
																					))
																				: setWalletConnection(
																						{
																							connecting:
																								false,
																							download:
																								true,
																							name: "Leap",
																						}
																					);
																		}}
																		size="lg"
																		variant="ghost"
																		className="w-full relative p-2 justify-start h-16 hover:bg-muted rounded-xl ring-2 ring-accent"
																	>
																		<div className="flex flex-row space-x-4">
																			<div className="h-12 w-12 rounded-xl overflow-clip">
																				<img
																					src="/logos/leap.svg"
																					className="object-cover w-full h-full"
																				/>
																			</div>
																			<div className="flex flex-col text-left place-content-center">
																				<span className="font-bold flex flex-row gap-2 place-content-center items-center">
																					<span>
																						Leap
																					</span>
																					<Badge className="px-2 h-4 bg-foreground rounded-sm">
																						Suggested
																					</Badge>
																				</span>
																				<span className="text-sm text-muted-foreground">
																					{isLeapAvailable
																						? "Installed"
																						: "Not Installed"}
																				</span>
																			</div>
																		</div>
																	</Button>
																	<Button
																		onClick={() => {
																			isKeplrAvailable
																				? (setWalletConnection(
																						{
																							connecting:
																								true,
																							download:
																								false,
																							name: "Keplr",
																						}
																					),
																					connectToKeplr(
																						() =>
																							null,
																						() =>
																							null
																					))
																				: setWalletConnection(
																						{
																							connecting:
																								false,
																							download:
																								true,
																							name: "Keplr",
																						}
																					);
																		}}
																		size="lg"
																		variant="ghost"
																		className="w-full p-2 justify-start h-16 hover:bg-muted rounded-xl"
																	>
																		<div className="flex flex-row space-x-4">
																			<div className="h-12 w-12 rounded-xl overflow-clip">
																				<img
																					src="/logos/keplr.svg"
																					className="object-cover w-full h-full"
																				/>
																			</div>
																			<div className="flex flex-col text-left place-content-center">
																				<span className="font-bold">
																					Keplr
																				</span>
																				<span className="text-sm text-muted-foreground">
																					{isKeplrAvailable
																						? "Installed"
																						: "Not Installed"}
																				</span>
																			</div>
																		</div>
																	</Button>
																	<Button
																		onClick={() => {
																			isCosmostationAvailable
																				? (setWalletConnection(
																						{
																							connecting:
																								true,
																							download:
																								false,
																							name: "Cosmostation",
																						}
																					),
																					connectToCosmostation(
																						() =>
																							null,
																						() =>
																							null
																					))
																				: setWalletConnection(
																						{
																							connecting:
																								false,
																							download:
																								true,
																							name: "Cosmostation",
																						}
																					);
																		}}
																		size="lg"
																		variant="ghost"
																		className="w-full p-2 justify-start h-16 hover:bg-muted rounded-xl"
																	>
																		<div className="flex flex-row space-x-4">
																			<div className="h-12 w-12 rounded-xl overflow-clip">
																				<img
																					src="/logos/cosmostation.svg"
																					className="object-cover w-full h-full"
																				/>
																			</div>
																			<div className="flex flex-col text-left place-content-center">
																				<span className="font-bold">
																					Cosmostation
																				</span>
																				<span className="text-sm text-muted-foreground">
																					{isCosmostationAvailable
																						? "Installed"
																						: "Not Installed"}
																				</span>
																			</div>
																		</div>
																	</Button>
																</div>
															</div>
														</div>
														<div className="w-7/12 flex flex-col place-content-center p-6">
															{walletConnection.connecting ? (
																<div>
																	<div className="flex flex-col items-center place-content-center pb-2">
																		<div className="relative flex mb-6">
																			<svg
																				viewBox="0 0 110 110"
																				className="svg-animation w-24 h-24"
																			>
																				<rect
																					x="2"
																					y="2"
																					width="106"
																					height="106"
																					rx="20"
																					stroke-dasharray="132 261"
																					stroke-dashoffset="-388"
																					stroke-linecap="round"
																					fill="none"
																					stroke-width="4"
																				></rect>
																			</svg>
																			<div className="h-16 w-16 rounded-lg overflow-clip">
																				<img
																					src={`/logos/${walletConnection.name.toLowerCase()}.svg`}
																					className="object-cover w-full h-full scale-110"
																				/>
																			</div>
																		</div>
																		<span className="text-xl text-center">
																			Awaiting
																			Confirmation
																		</span>
																	</div>
																	<div className="flex items-center place-content-center pb-6">
																		<p className="mx-auto text-center text-sm text-muted-foreground max-w-52">
																			Accept
																			the
																			connection
																			request
																			in{" "}
																			{
																				walletConnection.name
																			}{" "}
																			wallet
																		</p>
																	</div>
																</div>
															) : walletConnection.download ? (
																<div>
																	<div className="flex flex-col items-center place-content-center pb-2">
																		<div className="relative flex mb-6">
																			<div className="h-16 w-16 rounded-lg overflow-clip">
																				<img
																					src={`/logos/${walletConnection.name.toLowerCase()}.svg`}
																					className="object-cover w-full h-full scale-110"
																				/>
																			</div>
																		</div>
																		<span className="text-xl text-center">
																			Download{" "}
																			{
																				walletConnection.name
																			}
																		</span>
																	</div>
																	<div className="flex items-center place-content-center pb-4">
																		<p className="mx-auto text-center text-sm text-muted-foreground max-w-52">
																			Download{" "}
																			{
																				walletConnection.name
																			}{" "}
																			wallet
																			to
																			connect
																			to
																			SpaceWard
																		</p>
																	</div>
																	<div className="flex items-center place-content-center">
																		{walletConnection.name ===
																		"Leap" ? (
																			<Button size="sm">
																				<Link
																					to="https://www.leapwallet.io/download"
																					target="_blank"
																				>
																					Download
																				</Link>
																			</Button>
																		) : walletConnection.name ===
																		  "Keplr" ? (
																			<Button size="sm">
																				<Link
																					to="https://www.keplr.app/download"
																					target="_blank"
																				>
																					Download
																				</Link>
																			</Button>
																		) : walletConnection.name ===
																		  "Cosmostation" ? (
																			<Button size="sm">
																				<Link
																					to="https://cosmostation.io/products/cosmostation_extension"
																					target="_blank"
																				>
																					Download
																				</Link>
																			</Button>
																		) : null}
																	</div>
																</div>
															) : (
																<div>
																	<div className="flex flex-col items-center place-content-center pb-4">
																		<span className="text-3xl text-center font-display">
																			Select
																			Wallet
																		</span>
																	</div>
																	<div className="flex items-center place-content-center">
																		<p className="mx-auto text-center text-muted-foreground max-w-52">
																			Select
																			which
																			wallet
																			you
																			would
																			like
																			to
																			connect.
																		</p>
																	</div>
																</div>
															)}
														</div>
													</div>
												</DialogContent>
											</Dialog>
										</div>
									</div>
									<Toaster />
								</div>
							</main>
							<footer className="bg-background w-full border-t">
								<div className="flex h-16 items-center place-content-center space-x-4 w-full px-8">
									<span className="text-sm text-muted-foreground">
										© Warden Protocol 2024
									</span>
								</div>
							</footer>
						</>
					) : (
						<>
							<SiteHeader />
							<Sidebar />
							<main className="pb-10 pt-24 pl-80 bg-background min-h-screen">
								<div className="px-4 sm:px-6 lg:px-8">
									{ward === 0 && (
										<div className="px-8 pb-10">
											<Alert className="flex flex-row justify-between items-center">
												<div className="flex flex-row items-center gap-4">
													<AlertCircle className="h-8 w-8" />
													<span className="text-sm">
														You Currently have no
														WARD Tokens, please
														topup your wallet to use
														SpaceWard.
													</span>
												</div>
												<div>
													<FaucetButton />
												</div>
											</Alert>
										</div>
									)}
									<Outlet />
									<Toaster />
								</div>
							</main>
						</>
					)}
				</div>
			</ThemeProvider>
		</>
	);
}
