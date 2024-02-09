import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { enableKeplr, useKeplrAddress } from "../keplr";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { spacesByOwner } from "../client/identity";
import { balances } from "../client/bank";
import FaucetButton from "@/components/faucet-button";
import { MsgNewSpace } from "../proto/wardenprotocol/identity/tx_pb";
import { useBroadcaster } from "@/hooks/keplr";

export default function Root() {

  const { broadcast } = useBroadcaster();

	useEffect(() => {
		window.onload = async () => {
			await enableKeplr();
		};
	}, []);

	const addr = useKeplrAddress();

	const wsQuery = useQuery({
		queryKey: ["spaces", "owner", addr],
		queryFn: () => spacesByOwner(addr),
	});
	const spacecount = wsQuery.data?.spaces.length;

  const bq = useQuery({
		queryKey: ["balances", addr],
		queryFn: () => balances(addr),
	});
	const nward =
		bq.data?.balances.find((b) => b.denom === "nward")?.amount || "0";
	const ward = parseInt(nward) / 10 ** 9;

	return (
		<>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
			>
				<div className="min-h-screen">
					<SiteHeader />
					{!addr || spacecount === 0 ? (
						<main className="pb-10 pt-24 h-screen">
							<div className="px-4 sm:px-6 lg:px-8 flex flex-row gap-6 h-full">
								<div className="w-1/2 rounded-2xl bg-[#005156] border p-8 flex flex-col place-content-center relative overflow-clip">
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
									{!addr &&
										(window.keplr ? (
											<div className="text-center">
												<div className="grid gap-4">
													<div>
														<AlertCircle className="h-24 w-24 mx-auto shrink-0" />
													</div>
													<div>
														<Button
															onClick={() =>
																window.location.reload()
															}
															size="lg"
															className="mx-auto"
														>
															Connect Wallet
														</Button>
													</div>
												</div>
											</div>
										) : (
											<div className="text-center">
												<h1>
													Keplr not found. Please
													install keplr extension.
												</h1>
											</div>
										))}

									{/* No Spaces Created */}
									{window.keplr &&
										addr &&
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
																	broadcast([
																		new MsgNewSpace(
																			{
																				creator:
																					addr,
																			}
																		),
																	]);
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
							<main className="pb-10 pt-24 lg:pl-72 ">
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
