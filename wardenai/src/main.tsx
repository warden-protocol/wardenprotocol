import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import {
    wardenprotocoldevnet,
    wardenprotocoldevnetAssets,
    wardenprotocollocal,
    wardenprotocollocalAssets,
    wardenprotocolbuenavista,
    wardenprotocolbuenavistaAssets,
} from "@/config/chains";

import { ChainProvider } from "@cosmos-kit/react";
import { chains, assets } from "chain-registry";
import { SignerOptions, wallets } from "cosmos-kit";
import { AddressProvider } from "@/hooks/addressProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { hashQueryKey } from "@/utils/queryKeyHash.ts";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchInterval: 1000,
            queryKeyHashFn: hashQueryKey,
        },
    },
});

// Import this in your top-level route/layout
import "@interchain-ui/react/styles";

const signerOptions: SignerOptions = {};

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
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
            wallets={wallets} // supported wallets
            // walletConnectOptions={...} // required if `wallets` contains mobile wallets
            signerOptions={signerOptions}
        >
            <QueryClientProvider client={queryClient}>
                <AddressProvider>
                    <App />
                </AddressProvider>
            </QueryClientProvider>
        </ChainProvider>
    </React.StrictMode>
);
