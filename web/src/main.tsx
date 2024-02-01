import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./main.css";
import Root from "./routes/root.tsx";
import Home from "./routes/home.tsx";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import Space, { loader as spaceLoader } from "./routes/space.tsx";
import IntentsPage from "./routes/intents.tsx";
import ExplorerPage from "./routes/explorer.tsx";
import BlockByHeightPage, { loader as blockByHeightLoader } from "./routes/block_by_height.tsx";
import TxByHashPage, { loader as txByHashLoader } from "./routes/tx_by_hash.tsx";
import ActionsPage from "./routes/actions.tsx";
import WalletConnectPage from "./routes/wallet_connect.tsx";
import KeychainsPage from "./routes/keychains.tsx";
import Keychain, { loader as keychainLoader } from "./routes/keychain.tsx";
import Key, { loader as keyLoader } from "./routes/key.tsx";
import LayerOneEthereum, { loader as layerOneEthereumLoader } from "./routes/ethereum.tsx";

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
        element: <ActionsPage />
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
        path: "/explorer/tx_by_hash/:hash",
        element: <TxByHashPage />,
        loader: txByHashLoader,
      },
      {
        path: "/spaces/:spaceAddr",
        element: <Space />,
        loader: spaceLoader,
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
        path: "/walletconnect",
        element: <WalletConnectPage />,
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
