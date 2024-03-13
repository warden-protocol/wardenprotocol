import { Window as KeplrWindow } from "@keplr-wallet/types";
import type {
  EIP6963AnnounceProviderEvent,
  EIP6963RequestProviderEvent,
  MetaMaskInpageProvider,
} from '@metamask/providers';


/*
 * Window type extension to support ethereum
 */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends KeplrWindow {}

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    ethereum: MetaMaskInpageProvider & {
      setProvider?: (provider: MetaMaskInpageProvider) => void;
      detected?: MetaMaskInpageProvider[];
      providers?: MetaMaskInpageProvider[];
    };
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface WindowEventMap {
    'eip6963:requestProvider': EIP6963RequestProviderEvent;
    'eip6963:announceProvider': EIP6963AnnounceProviderEvent;
  }
}
