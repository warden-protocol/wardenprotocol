import type {
	Config,
	ConnectReturnType,
	Connector,
	CreateConnectorFn,
} from "@wagmi/core";
import type {
	Chain,
	EIP1193Provider,
	ProviderAccounts,
} from "@web3-onboard/common";
import type { ConnectParameters } from "@wagmi/core";

export type WagmiInitOptions = {
	disconnect: (options: { label: string }) => Promise<unknown>;
	updateChain: (chain: Chain) => void;
	requestAccounts: (provider: EIP1193Provider) => Promise<ProviderAccounts>;
	getChainId: (provider: EIP1193Provider) => Promise<string>;
	switchChain: (
		provider: EIP1193Provider,
		hexChainId: string,
	) => Promise<unknown>;
	addOrSwitchChain: (
		provider: EIP1193Provider,
		chain: Chain,
	) => Promise<string | undefined>;
};

export type WagmiModuleAPI = {
	buildWagmiConfig: (
		chains: Chain[],
		walletData?: {
			label: string;
			provider: EIP1193Provider;
		},
	) => Promise<Config | undefined>;
	createWagmiConnector: (
		label: string,
		provider: EIP1193Provider,
	) => Promise<CreateConnectorFn | undefined>;
	connectWalletToWagmi: (
		label: string,
		provider: EIP1193Provider,
	) => Promise<ConnectReturnType<Config> | undefined>;
	wagmiConnect: (
		config: Config,
		parameters: ConnectParameters<Config>,
	) => Promise<ConnectReturnType<Config>>;
	wagmiDisconnectWallet: (label: string) => Promise<Config | undefined>;
	getWagmiConnector: (label: string) => Connector | undefined;
};
