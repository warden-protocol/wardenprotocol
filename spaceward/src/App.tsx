import {
	wardenprotocoldevnet,
	wardenprotocoldevnetAssets,
	wardenprotocollocal,
	wardenprotocollocalAssets,
	wardenprotocolbuenavista,
	wardenprotocolbuenavistaAssets,
} from "@/config/chains";
import { ChainProvider } from "@cosmos-kit/react";
import {
	FaroErrorBoundary,
	FaroRoutes,
	getWebInstrumentations,
	initializeFaro,
	ReactIntegration,
	ReactRouterVersion,
} from "@grafana/faro-react";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { assets, chains } from "chain-registry";
import { SignerOptions, wallets } from "cosmos-kit";
import React from "react";
import {
	BrowserRouter,
	createRoutesFromChildren,
	matchRoutes,
	Route,
	Routes,
	useLocation,
	useNavigationType,
} from "react-router-dom";
import DenomProvider from "./context/denomContext.tsx";
import { MetaMaskProvider } from "./context/MetaMaskContext.tsx";
import WalletProvider from "./context/walletContext.tsx";
import { env } from "./env.ts";
import { AddressProvider } from "./hooks/addressProvider.tsx";
import {
	ActionsPage,
	AppsOpenPage,
	AppsPage,
	AssetsPage,
	BlockByHeightLoader,
	BlockByHeightPage,
	ExplorerPage,
	HomePage,
	IntentsPage,
	KeychainsPage,
	KeysPage,
	NewTransactionPage,
	OwnersPage,
	Root,
	SettingsPage,
	StakingPage,
} from "./pages";
import { GovernancePage } from "./pages/Governance.tsx";

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
						wardenprotocolbuenavista,
					]}
					assetLists={[
						...assets,
						wardenprotocollocalAssets,
						wardenprotocoldevnetAssets,
						wardenprotocolbuenavistaAssets,
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
														element={<HomePage />}
													/>
													<Route
														path="/intents"
														element={
															<IntentsPage />
														}
													/>
													<Route
														path="/staking"
														element={
															<StakingPage />
														}
													/>
													<Route
														path="/governance"
														element={
															<GovernancePage />
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
															BlockByHeightLoader
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
														element={
															<AppsOpenPage />
														}
													/>
													<Route
														path="/settings"
														element={
															<SettingsPage />
														}
													/>
													<Route
														path="/new-transaction"
														element={
															<NewTransactionPage />
														}
													/>
													<Route
														path="/owners"
														element={<OwnersPage />}
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
