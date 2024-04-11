import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import {
	createRoutesFromChildren,
	matchRoutes,
	Routes,
	useLocation,
	useNavigationType,
} from "react-router-dom";
import {
	FaroErrorBoundary,
	FaroRoutes,
	getWebInstrumentations,
	initializeFaro,
	ReactIntegration,
	ReactRouterVersion,
} from "@grafana/faro-react";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";
import Root from "./pages/Root.tsx";
import Home from "./pages/Home.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import IntentsPage from "./pages/Intents.tsx";
import ExplorerPage from "./pages/Explorer.tsx";
import BlockByHeightPage, {
	loader as blockByHeightLoader,
} from "./pages/BlockByHeight.tsx";
import ActionsPage from "./pages/Actions.tsx";
import KeychainsPage from "./pages/Keychains.tsx";
import KeysPage from "./pages/Keys.tsx";
import AssetsPage from "./pages/Assets.tsx";
import AppsPage from "./pages/Apps.tsx";
import Settings from "./pages/Settings.tsx";
import NewTransaction from "./pages/NewTransaction.tsx";
import WalletProvider from "./context/walletContext.tsx";
import { AddressProvider } from "./hooks/addressProvider.tsx";
import DenomProvider from "./context/denomContext.tsx";
import AppsOpen from "./pages/AppsOpen.tsx";
import Owners from "./pages/Owners.tsx";
import { env } from "./env.ts";
import { MetaMaskProvider } from "./context/MetaMaskContext.tsx";

import { SignerOptions, wallets } from "cosmos-kit";
import { ChainProvider } from "@cosmos-kit/react";
import { assets, chains } from "chain-registry";
import {
	wardenprotocollocal,
	wardenprotocollocalAssets,
	wardenprotocoldevnet,
	wardenprotocoldevnetAssets,
} from "@/config/chains";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchInterval: 1000,
		},
	},
});

initializeFaro({
	url: "https://faro-collector-prod-eu-west-2.grafana.net/collect/53b2f5b8e5fa68b43adbc90f6cc1fca4",

	paused: true,

	app: {
		name: "spaceward",
		version: "0.0.1",
		environment: env.chainId,
	},

	sessionTracking: {
		enabled: true,
		samplingRate: 0.1,
	},

	instrumentations: [
		...getWebInstrumentations(),

		new TracingInstrumentation(),

		new ReactIntegration({
			router: {
				version: ReactRouterVersion.V6,
				dependencies: {
					createRoutesFromChildren,
					matchRoutes,
					Routes,
					useLocation,
					useNavigationType,
				},
			},
		}),
	],
});

// if (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
// 	// TODO: the user should opt-in to this, if the user didn't opt-in, leave it paused
// 	faro.unpause();
// }

function App() {
	const signerOptions: SignerOptions = {};
	const supportedWallets = wallets.for("keplr", "leap", "cosmostation");
	return (
		<React.StrictMode>
			<FaroErrorBoundary>
				<ChainProvider
					chains={[
						...chains,
						wardenprotocollocal,
						wardenprotocoldevnet,
					]}
					assetLists={[
						...assets,
						wardenprotocollocalAssets,
						wardenprotocoldevnetAssets,
					]}
					wallets={supportedWallets}
					walletConnectOptions={{
						signClient: {
							projectId: "5ac86584b1de10a7953c6d7b19b52dad",
							relayUrl: "wss://relay.walletconnect.org",
							metadata: {
								name: "Warden Protocol Wallets",
								description: "Warden Protocol WalletConnect",
								url: "https://wardenprotocol.org/",
								icons: [
									"https://avatars.githubusercontent.com/u/158038121",
								],
							},
						},
					}}
					signerOptions={signerOptions}
				>
					<QueryClientProvider client={queryClient}>
						<MetaMaskProvider>
							<AddressProvider>
								<WalletProvider>
									<DenomProvider>
										<BrowserRouter>
											<FaroRoutes>
												<Route element={<Root />}>
													<Route
														path="/"
														element={<Home />}
													/>
													<Route
														path="/intents"
														element={
															<IntentsPage />
														}
													/>
													<Route
														path="/actions"
														element={
															<ActionsPage />
														}
													/>
													<Route
														path="/explorer"
														element={
															<ExplorerPage />
														}
													/>
													<Route
														path="/explorer/block-by-height/:height"
														element={
															<BlockByHeightPage />
														}
														loader={
															blockByHeightLoader
														}
													/>
													<Route
														path="/keys"
														element={<KeysPage />}
													/>
													<Route
														path="/keychains"
														element={
															<KeychainsPage />
														}
													/>
													<Route
														path="/assets"
														element={<AssetsPage />}
													/>
													<Route
														path="/apps"
														element={<AppsPage />}
													/>
													<Route
														path="/apps/open"
														element={<AppsOpen />}
													/>
													<Route
														path="/settings"
														element={<Settings />}
													/>
													<Route
														path="/new-transaction"
														element={
															<NewTransaction />
														}
													/>
													<Route
														path="/owners"
														element={<Owners />}
													/>
												</Route>
											</FaroRoutes>
										</BrowserRouter>
									</DenomProvider>
								</WalletProvider>
							</AddressProvider>
						</MetaMaskProvider>
					</QueryClientProvider>
				</ChainProvider>
			</FaroErrorBoundary>
		</React.StrictMode>
	);
}

export default App;
