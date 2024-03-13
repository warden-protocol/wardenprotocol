import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, } from "react-router-dom";
import { createRoutesFromChildren, matchRoutes, Routes, useLocation, useNavigationType } from 'react-router-dom';
import { FaroErrorBoundary, FaroRoutes, getWebInstrumentations, initializeFaro, ReactIntegration, ReactRouterVersion } from '@grafana/faro-react';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';
import "./main.css";
import Root from "./routes/root.tsx";
import Home from "./routes/home.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import Space, { loader as spaceLoader } from "./routes/space.tsx";
import IntentsPage from "./routes/intents.tsx";
import ExplorerPage from "./routes/explorer.tsx";
import BlockByHeightPage, {
	loader as blockByHeightLoader,
} from "./routes/block-by-height.tsx";
import ActionsPage from "./routes/actions.tsx";
import KeychainsPage from "./routes/keychains.tsx";
// import Keychain, { loader as keychainLoader } from "./routes/keychain.tsx";
import KeysPage from "./routes/keys.tsx";
// import Key, { loader as keyLoader } from "./routes/key.tsx";
// import LayerOneEthereum, {
//   loader as layerOneEthereumLoader,
// } from "./routes/ethereum.tsx";
import AssetsPage from "./routes/assets.tsx";
import AppsPage from "./routes/apps.tsx";
import Settings from "./routes/settings.tsx";
import NewTransaction from "./routes/new-transaction.tsx";
import WalletProvider from "./def-hooks/walletContext.tsx";
import { AddressProvider } from "./def-hooks/addressProvider.tsx";
import DenomProvider from "./def-hooks/denomContext.tsx";
import AppsOpen from "./routes/apps-open.tsx";
import Owners from "./routes/owners.tsx";
import { env } from "./env.ts";
import { MetaMaskProvider } from "./def-hooks/MetaMaskContext.tsx";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchInterval: 1000,
		},
	},
});

initializeFaro({
	url: 'https://faro-collector-prod-eu-west-2.grafana.net/collect/53b2f5b8e5fa68b43adbc90f6cc1fca4',

	paused: true,

	app: {
		name: "spaceward",
		version: '0.0.1',
		environment: env.chainId
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
	return (
		<React.StrictMode>
			<FaroErrorBoundary>
				<QueryClientProvider client={queryClient}>
					<MetaMaskProvider>
						<AddressProvider>
							<WalletProvider>
								<DenomProvider>
									<BrowserRouter>
										<FaroRoutes>
											<Route element={<Root />}>
												<Route path="/" element={<Home />} />
												<Route path="/intents" element={<IntentsPage />} />
												<Route path="/actions" element={<ActionsPage />} />
												<Route path="/explorer" element={<ExplorerPage />} />
												<Route path="/explorer/block-by-height/:height" element={<BlockByHeightPage />} loader={blockByHeightLoader} />
												<Route path="/keys" element={<KeysPage />} />
												<Route path="/keychains" element={<KeychainsPage />} />
												<Route path="/assets" element={<AssetsPage />} />
												<Route path="/apps" element={<AppsPage />} />
												<Route path="/apps/open" element={<AppsOpen />} />
												<Route path="/settings" element={<Settings />} />
												<Route path="/new-transaction" element={<NewTransaction />} />
												<Route path="/owners" element={<Owners />} />
											</Route>
										</FaroRoutes>
									</BrowserRouter>
								</DenomProvider>
							</WalletProvider>
						</AddressProvider>
					</MetaMaskProvider>
				</QueryClientProvider>
			</FaroErrorBoundary>
		</React.StrictMode>
	);
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<App />);
