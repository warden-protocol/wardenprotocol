import { Outlet } from "react-router-dom";
import useKeplr from "@/def-hooks/useKeplr";
import useLeap from "@/def-hooks/useLeap";
import useCosmostation from "@/def-hooks/useCosmostation";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import FaucetButton from "@/components/faucet-button";
import { useAsset } from "@/def-hooks/useAsset";
import { useAddressContext } from "@/def-hooks/useAddressContext";
import { useClient } from "@/hooks/useClient";
import useWardenWarden from "@/hooks/useWardenWarden";
import { useSpaceAddress } from "@/hooks/useSpaceAddress";

export default function Root() {
	const { connectToKeplr, isKeplrAvailable } = useKeplr();
	const { connectToLeap, isLeapAvailable } = useLeap();
	const { connectToCosmostation, isCosmostationAvailable } =
		useCosmostation();

	const { address } = useAddressContext();
	const { spaceAddress, setSpaceAddress } = useSpaceAddress();

	const { balance } = useAsset("uward");
	const ward = parseInt(balance?.amount || "0") / 10 ** 6;

	const { QuerySpacesByOwner } = useWardenWarden();
	const { data: spacesQuery } = QuerySpacesByOwner(
		{ owner: address },
		{},
		10
	);
	const spacecount = spacesQuery?.pages[0].spaces?.length || 0;

	const client = useClient();
	const sendMsgNewSpace = client.WardenWarden.tx.sendMsgNewSpace;

	console.log("spacesQuery", spacesQuery);
	console.log("spacecount", spacecount);

	// set the first space as the active one if none is set
	if (spacecount > 0 && spaceAddress === "") {
		setSpaceAddress(spacesQuery?.pages[0].spaces[0].address);
	}

	return (
		<>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				<div className="min-h-screen">
					<SiteHeader />
					{!address || spacecount === 0 ? (
						<main className="pb-10 pt-24 h-screen">
							<div className="px-4 sm:px-6 lg:px-8 flex flex-row gap-6 h-full">
								<div className="w-1/2 rounded-2xl bg-accent border p-8 flex flex-col place-content-center relative overflow-clip">
									<div className="">
										<h1 className="text-6xl text-white">
											Unlock the Potential of
											Intent-Based, Secure Cross-Chain
											Interactions
										</h1>
									</div>
								</div>
								<div className="w-1/2 rounded-2xl bg-background border p-8 flex flex-col place-content-center">
									{/* No wallet connected */}
									{!address &&
										(isKeplrAvailable ? (
											<div className="text-center">
												<div className="grid gap-4">
													<div>
														<AlertCircle className="h-24 w-24 mx-auto shrink-0" />
													</div>
													<div>
														<Button
															onClick={() =>
																connectToKeplr(
																	() => null,
																	() => null
																)
															}
															size="lg"
															className="mx-auto"
														>
															Connect Keplr Wallet
														</Button>
													</div>
												</div>
											</div>
										) : (
											<div className="text-center">
												<h1>Keplr not found.</h1>
											</div>
										))}

									{!address &&
										(isLeapAvailable ? (
											<div className="text-center">
												<div className="grid gap-4">
													{/* <div>
														<AlertCircle className="h-24 w-24 mx-auto shrink-0" />
													</div> */}
													<div>
														<Button
															onClick={() =>
																connectToLeap(
																	() => null,
																	() => null
																)
															}
															size="lg"
															className="mx-auto mt-2"
														>
															Connect Leap Wallet
														</Button>
													</div>
												</div>
											</div>
										) : (
											<div className="text-center mt-2">
												<h1>Leap not found.</h1>
											</div>
										))}

									{!address &&
										(isCosmostationAvailable ? (
											<div className="text-center">
												<div className="grid gap-4">
													{/* <div>
														<AlertCircle className="h-24 w-24 mx-auto shrink-0" />
													</div> */}
													<div>
														<Button
															onClick={() =>
																connectToCosmostation(
																	() => null,
																	() => null
																)
															}
															size="lg"
															className="mx-auto mt-2"
														>
															Connect Cosmostation
															Wallet
														</Button>
													</div>
												</div>
											</div>
										) : (
											<div className="text-center  mt-2">
												<h1>Cosmostation not found.</h1>
											</div>
										))}

									{/* No Spaces Created */}
									{window.keplr &&
										address &&
										spacecount === 0 && (
											<div className="text-center">
												<div className="grid gap-4">
													<div>
														<AlertCircle className="h-24 w-24 mx-auto shrink-0" />
													</div>
													<div>
														{ward > 0 ? (
															<Button
																type="button"
																onClick={() => {
																	sendMsgNewSpace(
																		{
																			value: {
																				creator:
																					address,
																				signIntentId: 0,
																				adminIntentId: 0,
																				additionalOwners:
																					[],
																			},
																		}
																	);
																}}
															>
																Create a Space
															</Button>
														) : (
															<div className="flex flex-col space-y-4 max-w-72 mx-auto">
																<p>
																	To create a
																	space you
																	need some
																	WARD token
																	in your
																	Keplr
																	Wallet, use
																	the button
																	below to
																	fund your
																	wallet.
																</p>
																<FaucetButton />
															</div>
														)}
													</div>
												</div>
											</div>
										)}
								</div>
								<Toaster />
							</div>
						</main>
					) : (
						<>
							<Sidebar />
							<main className="pb-10 pt-24 pl-80 ">
								<div className="px-4 sm:px-6 lg:px-8">
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
