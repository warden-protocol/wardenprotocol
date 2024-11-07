import {
	wardenprotocoldevnet,
	wardenprotocoldevnetAssets,
	wardenprotocollocal,
	wardenprotocollocalAssets,
	wardenprotocolbuenavista,
	wardenprotocolbuenavistaAssets,
	wardenprotocolchiado,
	wardenprotocolchiadoAssets,
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
	BlockByHeightPage,
	ExplorerPage,
	IntentsPage,
	KeychainsPage,
	KeysPage,
	OwnersPage,
	Root,
	SettingsPage,
	StakingPage,
} from "./pages";
import { GovernancePage } from "./pages/Governance.tsx";
import { hashQueryKey } from "./utils/queryKeyHash.ts";
import { DashboardPage } from "./pages/Dashboard.tsx";
import { Web3OnboardProvider, init, useWagmiConfig } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import wagmi from "@web3-onboard/wagmi";
import { WagmiProvider } from "wagmi";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchInterval: 1000,
			queryKeyHashFn: hashQueryKey,
		},
	},
});

const web3Onboard = init({
	chains: [{
		/*
			0x271a(10010) - chiado
			0x3039(12345) - devnet
		*/
		id: env.evmChainId,
		token: "WARD",
		label: env.chainName,
		rpcUrl: env.evmURL,
	}],
	connect: { autoConnectAllPreviousWallet: true },
	wallets: [injectedModule()],
	wagmi,
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

function InjectWagmi({ children }: { children: React.ReactNode }) {
	const wagmiConfig = useWagmiConfig();

	return wagmiConfig ?
		<WagmiProvider config={wagmiConfig}>
			{children}
		</WagmiProvider> :
		<>
			{children}
		</>;
};

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
						wardenprotocolchiado,
					]}
					assetLists={[
						...assets,
						wardenprotocollocalAssets,
						wardenprotocoldevnetAssets,
						wardenprotocolbuenavistaAssets,
						wardenprotocolchiadoAssets,
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
					<Web3OnboardProvider web3Onboard={web3Onboard}>
						<InjectWagmi>
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
																element={
																	<DashboardPage />
																}
															/>
															<Route
																path="/rules"
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
						</InjectWagmi>
					</Web3OnboardProvider>
				</ChainProvider>
			</FaroErrorBoundary>
		</React.StrictMode>
	);
}

export default App;
