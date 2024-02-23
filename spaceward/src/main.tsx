import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./main.css";
import Root from "./routes/root.tsx";
import Home from "./routes/home.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Space, { loader as spaceLoader } from "./routes/space.tsx";
import IntentsPage from "./routes/intents.tsx";
import ExplorerPage from "./routes/explorer.tsx";
import BlockByHeightPage, {
	loader as blockByHeightLoader,
} from "./routes/block_by_height.tsx";
import ActionsPage from "./routes/actions.tsx";
import KeychainsPage from "./routes/keychains.tsx";
import Keychain, { loader as keychainLoader } from "./routes/keychain.tsx";
import KeysPage from "./routes/keys.tsx";
import Key, { loader as keyLoader } from "./routes/key.tsx";
import LayerOneEthereum, {
	loader as layerOneEthereumLoader,
} from "./routes/ethereum.tsx";
import AssetsPage from "./routes/assets.tsx";
import Apps from "./routes/apps.tsx";
import Settings from "./routes/settings.tsx";
import NewTransaction from "./routes/new-transaction.tsx";
import WalletProvider from "./def-hooks/walletContext.tsx";
import { AddressProvider } from "./def-hooks/addressProvider.tsx";
import DenomProvider from "./def-hooks/denomContext.tsx";
import LayerOneCelestia, {
	loader as layerOneCelestiaLoader,
} from "./routes/celestia.tsx";
import AppsOpen from "./routes/apps-open.tsx";
import Owners from "./routes/owners.tsx";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchInterval: 1000,
		},
	},
});

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/intents",
				element: <IntentsPage />,
			},
			{
				path: "/actions",
				element: <ActionsPage />,
			},
			{
				path: "/explorer",
				element: <ExplorerPage />,
			},
			{
				path: "/explorer/block_by_height/:height",
				element: <BlockByHeightPage />,
				loader: blockByHeightLoader,
			},
			{
				path: "/spaces/:spaceAddr",
				element: <Space />,
				loader: spaceLoader,
			},
			{
				path: "/keys",
				element: <KeysPage />,
			},
			{
				path: "/keys/:keyId",
				element: <Key />,
				loader: keyLoader,
			},
			{
				path: "/keys/:keyId/sepolia",
				element: <LayerOneEthereum chainId={11155111} />,
				loader: layerOneEthereumLoader,
			},
			{
				path: "/keys/:keyId/celestia",
				element: <LayerOneCelestia chainId={1} />,
				loader: layerOneCelestiaLoader,
			},
			{
				path: "/keychains",
				element: <KeychainsPage />,
			},
			{
				path: "/keychains/:keychainAddr",
				element: <Keychain />,
				loader: keychainLoader,
			},
			{
				path: "/assets",
				element: <AssetsPage />,
			},
			{
				path: "/apps",
				element: <Apps />,
			},
			{
				path: "/apps/open",
				element: <AppsOpen />,
			},
			{
				path: "/settings",
				element: <Settings />,
			},
			{
				path: "/new-transaction",
				element: <NewTransaction />,
			},
			{
				path: "/owners",
				element: <Owners />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AddressProvider>
				<WalletProvider>
					<DenomProvider>
						<RouterProvider router={router} />
					</DenomProvider>
				</WalletProvider>
			</AddressProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
