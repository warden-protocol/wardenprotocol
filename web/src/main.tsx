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
import Workspace, { loader as workspaceLoader } from "./routes/workspace.tsx";
import SignData, { loader as signDataLoader } from "./routes/sign-data.tsx";
import Wallet, { loader as walletLoader } from "./routes/wallet.tsx";

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
        path: "/workspaces/:workspaceAddr",
        element: <Workspace />,
        loader: workspaceLoader,
      },
      {
        path: "/sign-data/:keyId",
        element: <SignData />,
        loader: signDataLoader,
      },
      {
        path: "/wallet/:walletId",
        element: <Wallet />,
        loader: walletLoader,
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
